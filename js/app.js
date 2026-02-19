



const CONFIG = {
    SUCCESS_IMAGE: "https://i.postimg.cc/59m1Nk0S/feli.gif",
    SUCCESS_TITLE: "¡Misión Cumplida!",
    CONFETTI_DURATION: 3000
};

let currentModule = null;
let currentLesson = 0;
let progress = JSON.parse(localStorage.getItem('PyNeo-progress')) || {};
let lessonProgress = JSON.parse(localStorage.getItem('PyNeo-lesson-progress')) || {};




const PYTHON_FS_POLYFILL = `
class _VirtualFile:
    def __init__(self, name, mode):
        self.name = name
        self.mode = mode
        self.content = ""
        self.closed = False
        if name == "test.txt" and "r" in mode:
            self.content = "Hecho"

    def __enter__(self): return self
    def __exit__(self, type, value, traceback): self.close()
    
    def write(self, data):
        if self.closed: raise ValueError("I/O operation on closed file")
        self.content += str(data)
    
    def read(self):
        if self.closed: raise ValueError("I/O operation on closed file")
        return self.content
        
    def close(self):
        self.closed = True

def open(name, mode="r"):
    return _VirtualFile(name, mode)
`;

// ─── Pandas Polyfill for Skulpt ───────────────────────────────────────────────
const PANDAS_POLYFILL = `
class Series:
    def __init__(self, data, name=None, index=None):
        if isinstance(data, list):
            self._data = data[:]
        elif isinstance(data, dict):
            self._data = list(data.values())
        else:
            self._data = list(data)
        self.name = name
        self.index = index if index is not None else list(range(len(self._data)))
        self.values = self._data

    def __len__(self): return len(self._data)
    def __iter__(self): return iter(self._data)
    def __getitem__(self, key):
        if isinstance(key, list):
            return Series([self._data[i] for i, v in enumerate(key) if v], name=self.name)
        if isinstance(key, Series):
            return Series([self._data[i] for i, v in enumerate(key._data) if v], name=self.name)
        return self._data[key]
    def __gt__(self, val): return Series([x > val for x in self._data])
    def __lt__(self, val): return Series([x < val for x in self._data])
    def __ge__(self, val): return Series([x >= val for x in self._data])
    def __le__(self, val): return Series([x <= val for x in self._data])
    def __eq__(self, val): return Series([x == val for x in self._data])
    def __ne__(self, val): return Series([x != val for x in self._data])
    def __and__(self, other): return Series([a and b for a,b in zip(self._data, other._data)])
    def __or__(self, other): return Series([a or b for a,b in zip(self._data, other._data)])
    def sum(self): return sum(self._data)
    def mean(self):
        if len(self._data) == 0: return 0
        return sum(self._data) / len(self._data)
    def min(self): return min(self._data)
    def max(self): return max(self._data)
    def count(self): return len(self._data)
    def std(self):
        if len(self._data) < 2: return 0
        m = self.mean()
        variance = sum((x - m) ** 2 for x in self._data) / (len(self._data) - 1)
        return variance ** 0.5
    def tolist(self): return self._data[:]
    def __repr__(self):
        lines = []
        for i, v in zip(self.index, self._data):
            lines.append(str(i) + "    " + str(v))
        if self.name:
            lines.append("Name: " + str(self.name) + ", dtype: object")
        return "\n".join(lines)
    def __str__(self): return self.__repr__()


class _GroupBy:
    def __init__(self, df, by):
        self._df = df
        self._by = by
        self._groups = {}
        by_col = df[by]
        for i, key in enumerate(by_col._data):
            if key not in self._groups:
                self._groups[key] = []
            self._groups[key].append(i)

    def __getitem__(self, col):
        return _GroupByCol(self._df, self._groups, col)


class _GroupByCol:
    def __init__(self, df, groups, col):
        self._df = df
        self._groups = groups
        self._col = col

    def _apply(self, func):
        result = {}
        for key, indices in sorted(self._groups.items()):
            vals = [self._df[self._col]._data[i] for i in indices]
            result[key] = func(vals)
        s = Series(list(result.values()), name=self._col, index=list(result.keys()))
        return s

    def sum(self): return self._apply(sum)
    def mean(self): return self._apply(lambda v: sum(v)/len(v) if v else 0)
    def min(self): return self._apply(min)
    def max(self): return self._apply(max)
    def count(self): return self._apply(len)


class DataFrame:
    def __init__(self, data=None, columns=None):
        self._cols = {}
        self._index = []
        if data is None:
            return
        if isinstance(data, dict):
            length = 0
            for k, v in data.items():
                self._cols[k] = list(v)
                length = len(v)
            self._index = list(range(length))
        elif isinstance(data, list):
            if len(data) > 0 and isinstance(data[0], dict):
                all_keys = list(data[0].keys())
                for k in all_keys:
                    self._cols[k] = [row.get(k, None) for row in data]
                self._index = list(range(len(data)))
        if columns:
            new_cols = {}
            for c in columns:
                new_cols[c] = self._cols.get(c, [])
            self._cols = new_cols

    def _num_rows(self):
        if not self._cols: return 0
        return len(list(self._cols.values())[0])

    def __len__(self): return self._num_rows()

    def __getitem__(self, key):
        if isinstance(key, str):
            return Series(self._cols[key], name=key, index=self._index)
        if isinstance(key, list):
            new_data = {k: self._cols[k] for k in key}
            return DataFrame(new_data)
        if isinstance(key, Series):
            mask = key._data
            new_data = {}
            new_index = []
            for i, keep in enumerate(mask):
                if keep:
                    new_index.append(self._index[i])
            for col, vals in self._cols.items():
                new_data[col] = [vals[i] for i, keep in enumerate(mask) if keep]
            df2 = DataFrame(new_data)
            df2._index = new_index
            return df2
        raise KeyError(str(key))

    def __setitem__(self, key, value):
        if isinstance(value, Series):
            self._cols[key] = value._data
        elif isinstance(value, list):
            self._cols[key] = value
        else:
            n = self._num_rows()
            self._cols[key] = [value] * n

    def groupby(self, by):
        return _GroupBy(self, by)

    def columns(self):
        return list(self._cols.keys())

    def shape(self):
        return (self._num_rows(), len(self._cols))

    def _lerp(self, sv, idx):
        lo = int(idx)
        hi = lo + 1
        if hi >= len(sv): return sv[lo]
        return sv[lo] + (sv[hi] - sv[lo]) * (idx - lo)

    def describe(self):
        num_cols = {}
        for k, v in self._cols.items():
            if all(isinstance(x, (int, float)) for x in v):
                num_cols[k] = v
        if not num_cols:
            return DataFrame()
        stats = ["count", "mean", "std", "min", "25%", "50%", "75%", "max"]
        result = {}
        result[""] = stats
        for col, vals in num_cols.items():
            n = len(vals)
            sv = sorted(vals)
            mean_v = sum(vals) / n if n else 0
            std_v = (sum((x - mean_v)**2 for x in vals) / (n-1))**0.5 if n > 1 else 0
            q1_idx = (n - 1) * 25 / 100
            q2_idx = (n - 1) * 50 / 100
            q3_idx = (n - 1) * 75 / 100
            result[col] = [
                float(n),
                round(mean_v, 6),
                round(std_v, 6),
                float(sv[0]),
                round(self._lerp(sv, q1_idx), 6),
                round(self._lerp(sv, q2_idx), 6),
                round(self._lerp(sv, q3_idx), 6),
                float(sv[-1])
            ]
        df_desc = DataFrame(result)
        return df_desc

    def head(self, n=5):
        new_data = {k: v[:n] for k, v in self._cols.items()}
        df2 = DataFrame(new_data)
        df2._index = self._index[:n]
        return df2

    def tail(self, n=5):
        new_data = {k: v[-n:] for k, v in self._cols.items()}
        df2 = DataFrame(new_data)
        df2._index = self._index[-n:]
        return df2

    def _col_widths(self):
        widths = {}
        for col in self._cols:
            w = max(len(str(col)), max((len(str(v)) for v in self._cols[col]), default=0))
            widths[col] = w
        return widths

    def __repr__(self):
        if not self._cols: return "Empty DataFrame"
        col_names = list(self._cols.keys())
        rows = self._num_rows()
        lines = []
        header = "   "
        for c in col_names:
            header = header + "  " + str(c)
        lines.append(header)
        for i in range(rows):
            row = str(self._index[i]) + "  "
            for c in col_names:
                val = self._cols[c][i] if i < len(self._cols[c]) else ""
                row = row + "  " + str(val)
            lines.append(row)
        return "\n".join(lines)

    def __str__(self): return self.__repr__()


`;





const POLYFILL_OFFSET = PYTHON_FS_POLYFILL.split('\n').length + 1;

function runPythonCode(code, outputId) {
    console.log(`Ejecutando código Python para: ${outputId}`);

    let outputElement = document.getElementById(outputId);


    if (!outputElement) {
        console.warn(`Elemento "${outputId}" no encontrado. Buscando alternativa...`);
        outputElement = document.querySelector('#lesson-content .code-output');

        if (!outputElement) {
            outputElement = document.querySelector('.code-output');
        }

        if (!outputElement) {
            console.error("No se encontró ningún elemento de salida. Creando uno de emergencia.");
            const container = document.getElementById('lesson-content') || document.body;
            outputElement = document.createElement('div');
            outputElement.id = 'emergency-output';
            outputElement.className = 'code-output p-4 text-sm mt-4';
            container.appendChild(outputElement);
        }
    }


    const terminalHeader = `
        <div class="flex items-center justify-between mb-3 border-b border-white/5 pb-2 -mx-2 px-2">
            <div class="flex items-center gap-2">
                <div class="flex gap-1.5 ml-1">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
                </div>
                <span class="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 select-none">Python Console</span>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="copyOutput('${outputId}')" class="text-gray-600 hover:text-white transition-all transform hover:scale-110" title="Copiar salida">
                    <i class="fas fa-copy text-[10px]"></i>
                </button>
                <button onclick="clearOutput('${outputId}')" class="text-gray-600 hover:text-red-400 transition-all transform hover:scale-110" title="Limpiar consola">
                    <i class="fas fa-trash-alt text-[10px]"></i>
                </button>
            </div>
        </div>
    `;

    try {
        outputElement.innerHTML = terminalHeader + '<p class="text-yellow-400 animate-pulse font-mono flex items-center gap-2 text-xs py-2"><i class="fas fa-spinner fa-spin"></i> Procesando comandos...</p>';

        let output = '';

        if (typeof Sk === 'undefined') {
            throw new Error("Skulpt no detectado. Verifica tu conexión.");
        }

        Sk.configure({
            output: function (text) {
                output += text;
                console.log("Python Output:", text);
            },
            read: function (x) {
                // Intercept pandas import and serve our polyfill
                if (x === 'pandas' || x === 'pandas/__init__.py' || x.startsWith('pandas/')) {
                    return PANDAS_POLYFILL;
                }
                if (!Sk.builtinFiles || !Sk.builtinFiles["files"] || !Sk.builtinFiles["files"][x])
                    throw "Archivo no encontrado: '" + x + "'";
                return Sk.builtinFiles["files"][x];
            },
            inputfun: function (prompt) {
                return new Promise((resolve) => {
                    customPrompt(prompt || ">>> ").then((userInput) => {
                        output += (userInput || "") + "\n";
                        resolve(userInput || "");
                    });
                });
            }
        });


        // Inject pandas polyfill as a builtin file so `import pandas as pd` works
        if (!Sk.builtinFiles) Sk.builtinFiles = { files: {} };
        Sk.builtinFiles["files"]["pandas"] = PANDAS_POLYFILL;
        Sk.builtinFiles["files"]["pandas/__init__.py"] = PANDAS_POLYFILL;

        const finalCode = PYTHON_FS_POLYFILL + "\n" + code;
        console.log("Running code with polyfill length:", PYTHON_FS_POLYFILL.length);

        const promise = Sk.misceval.asyncToPromise(function () {

            return Sk.importMainWithBody("<stdin>", false, finalCode, true);
        });

        promise.then(
            function (mod) {
                const escapedOutput = output
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");

                const contentHtml = output.trim() === ""
                    ? '<pre class="text-gray-600 italic text-xs font-mono py-2 opacity-50"><i class="fas fa-info-circle mr-2"></i>El programa finalizó sin imprimir texto.</pre>'
                    : '<pre class="text-blue-100 font-mono text-sm whitespace-pre-wrap leading-relaxed py-1">' + escapedOutput + '</pre>';

                outputElement.innerHTML = terminalHeader + contentHtml;
                checkLessonValidation(code, output, outputElement.id);
            },
            function (err) {
                console.error("Skulpt Runtime Error:", err);


                let errMsg = "Error desconocido";
                if (err) {
                    errMsg = err.toString();

                    errMsg = errMsg.replace(/line (\d+)/g, (match, lineStr) => {
                        const lineNum = parseInt(lineStr);

                        if (lineNum > POLYFILL_OFFSET) {
                            return "line " + (lineNum - POLYFILL_OFFSET);
                        }
                        return match;
                    });
                }

                outputElement.innerHTML = terminalHeader + `
                    <div class="bg-red-500/5 border-l-2 border-red-500/50 p-3 my-1 rounded-r">
                        <p class="text-red-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 mb-1">
                            <i class="fas fa-exclamation-triangle"></i> Runtime Error
                        </p>
                        <pre class="text-red-300 text-xs font-mono whitespace-pre-wrap">${errMsg}</pre>
                    </div>
                `;

                if (currentModule && currentLesson !== null) {
                    const lesson = currentModule.lessons[currentLesson];
                    if (lesson && lesson.validation) {
                        const nextBtn = document.getElementById('next-lesson');
                        if (nextBtn) {
                            nextBtn.disabled = true;
                            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                            nextBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Repara el error';
                        }
                    }
                }
            }
        );
    } catch (e) {
        console.error("Fatal Error inside runPythonCode:", e);
        outputElement.innerHTML = `<p class="text-red-500 font-bold text-xs p-2">Error fatal: ${e.message}</p>`;
    }
}


function checkLessonValidation(code, output, outputId) {
    if (!currentModule || currentLesson === null) return;
    const lesson = currentModule.lessons[currentLesson];
    if (!lesson) return;

    const nextBtn = document.getElementById('next-lesson');

    if (!lesson.validation) {
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            nextBtn.innerHTML = (currentLesson === currentModule.lessons.length - 1) ?
                'FINALIZAR UNIDAD <i class="fas fa-trophy ml-2"></i>' :
                'SIGUIENTE <i class="fas fa-chevron-right ml-2"></i>';
        }
        return;
    }

    const rules = lesson.validation;
    let isValid = true;
    let failureReason = "";

    if (rules.forbidden && rules.forbidden.some(word => code.includes(word))) {
        isValid = false;
        failureReason = rules.hint || "No has cambiado el código de ejemplo.";
    }

    if (rules.expectedOutput) {
        if (rules.matchType === 'exact') {
            if (output.trim() !== rules.expectedOutput.trim()) {
                isValid = false;
                failureReason = `Esperaba ver: "${rules.expectedOutput}"\nPero vi: "${output.trim()}"`;
            }
        } else {
            if (!output.includes(rules.expectedOutput)) {
                isValid = false;
                failureReason = `El resultado debe incluir: "${rules.expectedOutput}"`;
            }
        }
    }

    if (rules.requiredCode && !code.includes(rules.requiredCode)) {
        isValid = false;
        failureReason = rules.hint || "Falta código requerido.";
    }

    const outputElement = document.getElementById(outputId) || document.querySelector('#lesson-content .code-output');
    if (!outputElement) {
        console.error(`Validation Error: Output element for "${outputId}" not found.`);
        return;
    }

    if (isValid) {

        outputElement.innerHTML += `
            <div class="mt-4 pt-4 border-t border-white/5 animate-pulse">
                <p class="text-neon-green font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center bg-green-500/10 py-2 rounded">
                    <i class="fas fa-check-circle mr-2"></i> Reto Superado
                </p>
            </div>
        `;
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            nextBtn.innerHTML = (currentLesson === currentModule.lessons.length - 1) ?
                'FINALIZAR UNIDAD <i class="fas fa-trophy ml-2"></i>' :
                'SIGUIENTE <i class="fas fa-chevron-right ml-2"></i>';
        }
    } else {

        outputElement.innerHTML += `
            <div class="mt-4 pt-4 border-t border-white/5">
                <p class="text-orange-400 font-bold text-[10px] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <i class="fas fa-redo-alt"></i> Casi listo
                </p>
                <div class="bg-orange-500/5 p-3 rounded text-orange-200/70 italic text-xs font-sans line-clamp-2">
                    ${failureReason}
                </div>
            </div>
        `;
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
            nextBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Repara el error';
        }
    }
}


function clearOutput(id) {
    const el = document.getElementById(id);
    if (el) {
        const terminalHeader = `
            <div class="flex items-center justify-between mb-3 border-b border-white/5 pb-2 -mx-2 px-2">
                <div class="flex items-center gap-2">
                    <div class="flex gap-1.5 ml-1">
                        <div class="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
                    </div>
                    <span class="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] ml-2 select-none">Python Console</span>
                </div>
            </div>
        `;
        el.innerHTML = terminalHeader + `
            <p class="text-gray-700 italic text-xs font-mono py-2 select-none">
                <i class="fas fa-eraser mr-2"></i>Consola reseteada. Lista para ejecutar.
            </p>
        `;
    }
}

function copyOutput(id) {
    const el = document.getElementById(id);
    if (el) {
        const pre = el.querySelector('pre');
        if (pre) {
            const text = pre.innerText;
            navigator.clipboard.writeText(text).then(() => {
                const btn = el.querySelector('button[title="Copiar salida"]');
                if (btn) {
                    const originalIcon = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check text-neon-green"></i>';
                    btn.classList.add('scale-125');
                    setTimeout(() => {
                        btn.innerHTML = originalIcon;
                        btn.classList.remove('scale-125');
                    }, 1500);
                }
            });
        }
    }
}











function init() {
    loadModules();
    updateOverallProgress();
}

function loadModules() {
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = '';


    if (typeof modules === 'undefined' || !modules) {
        grid.innerHTML = '<div class="text-red-500 neon-box p-4">Error: No se han cargado los módulos. Revisa js/modules/data.js</div>';
        return;
    }

    modules.forEach((module, index) => {

        if (module.id === 0) return;


        const isLocked = false;
        const isCompleted = progress[module.id];

        let percent = 0;
        if (isCompleted) {
            percent = 100;
        } else if (lessonProgress[module.id] !== undefined) {
            const totalSteps = (module.intro ? 1 : 0) + module.lessons.length;
            const currentStep = (lessonProgress[module.id] === -1 && module.intro) ? 0 :
                (lessonProgress[module.id] + (module.intro ? 1 : 0));
            if (totalSteps > 0) {

                percent = Math.min(95, Math.round((currentStep / totalSteps) * 100));
            }
        }

        const card = document.createElement('div');
        card.className = `module-card p-8 ${isLocked ? 'locked pointer-events-none' : 'cursor-pointer'} reveal`;


        card.innerHTML = `
            <div class="flex items-start justify-between mb-6">
                <div class="relative">
                    <svg class="progress-ring w-20 h-20" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" stroke="rgba(99, 102, 241, 0.1)" stroke-width="4" fill="none"/>
                        <circle class="progress-ring-circle" cx="40" cy="40" r="36" stroke="#6366f1" stroke-width="4" fill="none" 
                                style="transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1); filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.5));"
                                stroke-dasharray="${2 * Math.PI * 36}" stroke-dashoffset="${2 * Math.PI * 36 - (percent / 100) * 2 * Math.PI * 36}" stroke-linecap="round"/>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center"><i class="fas ${module.icon} text-3xl text-neon-green"></i></div>
                </div>
                ${isCompleted ? '<div class="badge-neon px-3 py-1 rounded text-xs font-bold flex items-center gap-1"><i class="fas fa-check"></i> LISTO</div>' : ''}
                ${percent > 0 && !isCompleted ? `<div class="bg-blue-900/50 text-blue-300 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 border border-blue-500/30">${percent}%</div>` : ''}
                ${isLocked ? '<div class="neon-box px-3 py-1 rounded text-xs font-bold flex items-center gap-1 text-gray-400"><i class="fas fa-lock"></i> BLOQUEADO</div>' : ''}
            </div>
            <h3 class="text-2xl font-black mb-3 text-white">${module.title}</h3>
            <p class="text-gray-400 mb-4">${module.description}</p>
        `;
        if (!isLocked) {
            card.onclick = () => openModule(module.id);


            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }
        grid.appendChild(card);
    });



    setTimeout(() => document.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('active'), i * 100)), 100);
}

function openModule(id) {
    currentModule = modules.find(m => m.id === id);


    const savedLesson = lessonProgress[currentModule.id];
    if (savedLesson !== undefined) {

        if (savedLesson >= currentModule.lessons.length) {
            currentLesson = currentModule.lessons.length > 0 ? currentModule.lessons.length - 1 : (currentModule.intro ? -1 : 0);
        } else {
            currentLesson = savedLesson;
        }
    } else {
        currentLesson = currentModule.intro ? -1 : 0;
    }

    document.getElementById('modules-section').classList.add('hidden');
    document.getElementById('exercises-section').classList.add('hidden');
    document.getElementById('module-content').classList.remove('hidden');
    document.getElementById('hero-section').classList.add('hidden');
    document.getElementById('main-nav').style.display = 'none';
    loadLesson();
}

function closeModule() {
    document.getElementById('modules-section').classList.remove('hidden');
    document.getElementById('exercises-section').classList.remove('hidden');
    document.getElementById('module-content').classList.add('hidden');
    document.getElementById('hero-section').classList.remove('hidden');
    document.getElementById('main-nav').style.display = 'block';

    if (currentModule) {
        saveLessonProgress();
    }
    currentModule = null;
    loadModules();
}

function saveLessonProgress() {
    if (currentModule && currentModule.id) {
        lessonProgress[currentModule.id] = currentLesson;
        safeSave('PyNeo-lesson-progress', lessonProgress);
    }
}

function loadLesson() {
    saveLessonProgress();
    const prevBtn = document.getElementById('prev-lesson');
    const nextBtn = document.getElementById('next-lesson');


    if (currentLesson === -1) {
        document.getElementById('module-title').textContent = currentModule.title;
        document.getElementById('module-description').textContent = "Introducción";
        document.getElementById('lesson-content').innerHTML = currentModule.intro;


        prevBtn.disabled = true;
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-2"></i>ANTERIOR';


        nextBtn.innerHTML = 'COMENZAR LECCIONES <i class="fas fa-chevron-right ml-2"></i>';
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');

        window.scrollTo(0, 0);
        return;
    }


    const lesson = currentModule.lessons[currentLesson];
    document.getElementById('module-title').textContent = currentModule.title;
    document.getElementById('module-description').textContent = `Lección ${currentLesson + 1}: ${lesson.title}`;
    document.getElementById('lesson-content').innerHTML = lesson.content;


    if (currentLesson === 0) {
        if (currentModule.intro) {
            prevBtn.disabled = false;
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            prevBtn.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>INTRO';
        } else {
            prevBtn.disabled = true;
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-2"></i>ANTERIOR';
        }
    } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-2"></i>ANTERIOR';
    }


    if (lesson.validation) {
        nextBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Completa el reto';
        nextBtn.disabled = true;
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.innerHTML = currentLesson === currentModule.lessons.length - 1 ?
            'FINALIZAR UNIDAD <i class="fas fa-trophy ml-2"></i>' :
            'SIGUIENTE <i class="fas fa-chevron-right ml-2"></i>';
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    window.scrollTo(0, 0);
}

function nextLesson() {
    if (currentLesson === -1) {
        currentLesson = 0;
        loadLesson();
    } else if (currentLesson < currentModule.lessons.length - 1) {
        currentLesson++;
        loadLesson();
    } else {
        completeModule();
    }
}

function previousLesson() {
    if (currentLesson > 0) {
        currentLesson--;
        loadLesson();
    } else if (currentLesson === 0 && currentModule.intro) {
        currentLesson = -1;
        loadLesson();
    }
}

function completeModule() {
    progress[currentModule.id] = true;
    safeSave('PyNeo-progress', progress);


    lessonProgress[currentModule.id] = currentModule.lessons.length - 1;
    safeSave('PyNeo-lesson-progress', lessonProgress);

    showSuccessModal(`¡Completaste ${currentModule.title}!`, CONFIG.SUCCESS_IMAGE);

}

function showSuccessModal(message, imageSrc) {
    const modal = document.getElementById('success-modal');
    const msgEl = document.getElementById('success-message');
    const imgEl = document.getElementById('success-image');
    const iconEl = document.getElementById('success-icon');

    if (msgEl) msgEl.textContent = message;

    if (imageSrc && imgEl) {
        imgEl.src = imageSrc;
        imgEl.classList.remove('hidden');
        if (iconEl) iconEl.classList.add('hidden');
    } else {
        if (imgEl) imgEl.classList.add('hidden');
        if (iconEl) iconEl.classList.remove('hidden');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');







    closeModule();
    loadModules();
    updateOverallProgress();
}

function updateOverallProgress() {
    const completed = Object.keys(progress).length;
    const total = modules ? modules.length : 0;
    document.getElementById('overall-progress').textContent = `${total > 0 ? Math.round((completed / total) * 100) : 0}%`;
}

function resetProgress() {
    if (confirm('¿Estás seguro de que quieres reiniciar tu progreso?')) {
        progress = {};
        lessonProgress = {};
        safeSave('PyNeo-progress', {});
        safeSave('PyNeo-lesson-progress', {});
        loadModules();
        updateOverallProgress();
    }
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = '#00ff88';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}





function toggleDataMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('data-menu');
    menu.classList.toggle('hidden');
}


document.addEventListener('click', () => {
    const menu = document.getElementById('data-menu');
    if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});

const SECRET_SALT = "PyNeo_Secure_System_2026_NoCheating";


function safeSave(key, value) {
    if (typeof value !== 'string') value = JSON.stringify(value);
    localStorage.setItem(key, value);
}


async function generateSignature(data) {
    const { signature, ...dataToSign } = data;
    const jsonString = JSON.stringify(dataToSign);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(jsonString + SECRET_SALT);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}


async function exportProgress() {
    const data = {
        progress: JSON.parse(localStorage.getItem('PyNeo-progress') || '{}'),
        lessonProgress: JSON.parse(localStorage.getItem('PyNeo-lesson-progress') || '{}'),
        evalProgress: JSON.parse(localStorage.getItem('PyNeo-eval-progress') || '{}'),
        userColor: localStorage.getItem('PyNeo-user-color'),
        timestamp: new Date().toISOString(),
        version: "2.0 (Encrypted)"
    };

    data.signature = await generateSignature(data);

    const jsonString = JSON.stringify(data);
    const obfuscated = btoa(unescape(encodeURIComponent(jsonString)));
    const finalPayload = `PYNEO_SECURE_DATA::${obfuscated}`;

    const blob = new Blob([finalPayload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pyneo_progreso_seguro_${new Date().toLocaleDateString().replace(/\//g, '-')}.pyn`; // New extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importProgressTrigger() {
    const input = document.getElementById('import-progress-file');
    if (input) input.click();
}

document.addEventListener('DOMContentLoaded', () => {

    const importInput = document.getElementById('import-progress-file');
    if (importInput) {
        importInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async function (e) {
                try {
                    let content = e.target.result;
                    let data = null;

                    if (content.startsWith('PYNEO_SECURE_DATA::')) {
                        const base64Part = content.split('::')[1];
                        try {
                            const jsonString = decodeURIComponent(escape(atob(base64Part)));
                            data = JSON.parse(jsonString);
                        } catch (decodeErr) {
                            showNotification('Archivo corrupto: No se pudo desencriptar.', 'error');
                            return;
                        }
                    }
                    else {
                        // LEGACY BLOCK - Auto Reject
                        showNotification('Formato antiguo no soportado por seguridad.', 'error');
                        return;
                    }

                    if (!data.signature || (await generateSignature(data) !== data.signature)) {
                        showNotification('ALERTA DE SEGURIDAD: Firma digital inválida. Archivo modificado.', 'error');
                        return;
                    }

                    // Auto-accept valid files
                    safeSave('PyNeo-progress', JSON.stringify(data.progress));
                    if (data.lessonProgress) safeSave('PyNeo-lesson-progress', JSON.stringify(data.lessonProgress));

                    if (data.evalProgress) localStorage.setItem('PyNeo-eval-progress', JSON.stringify(data.evalProgress));
                    if (data.userColor) localStorage.setItem('PyNeo-user-color', data.userColor);

                    showNotification('Importación exitosa. Recargando...', 'success');
                    setTimeout(() => window.location.reload(), 1500);


                } catch (err) {
                    console.error('Fatal Import Error:', err);
                    showNotification('Error crítico al procesar el archivo.', 'error');
                }
            };
            reader.readAsText(file);
        });
    }
});

// Custom Prompt for Python Input
function customPrompt(message) {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in';
        modal.innerHTML = `
            <div class="bg-[#0a0a0a] border border-neon-green/30 rounded-xl p-6 max-w-sm w-full shadow-[0_0_30px_rgba(69,252,225,0.15)] transform scale-100 transition-all">
                <h3 class="text-neon-green font-bold text-lg mb-4 flex items-center gap-2">
                    <i class="fas fa-terminal"></i> Entrada Requerida
                </h3>
                <p class="text-gray-300 text-sm mb-4 font-mono">${message ? message.replace(/:/g, '') : 'Ingresa un valor'}:</p>
                <input type="text" id="custom-prompt-input" class="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green mb-4 font-mono text-sm" placeholder="Escribe aquí..." autocomplete="off">
                <button id="custom-prompt-submit" class="w-full btn-neon py-2 rounded text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                    Enviar <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        `;
        document.body.appendChild(modal);

        const input = modal.querySelector('#custom-prompt-input');
        const btn = modal.querySelector('#custom-prompt-submit');

        const submit = () => {
            const val = input.value;
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 200);
            resolve(val);
        };

        btn.onclick = submit;
        input.onkeypress = (e) => { if (e.key === 'Enter') submit(); };

        setTimeout(() => input.focus(), 50);
    });
}


// --- NOTIFICATION SYSTEM ---
function showNotification(message, type = 'info') {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-24 right-6 z-[200] flex flex-col items-end pointer-events-none gap-3';
        document.body.appendChild(container);
    }

    const notif = document.createElement('div');

    let colorClass, iconClass, title;

    switch (type) {
        case 'error':
            colorClass = 'border-red-500/50 bg-black/90 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
            iconClass = 'fa-exclamation-triangle text-red-500';
            title = 'ERROR';
            break;
        case 'success':
            colorClass = 'border-neon-green/50 bg-black/90 shadow-[0_0_20px_rgba(99,102,241,0.3)]';
            iconClass = 'fa-check-circle text-neon-green';
            title = 'ÉXITO';
            break;
        case 'warning':
            colorClass = 'border-yellow-500/50 bg-black/90 shadow-[0_0_20px_rgba(234,179,8,0.3)]';
            iconClass = 'fa-exclamation-circle text-yellow-500';
            title = 'ADVERTENCIA';
            break;
        default:
            colorClass = 'border-blue-500/50 bg-black/90 shadow-[0_0_20px_rgba(59,130,246,0.3)]';
            iconClass = 'fa-info-circle text-blue-500';
            title = 'INFO';
    }

    notif.className = `p-4 rounded-xl border ${colorClass} backdrop-blur-xl animate-fade-in flex items-start gap-3 min-w-[300px] max-w-sm pointer-events-auto transition-all duration-300 transform translate-x-10 opacity-0`;

    notif.innerHTML = `
        <div class="mt-0.5"><i class="fas ${iconClass} text-lg animate-pulse"></i></div>
        <div class="flex-1">
            <h4 class="font-black text-[10px] uppercase tracking-widest mb-1 text-gray-400">${title}</h4>
            <p class="text-xs font-medium leading-relaxed text-gray-200">${message}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="text-gray-500 hover:text-white transition-colors p-1">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(notif);

    // Animate in
    requestAnimationFrame(() => {
        notif.classList.remove('translate-x-10', 'opacity-0');
    });

    // Auto dismiss
    if (type !== 'error') {
        setTimeout(() => {
            notif.classList.add('translate-x-10', 'opacity-0');
            setTimeout(() => notif.remove(), 300);
        }, 5000);
    }
}

// Global helper for system messages (legacy support)
function showSystemMessage(msg) {
    showNotification(msg.replace('⚠️ ', ''), 'warning');
}

init();
