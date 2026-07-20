

importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");


const MAX_OUTPUT_BYTES = 512 * 1024;  
const MAX_OUTPUT_LINES = 8_000;
const OUTPUT_FLUSH_MS  = 50;


let pyodide         = null;
let interruptBuffer = null;
let isRunning       = false;   


function send(type, payload) {
    self.postMessage({ type, ...payload });
}


async function initPyodide() {
    send("status", { text: "Inicializando entorno virtual Python en WebAssembly..." });
    pyodide = await loadPyodide();

    if (typeof SharedArrayBuffer !== "undefined") {
        interruptBuffer = new Uint8Array(new SharedArrayBuffer(1));
        pyodide.setInterruptBuffer(interruptBuffer);
    }

    send("ready", {});
}


const SHADOWED_LIBS = new Set(['pandas', 'numpy', 'matplotlib', 'scipy', 'random', 'math', 'sys', 'os', 'json', 'csv', 'time', 'datetime']);


function cleanupVirtualFS(files, virtualFiles, dataFiles, fileToRun) {
    if (!pyodide) return;
    const allowed = new Set();
    if (files) {
        for (let path in files) {
            if (!files[path].isFolder) allowed.add(path);
        }
    }
    if (virtualFiles) {
        for (let path in virtualFiles) allowed.add(path);
    }
    if (dataFiles) {
        for (let path in dataFiles) allowed.add(path);
    }
    if (fileToRun) {
        allowed.add(fileToRun);
    }

    const existing = collectExistingPaths();
    for (let fp of existing) {
        if (!allowed.has(fp)) {
            try {
                pyodide.FS.unlink(fp);
            } catch(e) {
                console.warn('[worker] Could not delete obsolete virtual file:', fp, e);
            }
        }
    }
}


function syncWorkspaceFiles(files, virtualFiles, fileToRun, code) {
    const systemDirs = [
        ".venv", ".venv/Scripts", ".venv/Lib", ".venv/Lib/site-packages",
        "External Libraries", "External Libraries/< Python 3.10 >"
    ];
    for (let dir of systemDirs) {
        let acc = '';
        for (let part of dir.split('/')) {
            if (!part) continue;
            acc += (acc ? '/' : '') + part;
            try { pyodide.FS.mkdir(acc); } catch(e) {}
        }
    }
    for (let path in virtualFiles) {
        try { pyodide.FS.writeFile(path, virtualFiles[path]); } catch(e) {}
    }
    for (let path in files) {
        if (!files[path].isFolder) {
            const baseName = path.split('/').pop();
            if (baseName.endsWith('.py')) {
                const stem = baseName.slice(0, -3).toLowerCase();
                if (SHADOWED_LIBS.has(stem) && path !== fileToRun) {
                    continue;
                }
            }
            const parts = path.split('/');
            let dir = '';
            for (let i = 0; i < parts.length - 1; i++) {
                dir += (i === 0 ? '' : '/') + parts[i];
                try { pyodide.FS.mkdir(dir); } catch(e) {}
            }
            try { pyodide.FS.writeFile(path, files[path].content || ""); } catch(e) {}
        }
    }
    try { pyodide.FS.writeFile(fileToRun, code); } catch(e) {}
}


function writeDataFiles(dataFiles) {
    if (!dataFiles) return;
    for (let path in dataFiles) {
        const df = dataFiles[path];
        try {
            const parts = path.split('/');
            let dir = '';
            for (let i = 0; i < parts.length - 1; i++) {
                dir += (i === 0 ? '' : '/') + parts[i];
                try { pyodide.FS.mkdir(dir); } catch(e) {}
            }
            if (df.binary) {
                const bin = atob(df.content);
                const bytes = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                pyodide.FS.writeFile(path, bytes);
            } else {
                pyodide.FS.writeFile(path, df.content || '');
            }
        } catch(e) {
            console.warn('[worker] Could not write data file:', path, e);
        }
    }
}


const FS_SYSTEM_DIRS = new Set(['lib', 'usr', 'proc', 'dev', 'tmp', 'home', 'etc', 'var',
    'bin', 'sbin', 'run', 'opt', '.venv', 'External Libraries', 'Scratches and Consoles']);

const DATA_TEXT_EXT  = new Set(['.txt', '.csv', '.tsv', '.json', '.jsonl', '.log', '.md',
    '.html', '.xml', '.yaml', '.yml', '.ini', '.cfg', '.toml']);

function snapshotFS(knownPaths, maxSizeBytes = 2 * 1024 * 1024) {
    const result = {};

    function walk(dir) {
        let entries;
        try { entries = pyodide.FS.readdir(dir); } catch(e) { return; }
        for (const entry of entries) {
            if (entry === '.' || entry === '..') continue;
            const fullPath = dir ? dir + '/' + entry : entry;
            
            if (!dir && FS_SYSTEM_DIRS.has(entry)) continue;
            let stat;
            try { stat = pyodide.FS.stat(fullPath); } catch(e) { continue; }
            if (pyodide.FS.isDir(stat.mode)) {
                walk(fullPath);
            } else {
                const ext = fullPath.slice(fullPath.lastIndexOf('.')).toLowerCase();
                if (!DATA_TEXT_EXT.has(ext)) continue; 
                if (knownPaths && knownPaths.has(fullPath)) continue; 
                if (stat.size > maxSizeBytes) continue;  
                try {
                    const content = pyodide.FS.readFile(fullPath, { encoding: 'utf8' });
                    result[fullPath] = content;
                } catch(e) {}
            }
        }
    }

    walk('');
    return result;
}


function collectExistingPaths() {
    const paths = new Set();
    function walk(dir) {
        let entries;
        try { entries = pyodide.FS.readdir(dir); } catch(e) { return; }
        for (const entry of entries) {
            if (entry === '.' || entry === '..') continue;
            const fp = dir ? dir + '/' + entry : entry;
            if (!dir && FS_SYSTEM_DIRS.has(entry)) continue;
            let stat;
            try { stat = pyodide.FS.stat(fp); } catch(e) { continue; }
            if (pyodide.FS.isDir(stat.mode)) walk(fp);
            else paths.add(fp);
        }
    }
    walk('');
    return paths;
}


async function setupScienceEnv(loadedPackages) {
    const hasPandas     = loadedPackages.some(p => p === 'pandas');
    const hasNumpy      = loadedPackages.some(p => p === 'numpy');
    const hasMatplotlib = loadedPackages.some(p => p === 'matplotlib');

    self._pyneo_send_figure = function(b64) {
        send("figure", { data: "data:image/png;base64," + b64 });
    };

    let code = `import sys\n`;

    if (hasNumpy || hasPandas) {
        code += `
try:
    import numpy as np
    np.set_printoptions(threshold=500, linewidth=120, precision=6, suppress=True)
except Exception:
    pass
`;
    }

    if (hasPandas) {
        code += `
try:
    import pandas as pd
    pd.set_option('display.max_rows', 60)
    pd.set_option('display.max_columns', 20)
    pd.set_option('display.width', 120)
    pd.set_option('display.max_colwidth', 60)
    pd.set_option('display.float_format', '{:.4f}'.format)
except Exception:
    pass
`;
    }

    if (hasMatplotlib) {
        code += `
try:
    import matplotlib
    matplotlib.use('agg')
    import matplotlib.pyplot as plt
    import io, base64

    def _pyneo_show(*a, **kw):
        try:
            import js as _js
            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
            buf.seek(0)
            _js._pyneo_send_figure(base64.b64encode(buf.read()).decode('ascii'))
            plt.close('all')
        except Exception as _e:
            print('[PyNeo] Error al renderizar figura:', _e)

    plt.show = _pyneo_show
    matplotlib.pyplot.show = _pyneo_show
except Exception:
    pass
`;
    }

    if (code.trim() !== 'import sys') await pyodide.runPythonAsync(code);
}


async function runCode({ files, virtualFiles, activeFile, fileToRun, code,
                         preCollectedResponses, packagesToLoad, dataFiles }) {
    isRunning = true;
    if (interruptBuffer) interruptBuffer[0] = 0;

    cleanupVirtualFS(files, virtualFiles, dataFiles, fileToRun);
    syncWorkspaceFiles(files, virtualFiles, fileToRun, code);
    writeDataFiles(dataFiles);

    
    const prePaths = collectExistingPaths();

    
    const successfullyLoaded = [];
    if (packagesToLoad && packagesToLoad.length > 0) {
        send("output", { text: `>>> Instalando librerias (${packagesToLoad.join(', ')})...\n` });
        for (let pkg of packagesToLoad) {
            let loaded = false;
            try {
                await pyodide.loadPackage(pkg);
                send("output", { text: `>>> Libreria '${pkg}' lista.\n` });
                successfullyLoaded.push(pkg);
                loaded = true;
            } catch(e) {}

            if (!loaded) {
                try {
                    await pyodide.loadPackage('micropip');
                    const micropip = pyodide.pyimport('micropip');
                    send("output", { text: `>>> Descargando '${pkg}' desde PyPI...\n` });
                    await micropip.install(pkg);
                    send("output", { text: `>>> '${pkg}' instalado correctamente.\n` });
                    successfullyLoaded.push(pkg);
                } catch(err) {
                    send("output", { text: `[Advertencia] No se pudo instalar '${pkg}': ${err.message}\n` });
                }
            }
        }
        await setupScienceEnv(successfullyLoaded);
    }

    
    let totalBytes   = 0;
    let totalLines   = 0;
    let outputCapped = false;
    let batchBuffer  = "";
    let batchTimer   = null;
    let hasAnyOutput = false;

    function flushBatch() {
        batchTimer = null;
        if (!batchBuffer) return;
        send("output", { text: batchBuffer });
        batchBuffer = "";
    }

    function handleWrite(buffer) {
        const text = typeof buffer === 'string' ? buffer
                   : new TextDecoder("utf-8").decode(buffer);
        if (!text) return buffer.length || 0;
        hasAnyOutput = true;
        if (outputCapped) return buffer.length || text.length;

        totalBytes += text.length;
        totalLines += (text.match(/\n/g) || []).length;

        if (totalBytes > MAX_OUTPUT_BYTES || totalLines > MAX_OUTPUT_LINES) {
            outputCapped = true;
            if (batchBuffer) { send("output", { text: batchBuffer }); batchBuffer = ""; }
            if (batchTimer) { clearTimeout(batchTimer); batchTimer = null; }
            send("output", {
                text: `\n[PyNeo] Salida limitada: se alcanzo el maximo de ` +
                      `${MAX_OUTPUT_LINES.toLocaleString()} lineas / ` +
                      `${(MAX_OUTPUT_BYTES / 1024).toFixed(0)} KB.\n` +
                      `Usa el boton Detener para parar el bucle, o añade una condicion de salida.\n`
            });
            if (interruptBuffer) interruptBuffer[0] = 2;
            return buffer.length || text.length;
        }

        batchBuffer += text;
        if (!batchTimer) batchTimer = setTimeout(flushBatch, OUTPUT_FLUSH_MS);
        return buffer.length || text.length;
    }

    pyodide.setStdout({ write: handleWrite });
    pyodide.setStderr({ write: handleWrite });

    
    await pyodide.runPythonAsync(`
import sys, builtins

for _p in ["", "External Libraries/< Python 3.10 >", ".venv/Lib/site-packages"]:
    if _p not in sys.path:
        sys.path.insert(0, _p)

builtins.__pyneo_inputs__    = ${JSON.stringify(preCollectedResponses || [])}
builtins.__pyneo_input_idx__ = 0

def custom_input(prompt=""):
    if prompt:
        print(str(prompt), end="", flush=True)
    if (hasattr(builtins, "__pyneo_inputs__") and
            builtins.__pyneo_input_idx__ < len(builtins.__pyneo_inputs__)):
        val = builtins.__pyneo_inputs__[builtins.__pyneo_input_idx__]
        builtins.__pyneo_input_idx__ += 1
        print(val)
        return val
    raise EOFError("No hay mas entradas disponibles.")

builtins.input = custom_input
`);

    
    if (successfullyLoaded.length === 0) {
        const already = [];
        for (const pkg of ['pandas', 'numpy', 'matplotlib']) {
            try { await pyodide.runPythonAsync(`import ${pkg}`); already.push(pkg); } catch(e) {}
        }
        if (already.length > 0) await setupScienceEnv(already);
    }

    send("output", { text: `>>> Ejecutando [${fileToRun}]...\n` });

    
    await pyodide.runPythonAsync(`
with open(${JSON.stringify(fileToRun)}, "r") as _f:
    exec(_f.read(), globals())
`);

    
    if (batchTimer) { clearTimeout(batchTimer); batchTimer = null; }
    flushBatch();

    if (!hasAnyOutput) {
        send("output", { text: ">>> Codigo ejecutado con exito sin salida de consola." });
    }

    
    const newFiles = snapshotFS(prePaths);
    if (Object.keys(newFiles).length > 0) {
        send("fs_update", { newFiles });
    }

    send("done", { output: "" });
    isRunning = false;
}


async function lintCode(code, activeFile, fileList) {
    if (!pyodide) { send("lint_result", { annotations: [] }); return; }
    try {
        const codeJson = JSON.stringify(code);
        await pyodide.runPythonAsync(`
import ast as _ast, json as _json

_pyneo_lint_errors = []
try:
    _ast.parse(${codeJson})
except SyntaxError as _e:
    _pyneo_lint_errors = [{
        "row":  max(0, (_e.lineno or 1) - 1),
        "col":  max(0, (_e.offset or 1) - 1),
        "text": "SyntaxError: " + str(_e.msg),
        "type": "error"
    }]
except Exception:
    pass
_pyneo_lint_json = _json.dumps(_pyneo_lint_errors)
`);
        const jsonStr = pyodide.globals.get('_pyneo_lint_json');
        const annotations = JSON.parse(jsonStr || '[]');

        if (activeFile) {
            const fileName = activeFile.split('/').pop().toLowerCase();
            const knownLibraries = ['pandas', 'numpy', 'matplotlib', 'scipy', 'random', 'math', 'sys', 'os', 'json', 'csv', 'time', 'datetime'];
            for (let lib of knownLibraries) {
                if (fileName === `${lib}.py`) {
                    const importRegex = new RegExp(`\\b(import\\s+${lib}|from\\s+${lib}\\s+import)\\b`);
                    if (importRegex.test(code)) {
                        annotations.push({
                            row: 0,
                            col: 0,
                            text: `Advertencia: El archivo se llama '${activeFile.split('/').pop()}'. Esto causará un conflicto (circular import / shadowing) con la librería estándar/instalada '${lib}' al hacer 'import ${lib}'. Por favor renombra este archivo (ej. 'demo_${lib}.py').`,
                            type: 'warning'
                        });
                    }
                }
            }

            if (fileList) {
                for (let lib of knownLibraries) {
                    const importRegex = new RegExp(`\\b(import\\s+${lib}|from\\s+${lib}\\s+import)\\b`);
                    if (importRegex.test(code)) {
                        const shadowingFile = fileList.find(f => {
                            const base = f.split('/').pop().toLowerCase();
                            return base === `${lib}.py`;
                        });
                        if (shadowingFile && shadowingFile !== activeFile) {
                            annotations.push({
                                row: 0,
                                col: 0,
                                text: `Advertencia: Tienes un archivo llamado '${shadowingFile.split('/').pop()}' en tu espacio de trabajo. Esto causará un conflicto (circular import / shadowing) con la librería '${lib}' al hacer 'import ${lib}'. Por favor renombra o elimina ese archivo de tu explorador de archivos.`,
                                type: 'warning'
                            });
                        }
                    }
                }
            }
        }

        send("lint_result", { annotations });
    } catch(e) {
        send("lint_result", { annotations: [] });
    }
}


self.onmessage = async (e) => {
    const { type, ...data } = e.data;

    if (type === "init") {
        await initPyodide();

    } else if (type === "run") {
        try {
            await runCode(data);
        } catch (err) {
            isRunning = false;
            const msg = err ? (err.message || String(err)) : "Error desconocido";
            if (msg.includes("KeyboardInterrupt")) {
                send("interrupted", { output: "" });
            } else {
                send("output", { text: "\n" + msg + "\n" });
                send("done",  { output: "" });
            }
        }

    } else if (type === "interrupt") {
        if (interruptBuffer) interruptBuffer[0] = 2;

    } else if (type === "lint") {
        if (!isRunning) await lintCode(data.code, data.activeFile, data.fileList);
        else send("lint_result", { annotations: [] });
    }
};
