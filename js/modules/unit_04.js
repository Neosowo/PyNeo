window.modules.push({
    id: 4,
    title: "Tomando Decisiones",
    icon: "fa-question-circle",
    description: "Enseña a tu programa a tomar decisiones con if y else.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <div class="text-6xl mb-6 text-yellow-400"><i class="fas fa-code-branch"></i></div>
            <h3 class="text-3xl font-bold mb-4 text-white">Tomando Decisiones</h3>
            <p class="text-gray-300 mb-8 text-lg">
                Hasta ahora, tu código seguía una línea recta. Pero la vida real está llena de caminos y opciones.
                En programación, usamos condiciones para decidir qué camino tomar.
            </p>
            <div class="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div class="neon-box-secondary p-4">
                    <div class="text-green-400 font-bold mb-2">SI (IF) llueve...</div>
                    <div class="text-sm text-gray-400">Llevo paraguas</div>
                </div>
                <div class="neon-box-secondary p-4">
                    <div class="text-red-400 font-bold mb-2">SI NO (ELSE)...</div>
                    <div class="text-sm text-gray-400">Voy al parque</div>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
        title: "La Sentencia If",
        content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Si pasa esto... haz aquello</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Condiciones</h4>
                    <p class="text-gray-300 mb-6">
                        Los programas inteligentes toman decisiones. Usamos la palabra reservada <code class="text-neon-green">if</code> (que significa "si" condicional).
                    </p>
                    
                    <div class="neon-box-dark p-6 border-l-4 border-green-500">
                        <h5 class="font-bold text-white mb-2">Importante: La Identación</h5>
                        <p class="text-sm text-gray-300 mb-3">
                            Python necesita saber qué código es parte del "if". Para eso usamos espacios (sangría) a la izquierda.
                        </p>
                        <div class="bg-black/30 p-3 rounded font-mono text-sm">
                            <div class="text-white">if edad > 18:</div>
                            <div class="text-neon-green ml-4">print("Eres mayor") # Esto tiene sangria</div>
                            <div class="text-gray-400">print("Fin") # Esto esta fuera</div>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-if-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">puntos = 100

if puntos == 100:
    print("¡Felicidades!")
    print("Has ganado el juego")

print("Fin del programa")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-if-1').value, 'output-if-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-if-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Prueba cambiando los puntos a 50...</p>
                </div>
            `},
        {title: "Si No... (Else)",
        content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Dos Caminos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        ¿Que pasa si la condicion NO se cumple? Usamos <code class="text-neon-green">else</code> (que significa "si no" o "en caso contrario").
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-secondary p-6">
                            <h5 class="font-bold text-white mb-2">Camino A (Verdadero)</h5>
                            <p class="text-sm text-gray-400">Se ejecuta si el if es cierto.</p>
                        </div>
                        <div class="neon-box-secondary p-6">
                            <h5 class="font-bold text-white mb-2">Camino B (Falso)</h5>
                            <p class="text-sm text-gray-400">Se ejecuta si el if falla (else).</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Sistema de Acceso</span>
                    </div>
                    <textarea id="code-if-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="7">password = "secreto123"
ingreso = "12345" # Prueba cambiando esto

if ingreso == password:
    print("Acceso Concedido")
else:
    print("Acceso Denegado")
    print("Intente de nuevo")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-if-2').value, 'output-if-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Entrar
                    </button>
                </div>
                <div id="output-if-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `},
        {title: "Múltiples Opciones (Elif)",
        content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Mas de dos opciones</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        A veces necesitamos mas de dos caminos. Para eso usamos <code class="text-neon-green">elif</code> (abreviatura de "else if").
                    </p>
                    
                    <div class="neon-box-dark p-6">
                        <ul class="space-y-3 text-sm text-gray-300">
                            <li><b class="text-neon-green">if:</b> Primera condición</li>
                            <li><b class="text-neon-green">elif:</b> Segunda condición (si la primera falla)</li>
                            <li><b class="text-neon-green">elif:</b> Tercera condición...</li>
                            <li><b class="text-neon-green">else:</b> Si nada de lo anterior funcionó</li>
                        </ul>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-if-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="9">nota = 85

if nota >= 90:
    print("Calificacion: A (Excelente)")
elif nota >= 80:
    print("Calificacion: B (Muy bien)")
elif nota >= 70:
    print("Calificacion: C (Regular)")
else:
    print("Calificacion: F (Reprobado)")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-if-3').value, 'output-if-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calificar
                    </button>
                </div>
                <div id="output-if-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Prueba cambi ando la nota...</p>
                </div>
            `
    }
    ]
});
