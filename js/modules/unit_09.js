window.modules.push({
    id: 9,
    title: "Proyecto: El Gran Sorteo",
    icon: "fa-trophy",
    description: "Aplica todo lo aprendido para crear un sistema de sorteos.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <div class="text-6xl mb-6 text-neon-green"><i class="fas fa-trophy"></i></div>
            <h3 class="text-3xl font-bold mb-4 text-white">Tu Primer Proyecto Real</h3>
            <p class="text-gray-300 mb-8 text-lg">
                Has aprendido variables, listas, bucles y funciones. Es hora de unir todas las piezas.
            </p>
            <div class="neon-box-secondary p-6 max-w-xl mx-auto text-left">
                <h4 class="text-white font-bold mb-4 border-b border-gray-700 pb-2">El Reto: La Tómbola Digital</h4>
                <p class="text-sm text-gray-400 mb-2">Una empresa necesita sortear un premio entre sus clientes.</p>
                <p class="text-sm text-gray-400">Tu misión es crear el programa que decida la suerte de los participantes.</p>
            </div>
            <div class="mt-8">
                <span class="bg-neon-green text-black font-bold px-4 py-1 rounded-full text-xs">READY TO CODE?</span>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "El Desafío",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Misión: Sorteo Automático</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">El Problema</h4>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Una tienda quiere regalar premios a sus clientes. Tienes una lista de participantes y necesitas un programa que seleccione a los ganadores al azar.
                    </p>
                    
                    <div class="neon-box-secondary p-6">
                        <h5 class="font-bold text-white mb-3">Requerimientos</h5>
                        <ul class="space-y-2 text-gray-300">
                            <li><i class="fas fa-check text-neon-green mr-2"></i>Tener una lista de participantes.</li>
                            <li><i class="fas fa-check text-neon-green mr-2"></i>Elegir 1 Ganador del Premio Mayor.</li>
                            <li><i class="fas fa-check text-neon-green mr-2"></i>Usar <code class="text-neon-green">random.choice()</code> para elegir.</li>
                            <li><i class="fas fa-check text-neon-green mr-2"></i>Mostrar los resultados bonitos.</li>
                        </ul>
                    </div>
                </div>

                <div class="neon-box-dark p-6 border-l-4 border-yellow-500">
                    <p class="text-white text-sm">
                        <b>Pista:</b> Recuerda importar el módulo <code>random</code> al principio.
                    </p>
                </div>
            `
        },
        {
            title: "Código Final",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Construyendo el Sistema</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-4">
                        Aquí unimos todo: Listas, Random, Variables y F-Strings.
                    </p>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Sistema de Sorteo v1.0</span>
                    </div>
                    <textarea id="code-project" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="12">import random

# 1. Lista de participantes
clientes = ["Ana", "Beto", "Carla", "Daniel", "Elena", "Fabio"]

print(f"Participantes: {clientes}")
print("--- Girando la tómbola ---")

# 2. Elegir ganador
ganador = random.choice(clientes)

# 3. Mostrar resultado
print(" ¡FELICIDADES! ")
print(f"El ganador del premio es: {ganador.upper()}")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-project').value, 'output-project')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Realizar Sorteo
                    </button>
                </div>
                
                <div id="output-project" class="code-output p-4 text-sm">
                    <p class="text-gray-500">¡Que gane el mejor!...</p>
                </div>

                <div class="neon-box border-t border-gray-700 p-6 mt-8 text-center">
                    <h4 class="text-2xl font-bold text-neon-green mb-2">¡Curso Completado!</h4>
                    <p class="text-gray-300">Has aprendido los fundamentos de Python.</p>
                </div>
            `
        }
    ]
});
