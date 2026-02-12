window.modules.push({
    id: 2,
    title: "Variables y Datos",
    icon: "fa-database",
    description: "Aprende a guardar información y usar los tipos de datos básicos.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">La Memoria de la Computadora</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Imagina que tienes miles de cajitas vacías. En programación, usamos esas cajitas para guardar información:
                nombres, puntuaciones, contraseñas, ¡de todo!
            </p>
            <div class="flex justify-center gap-8 mb-8">
                <div class="relative w-32 h-32 bg-gray-800 border-2 border-neon-green rounded-lg flex items-center justify-center">
                    <span class="text-4xl">📦</span>
                    <div class="absolute -bottom-8 text-white font-mono">variable</div>
                </div>
                <div class="text-4xl flex items-center text-white">⬅️</div>
                <div class="relative w-32 h-32 bg-gray-800 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                    <span class="text-2xl text-white font-bold">"Dato"</span>
                    <div class="absolute -bottom-8 text-white font-mono">valor</div>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "¿Qué es una Variable?",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Etiquetando Información</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Una <strong>variable</strong> es un nombre que apunta a un valor guardado en la memoria. Es como una caja etiquetada donde puedes meter, sacar o cambiar contenido.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="neon-box-dark p-6 border-l-2 border-neon-green">
                            <h4 class="text-xl font-bold text-white mb-3">Asignación</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                Usamos el signo <code>=</code> para guardar el valor de la derecha en el nombre de la izquierda.
                            </p>
                        </div>
                        
                        <div class="neon-box-dark p-6 border-l-2 border-blue-500">
                            <h4 class="text-xl font-bold text-white mb-3">Sintaxis</h4>
                            <code class="text-xs text-neon-green block">puntos = 100</code>
                        </div>
                    </div>

                    <div class="neon-box-secondary p-6">
                        <h4 class="font-bold text-white mb-2">Reglas de Oro</h4>
                        <ul class="text-sm text-gray-400 space-y-1">
                            <li>- No pueden empezar con números.</li>
                            <li>- No pueden tener espacios (usa_guiones_bajos).</li>
                            <li>- Diferencian entre MAYÚSCULAS y minúsculas.</li>
                        </ul>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Desafío: Identidad</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Crea una variable llamada <code>heroe</code> con el valor "Batman" y luego imprímela usando <code>print()</code>.
                    </p>
                    <textarea id="code-var-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># Crea tu variable aquí:

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-var-1').value, 'output-var-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar Variable
                    </button>
                </div>
                <div id="output-var-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Esperando asignación...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Batman",
                matchType: "include",
                hint: "Escribe heroe = \"Batman\" y luego print(heroe)."
            }
        },
        {
            title: "Los 4 Tipos Básicos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Diversidad de Datos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Python reconoce automáticamente qué tipo de dato estás usando. Estos son los cuatro "sabores" fundamentales de la información:
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="neon-box-dark p-4 border-l-4 border-blue-500">
                            <h5 class="font-bold text-white">Enteros (int)</h5>
                            <p class="text-[11px] text-gray-400">Números sin decimales: <code>10, -5, 0</code></p>
                        </div>
                        <div class="neon-box-dark p-4 border-l-4 border-purple-500">
                            <h5 class="font-bold text-white">Flotantes (float)</h5>
                            <p class="text-[11px] text-gray-400">Números con decimales: <code>3.14, 9.99</code></p>
                        </div>
                        <div class="neon-box-dark p-4 border-l-4 border-yellow-500">
                            <h5 class="font-bold text-white">Cadenas (str)</h5>
                            <p class="text-[11px] text-gray-400">Texto entre comillas: <code>"Hola", 'Neo'</code></p>
                        </div>
                        <div class="neon-box-dark p-4 border-l-4 border-red-500">
                            <h5 class="font-bold text-white">Booleanos (bool)</h5>
                            <p class="text-[11px] text-gray-400">Solo dos valores: <code>True, False</code></p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Detectando Tipos</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Ejecuta este código para ver cómo Python identifica cada variable usando la función <code>type()</code>.
                    </p>
                    <textarea id="code-types" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">texto = "Fundamentos"
numero = 100
decimal = 3.14

print(type(texto))
print(type(numero))
print(type(decimal))</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-types').value, 'output-types')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Analizar Tipos
                    </button>
                </div>
                <div id="output-types" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Observa las clases...</p>
                </div>
            `,
            validation: {
                expectedOutput: "str",
                matchType: "include",
                requiredCode: "type",
                hint: "Presiona el botón Ejecutar para ver el análisis de tipos."
            }
        },
        {
            title: "Operaciones Matemáticas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Calculadora Inteligente</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Puedes usar variables para realizar cálculos matemáticos. Python usará los valores guardados en ellas para resolver la operación.
                    </p>
                    
                    <div class="neon-box-dark p-4 grid grid-cols-2 gap-4 text-xs">
                        <div class="border-b border-gray-700 pb-2 flex justify-between">
                            <span class="text-white">Multiplicación</span>
                            <code class="text-neon-green">*</code>
                        </div>
                        <div class="border-b border-gray-700 pb-2 flex justify-between">
                            <span class="text-white">Potencia</span>
                            <code class="text-neon-green">**</code>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Cálculo de Área</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Si el lado de un cuadrado es 5, calcula el área (lado * lado) y guárdala en una variable llamada <code>area</code>. Luego imprímela.
                    </p>
                    <textarea id="code-math-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5">lado = 5
# Calcula el área aquí:

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-math-1').value, 'output-math-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calcular
                    </button>
                </div>
                <div id="output-math-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Esperando resultado...</p>
                </div>
            `,
            validation: {
                expectedOutput: "25",
                matchType: "include",
                hint: "Escribe area = lado * lado y luego print(area)."
            }
        }
    ]
});
