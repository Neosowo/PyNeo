window.modules.push({
    id: 5,
    title: "Repeticiones (Bucles)",
    icon: "fa-sync",
    description: "Haz que tu código trabaje por ti repitiendo tareas.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">El Poder de la Repetición</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Imagina tener que escribir "Hola" 1000 veces.
                Las computadoras son expertas en repetir tareas aburridas sin cansarse ni quejarse.
            </p>
            <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
                <div class="neon-box-dark p-6 w-full md:w-1/2">
                    <h4 class="text-red-400 font-bold mb-2">Manualmente</h4>
                    <code class="text-xs block text-gray-500">
                        print("Hola")<br>
                        print("Hola")<br>
                        print("Hola")<br>
                        ... (x1000)
                    </code>
                </div>
                <div class="text-2xl text-white">VS</div>
                <div class="neon-box-dark p-6 w-full md:w-1/2 border border-neon-green">
                    <h4 class="text-neon-green font-bold mb-2">Con Bucle</h4>
                    <code class="text-sm block text-white">
                        for i in range(1000):<br>
                        &nbsp;&nbsp;print("Hola")
                    </code>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Bucle While (Mientras)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Bucles Condicionales</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        El bucle <code>while</code> permite repetir un bloque de código <strong>mientras</strong> una condición sea verdadera. Es extremadamente útil para procesos donde no sabemos de antemano cuántas repeticiones serán necesarias.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="neon-box-dark p-6 border-l-2 border-neon-green">
                            <h4 class="text-xl font-bold text-white mb-3">Funcionamiento</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                Se evalúa la condición. Si es True, el código corre. Al terminar, vuelve arriba a evaluar de nuevo.
                            </p>
                        </div>
                        
                        <div class="neon-box-dark p-6 border-l-2 border-red-500">
                            <h4 class="text-xl font-bold text-white mb-3">⚠️ Bucle Infinito</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                Si la condición nunca se vuelve falsa, el programa se quedará repitiendo para siempre.
                            </p>
                        </div>
                    </div>

                    <div class="neon-box-secondary p-6">
                        <h4 class="font-bold text-white mb-2">Contadores</h4>
                        <p class="text-gray-300 text-sm">
                            Normalmente usamos una variable 'contador' que incrementamos dentro del bucle para eventualmente romper la condición.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Contando hasta 3</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Usa un bucle <code>while</code> para imprimir los números del 1 al 3. Recuerda incrementar la variable <code>num</code> en cada vuelta.
                    </p>
                    <textarea id="code-while-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="7">num = 1
# Escribe tu while aquí:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-while-1').value, 'output-while-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar Bucle
                    </button>
                </div>
                <div id="output-while-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Repitiendo proceso...</p>
                </div>
            `,
            validation: {
                expectedOutput: "1\n2\n3",
                matchType: "include",
                hint: "Usa while num <= 3: y no olvides hacer num = num + 1 al final del bloque."
            }
        },
        {
            title: "Bucle For (Para cada uno)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Iteraciones Controladas</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        El bucle <code>for</code> se usa para recorrer secuencias o ejecutar una tarea un número definido de veces. En Python es la forma más común y segura de iterar.
                    </p>
                    
                    <div class="bg-black/30 p-4 rounded border border-gray-700 mb-8">
                        <h5 class="text-white font-bold text-sm mb-2">La Función range()</h5>
                        <p class="text-sm text-gray-400 mb-2">Genera una secuencia de números automáticamente:</p>
                        <ul class="text-xs text-gray-500 space-y-1 ml-4 list-disc">
                            <li><code>range(5)</code> → 0, 1, 2, 3, 4</li>
                            <li><code>range(1, 4)</code> → 1, 2, 3</li>
                        </ul>
                    </div>

                    <div class="neon-box-secondary p-6 border-l-2 border-blue-500">
                        <h4 class="text-lg font-bold text-white mb-2">Simplicidad</h4>
                        <p class="text-gray-300 text-sm">
                            A diferencia de <code>while</code>, un <code>for</code> con <code>range</code> sabe exactamente cuándo detenerse, evitando bucles infinitos por error.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Repetición de Texto</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Usa un bucle <code>for</code> con <code>range</code> para imprimir la palabra "Python" exactamente 4 veces.
                    </p>
                    <textarea id="code-for-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># Tu código aquí:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-for-1').value, 'output-for-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar For
                    </button>
                </div>
                <div id="output-for-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Procesando rango...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Python\nPython\nPython\nPython",
                matchType: "exact",
                hint: "Usa for i in range(4): y dentro print(\"Python\")"
            }
        },
        {
            title: "For con Listas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Recorriendo Datos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        El verdadero poder de Python brilla al iterar sobre colecciones. Un bucle <code>for</code> puede extraer cada elemento de una lista de forma automática.
                    </p>
                    
                    <div class="space-y-4">
                        <div class="neon-box-dark p-4 border border-blue-900/50">
                            <h5 class="font-bold text-blue-400 mb-1">Sintaxis Limpia</h5>
                            <p class="text-sm text-gray-400">
                                No necesitas índices ni contadores: <code>for elemento in lista:</code>.
                            </p>
                        </div>
                        
                        <div class="neon-box-dark p-4 border border-green-900/50">
                            <h5 class="font-bold text-neon-green mb-1">Automatización</h5>
                            <p class="text-sm text-gray-400">
                                Es ideal para aplicar una misma operación a miles de datos al mismo tiempo (como cambiar precios o filtrar correos).
                            </p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Listado Dinámico</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Recorre la lista <code>nombres</code> e imprime cada uno precedido por un asterisco y un espacio (ej: "* Ana").
                    </p>
                    <textarea id="code-for-list" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">nombres = ["Ana", "Luis", "Neo"]
# Recorre e imprime aquí:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-for-list').value, 'output-for-list')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Recorrer Lista
                    </button>
                </div>
                <div id="output-for-list" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Extrayendo elementos...</p>
                </div>
            `,
            validation: {
                expectedOutput: "* Ana\n* Luis\n* Neo",
                matchType: "exact",
                hint: "Usa for n in nombres: y dentro print(\"* \" + n)"
            }
        }
    ]
});
