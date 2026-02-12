window.modules.push({
    id: 13,
    title: "Manejo de Archivos",
    icon: "fa-file-lines",
    description: "Aprende a leer y escribir información en archivos de texto.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Persistencia de Datos</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                ¿Qué pasa con tus datos cuando cierras el programa? ¡Se pierden! 
                Para guardarlos para siempre, usamos <b>archivos</b>.
            </p>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="neon-box-dark p-6 text-center border-l-4 border-blue-500">
                    <i class="fas fa-file-import text-4xl mb-3 text-blue-400"></i>
                    <h4 class="text-white font-bold mb-2">Lectura</h4>
                    <p class="text-sm text-gray-400">Traer datos del disco a la memoria.</p>
                </div>
                <div class="neon-box-dark p-6 text-center border-l-4 border-neon-green">
                    <i class="fas fa-file-export text-4xl mb-3 text-neon-green"></i>
                    <h4 class="text-white font-bold mb-2">Escritura</h4>
                    <p class="text-sm text-gray-400">Guardar datos de la memoria al disco.</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Abrir y Leer Archivos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">El comando 'open'</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Para trabajar con un archivo, primero debemos "abrirlo". Python usa la función <code class="text-neon-green">open()</code>.
                    </p>
                    
                    <div class="neon-box-secondary p-6">
                        <h5 class="font-bold text-white mb-2">Modos de Apertura</h5>
                        <ul class="text-sm text-gray-400 space-y-2">
                            <li><code class="text-neon-green">'r'</code>: <b>Read</b> (Lectura). El archivo debe existir.</li>
                            <li><code class="text-neon-green">'w'</code>: <b>Write</b> (Escritura). Borra todo y empieza de cero.</li>
                            <li><code class="text-neon-green">'a'</code>: <b>Append</b> (Anexar). Agrega al final sin borrar.</li>
                        </ul>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Simulación de lectura</span>
                    </div>
                    <textarea id="code-file-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># Simulamos un archivo en memoria
# En Python real usarías: f = open("archivo.txt", "r")

lineas = ["Hola Mundo", "Bienvenido a Python", "Fin del archivo"]

print("--- Leyendo archivo ---")
for linea in lineas:
    print(linea.strip())</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-file-1').value, 'output-file-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Leer Archivo
                    </button>
                </div>
                <div id="output-file-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado de la lectura...</p>
                </div>
            `},
        {
            title: "Escribir Datos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">¡No más olvidos!</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Para guardar datos, usamos el modo <code class="text-neon-green">'w'</code> o <code class="text-neon-green">'a'</code>.
                    </p>
                    
                    <div class="neon-box-dark p-6">
                        <h5 class="font-bold text-white mb-3">Flujo de Trabajo</h5>
                        <ol class="text-xs text-gray-400 list-decimal ml-4 space-y-2">
                            <li>Abrir el archivo: <code class="text-neon-green">f = open("datos.txt", "w")</code></li>
                            <li>Escribir: <code class="text-neon-green">f.write("Mis datos")</code></li>
                            <li><b>CERRAR:</b> <code class="text-neon-green">f.close()</code></li>
                        </ol>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-file-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># Ejemplo de escritura
datos_a_guardar = "Puntuación: 100\nJugador: Neo\nNivel: 5"

print("Guardando datos...")
print(datos_a_guardar)
print("--- Datos Guardados con Éxito ---")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-file-2').value, 'output-file-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-save mr-2"></i>Guardar
                    </button>
                </div>
                <div id="output-file-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Esperando...</p>
                </div>
            `}
    ]
});
