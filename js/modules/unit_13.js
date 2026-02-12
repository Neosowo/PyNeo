window.modules.push({
    id: 13,
    title: "Manejo de Archivos",
    icon: "fa-file-code",
    description: "Aprende a leer y escribir datos de forma permanente.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Persistencia de Datos</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Hasta ahora, tus datos desaparecían al cerrar el programa. 
                Con el manejo de archivos, puedes guardar información en el disco duro para siempre.
            </p>
            <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div class="neon-box-dark p-6 border border-neon-green">
                    <i class="fas fa-file-import text-3xl text-neon-green mb-3"></i>
                    <h4 class="text-white font-bold mb-1">Lectura</h4>
                    <p class="text-xs text-gray-400">Extrae información de archivos existentes.</p>
                </div>
                <div class="neon-box-dark p-6 border border-blue-500">
                    <i class="fas fa-file-export text-3xl text-blue-500 mb-3"></i>
                    <h4 class="text-white font-bold mb-1">Escritura</h4>
                    <p class="text-xs text-gray-400">Crea nuevos archivos o actualiza los actuales.</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Escribiendo Archivos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Guardando Información</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Para trabajar con archivos usamos la función <code>open()</code>. El modo <code>"w"</code> (write) nos permite crear un archivo y escribir contenido en él.
                    </p>
                    
                    <div class="bg-black/30 p-4 rounded border border-gray-700 mb-8">
                        <h5 class="text-white font-bold text-sm mb-2">Pasos Esenciales</h5>
                        <ul class="text-xs text-gray-500 space-y-2 ml-4 list-decimal">
                            <li>Abrir el archivo: <code>f = open("log.txt", "w")</code></li>
                            <li>Escribir: <code>f.write("Hola")</code></li>
                            <li><strong>¡Muy importante!</strong> Cerrarlo: <code>f.close()</code></li>
                        </ul>
                    </div>

                    <div class="neon-box-secondary p-6 border-l-2 border-neon-green">
                        <h4 class="text-lg font-bold text-white mb-2">Seguridad</h4>
                        <p class="text-gray-300 text-sm">
                            Si no cierras el archivo, los datos podrían no guardarse correctamente o el archivo podría quedar bloqueado.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Creador de Notas</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Crea un archivo llamado <code>nota.txt</code>, escribe en él la palabra "Excelente" y luego ciérralo.
                    </p>
                    <textarea id="code-file-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Abre, escribe y cierra:

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-file-1').value, 'output-file-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Guardar en Disco
                    </button>
                </div>
                <div id="output-file-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Accediendo al sistema de archivos...</p>
                </div>
            `,
            validation: {
                expectedOutput: "",
                matchType: "exact",
                requiredCode: "close",
                hint: "Usa f = open('nota.txt', 'w'), luego f.write('Excelente') y finalmente f.close()."
            }
        },
        {
            title: "Leyendo Contenido",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Recuperando Datos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Para leer, usamos el modo <code>"r"</code> (read). Una vez abierto, el método <code>.read()</code> nos devuelve todo el contenido del archivo como un solo texto.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="neon-box-dark p-6 border-l-2 border-blue-500">
                            <h4 class="text-xl font-bold text-white mb-3">Modo Lectura</h4>
                            <code class="text-xs text-neon-green block">open("file.txt", "r")</code>
                        </div>
                        
                        <div class="neon-box-dark p-6 border-l-2 border-yellow-500">
                            <h4 class="text-xl font-bold text-white mb-3">Método Read</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                <code>contenido = f.read()</code>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Lector de Logs</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Abre el archivo <code>test.txt</code> en modo lectura, lee su contenido, guárdalo en una variable e imprímela. (El archivo ya existe internamente con el texto 'Hecho').
                    </p>
                    <textarea id="code-file-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># El archivo 'test.txt' ya existe.
# Ábrelo, léelo e imprime el contenido:

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-file-2').value, 'output-file-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Leer Archivo
                    </button>
                </div>
                <div id="output-file-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Extrayendo bytes...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Hecho",
                matchType: "include",
                hint: "Usa f = open('test.txt', 'r'), luego data = f.read() y print(data)."
            }
        }
    ]
});
