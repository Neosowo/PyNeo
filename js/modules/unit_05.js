window.modules.push({
    id: 5,
    title: "Repeticiones (Bucles)",
    icon: "fa-sync",
    description: "Haz que tu código trabaje por ti repitiendo tareas.",
    intro: `
        <div class="neon-box p-8 mb-8">
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
                <h3 class="text-3xl font-bold mb-6 text-white">Repetir mientras sea verdad</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">El ciclo infinito</h4>
                    <p class="text-gray-300 mb-6">
                        El bucle <code class="text-neon-green">while</code> repite un bloque de codigo MIENTRAS una condicion sea verdadera. Es como un "if" que no se detiene.
                    </p>
                    
                    <div class="neon-box-secondary p-6 border-l-4 border-red-500">
                        <h5 class="font-bold text-white mb-2">Peligro</h5>
                        <p class="text-sm text-gray-300">
                            Debes asegurarte de que la condicion cambie en algun momento. Si siempre es True, el programa nunca terminara (Bucle Infinito).
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Cuenta regresiva</span>
                    </div>
                    <textarea id="code-while-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="7">contador = 5

while contador > 0:
    print("Faltan:", contador)
    contador = contador - 1  # Importante: bajamos el contador

print("¡Despegue!")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-while-1').value, 'output-while-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Iniciar Conteo
                    </button>
                </div>
                <div id="output-while-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Observa como baja el numero...</p>
                </div>
            `},
        {
            title: "Bucle For (Para cada uno)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Repeticiones Controladas</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        El bucle <code class="text-neon-green">for</code> es perfecto cuando sabes cuantas veces quieres repetir algo. Usamos <code class="text-neon-green">range()</code> para generar numeros.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-dark p-4">
                            <h5 class="font-bold text-white mb-2">range(5)</h5>
                            <p class="text-sm text-gray-400">Genera: 0, 1, 2, 3, 4</p>
                            <p class="text-xs text-gray-500 mt-1">(Empieza en 0, termina antes del 5)</p>
                        </div>
                        <div class="neon-box-dark p-4">
                            <h5 class="font-bold text-white mb-2">range(1, 4)</h5>
                            <p class="text-sm text-gray-400">Genera: 1, 2, 3</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-for-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># Repetir algo 3 veces
for i in range(3):
    print("Repeticion numero:", i)
    print("---")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-for-1').value, 'output-for-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-for-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `},
        {
            title: "For con Listas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Procesar Datos en Lote</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        El superpoder del <code class="text-neon-green">for</code> es recorrer listas elemento por elemento sin usar numeros.
                    </p>
                    
                    <div class="neon-box-secondary p-6">
                        <h5 class="font-bold text-white mb-3">La variable temporal</h5>
                        <p class="text-sm text-gray-300">
                            En <code class="text-neon-green">for fruta in frutas:</code>, la variable <b>fruta</b> toma el valor de cada elemento, uno por uno.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Lista de compras</span>
                    </div>
                    <textarea id="code-for-list" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">compras = ["Pan", "Leche", "Huevos"]

print("Voy a comprar:")
for item in compras:
    print("- " + item)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-for-list').value, 'output-for-list')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ver Lista
                    </button>
                </div>
                <div id="output-for-list" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        }
    ]
});
