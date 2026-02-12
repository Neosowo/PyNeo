window.modules.push({
    id: 0,
    title: "Bienvenida a Python",
    icon: "fa-rocket",
    description: "Conoce qué es la programación, por qué aprender Python y cómo empezar tu viaje.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <div class="text-6xl mb-6 text-neon-green"><i class="fas fa-graduation-cap"></i></div>
            <h3 class="text-3xl font-bold mb-4 text-white">Tu Viaje Comienza Aquí</h3>
            <p class="text-gray-300 mb-8 text-lg">
                Bienvenido al mundo de la programación. Aquí aprenderás que programar no es solo escribir código, 
                sino desarrollar una nueva forma de pensar y resolver problemas.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                <div class="neon-box-secondary p-6">
                    <h4 class="text-white font-bold mb-3"><i class="fas fa-brain mr-2 text-neon-green"></i>Pensamiento Lógico</h4>
                    <p class="text-sm text-gray-400">Aprenderás a descomponer problemas complejos en pasos simples y manejables.</p>
                </div>
                <div class="neon-box-secondary p-6">
                    <h4 class="text-white font-bold mb-3"><i class="fas fa-magic mr-2 text-neon-green"></i>Automatización</h4>
                    <p class="text-sm text-gray-400">Descubrirás cómo hacer que la computadora trabaje por ti en tareas repetitivas.</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "¿Qué es Programar?",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Instrucciones para Máquinas</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        La <b>programación</b> es el proceso de proporcionar instrucciones claras y precisas a una computadora para que realice tareas específicas. 
                    </p>
                    
                    <div class="neon-box-dark p-6 border-l-4 border-yellow-500 mb-6 font-italic">
                        "Es como escribir una receta de cocina muy detallada para un robot que no sabe nada del mundo."
                    </div>

                    <h4 class="text-xl font-bold text-white mb-4">El concepto de Algoritmo</h4>
                    <p class="text-gray-400 text-sm mb-4">
                        Un algoritmo es simplemente una <b>secuencia finita y ordenada de pasos</b>. Ejemplos diarios:
                    </p>
                    <ul class="text-sm text-gray-500 space-y-2 ml-4">
                        <li>• Seguir una receta de cocina.</li>
                        <li>• Las instrucciones para armar un mueble.</li>
                        <li>• Los pasos para lavarse los dientes.</li>
                    </ul>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Tu primer contacto</span>
                    </div>
                    <textarea id="code-intro-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="4"># En programación, el código es el texto que contiene las instrucciones
print("¡Hola! Estoy aprendiendo a programar")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-intro-1').value, 'output-intro-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar Código
                    </button>
                </div>
                <div id="output-intro-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Haz clic en Ejecutar para ver el resultado...</p>
                </div>
            `},
        {
            title: "¿Por qué Python?",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">El Lenguaje del Futuro</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Python es el lenguaje más popular del mundo para principiantes y profesionales por varias razones:
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Fácil de Leer</h5>
                            <p class="text-xs text-gray-400">Su sintaxis es muy parecida al lenguaje humano (inglés).</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Versátil</h5>
                            <p class="text-xs text-gray-400">Se usa en IA, Ciencia de Datos, Web y Automatización.</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Interpretado</h5>
                            <p class="text-xs text-gray-400">Puedes probar tu código línea por línea de forma rápida.</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Gran Comunidad</h5>
                            <p class="text-xs text-gray-400">Hay miles de librerías listas para que las uses.</p>
                        </div>
                    </div>
                </div>

                <div class="neon-box-dark p-6 text-center">
                    <p class="text-neon-green font-bold">"Python permite concentrarse en resolver problemas, no en las reglas complejas del lenguaje."</p>
                </div>
            `}
    ]
});
