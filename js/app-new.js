// NeoPY - Plataforma de Aprendizaje Python
// Estado de la aplicación
let currentModule = null;
let currentLesson = 0;
let progress = JSON.parse(localStorage.getItem('neopy-progress')) || {};

// Ejecutar código Python usando Skulpt
function runPythonCode(code, outputId) {
    const outputElement = document.getElementById(outputId);
    outputElement.innerHTML = '<p class="text-yellow-400"><i class="fas fa-spinner fa-spin mr-2"></i>Ejecutando...</p>';

    // Configurar Skulpt
    Sk.configure({
        output: function (text) {
            outputElement.innerHTML += `<span class="text-gray-300">${text}</span>`;
        },
        read: function (x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        }
    });

    // Limpiar output
    outputElement.innerHTML = '<p class="text-green-400"><i class="fas fa-check-circle mr-2"></i>Salida:</p><pre class="text-gray-300 mt-2">';

    // Ejecutar código
    Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(
        function (mod) {
            outputElement.innerHTML += '</pre>';
        },
        function (err) {
            outputElement.innerHTML = `<p class="text-red-400"><i class="fas fa-exclamation-triangle mr-2"></i>Error:</p><pre class="text-red-300 mt-2">${err.toString()}</pre>`;
        }
    );
}

// Módulos del curso
const modules = [
    {
        id: 1,
        title: "Pensamiento Lógico y Fundamentos",
        icon: "fa-brain",
        description: "Aprende a pensar como programador desde cero",
        lessons: [
            {
                title: "¿Qué es Programar?",
                content: `
                    <h3 class="text-3xl font-bold mb-6 gradient-text">Bienvenido a la Programación</h3>
                    
                    <div class="glass-strong p-8 rounded-2xl mb-8">
                        <h4 class="font-bold mb-4 text-2xl text-white">Imagina que eres un chef...</h4>
                        <p class="text-xl text-gray-300 mb-6 leading-relaxed">
                            Cuando cocinas, sigues una receta paso a paso. La programación es exactamente lo mismo: 
                            le das instrucciones paso a paso a una computadora para que haga lo que tú quieres.
                        </p>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="glass p-6 rounded-xl">
                                <h5 class="font-bold text-purple-400 mb-3 flex items-center gap-2">
                                    <i class="fas fa-utensils"></i> Receta de Cocina
                                </h5>
                                <div class="space-y-2 text-gray-300 text-sm">
                                    <div>1. Precalienta el horno a 180°C</div>
                                    <div>2. Mezcla harina y azúcar</div>
                                    <div>3. Agrega los huevos</div>
                                    <div>4. Hornea por 30 minutos</div>
                                    <div class="text-green-400 mt-3">→ Resultado: Pastel</div>
                                </div>
                            </div>
                            
                            <div class="glass p-6 rounded-xl">
                                <h5 class="font-bold text-purple-400 mb-3 flex items-center gap-2">
                                    <i class="fas fa-code"></i> Programa
                                </h5>
                                <div class="space-y-2 text-gray-300 text-sm">
                                    <div>1. Pide el nombre del usuario</div>
                                    <div>2. Guarda el nombre</div>
                                    <div>3. Crea un saludo</div>
                                    <div>4. Muestra el saludo</div>
                                    <div class="text-green-400 mt-3">→ Resultado: "Hola Juan"</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-2xl font-bold mb-4 text-white">¿Por qué Python?</h4>
                    <div class="glass-strong p-6 rounded-2xl mb-6">
                        <p class="text-gray-300 mb-4">Python es perfecto para principiantes porque:</p>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="glass p-4 rounded-xl">
                                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                                <span class="text-white font-semibold">Se lee como inglés</span>
                                <p class="text-sm text-gray-400 mt-1">Fácil de entender</p>
                            </div>
                            <div class="glass p-4 rounded-xl">
                                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                                <span class="text-white font-semibold">No es complicado</span>
                                <p class="text-sm text-gray-400 mt-1">Menos símbolos raros</p>
                            </div>
                            <div class="glass p-4 rounded-xl">
                                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                                <span class="text-white font-semibold">Muy popular</span>
                                <p class="text-sm text-gray-400 mt-1">Mucha ayuda disponible</p>
                            </div>
                            <div class="glass p-4 rounded-xl">
                                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                                <span class="text-white font-semibold">Poderoso</span>
                                <p class="text-sm text-gray-400 mt-1">Hace cosas increíbles</p>
                            </div>
                        </div>
                    </div>

                    <div class="glass border-l-4 border-blue-500 p-6 rounded-xl">
                        <p class="font-semibold text-blue-400 mb-2"><i class="fas fa-lightbulb mr-2"></i>Tu Primera Lección</p>
                        <p class="text-gray-300">En programación, empezamos con lo básico y vamos construyendo. Como aprender a caminar antes de correr. ¡Vamos paso a paso!</p>
                    </div>
                `
            },
            {
                title: "Pensando como Programador",
                content: `
                    <h3 class="text-3xl font-bold mb-6 gradient-text">Desarrolla tu Lógica de Programación</h3>
                    
                    <div class="glass-strong p-8 rounded-2xl mb-8">
                        <h4 class="font-bold mb-4 text-2xl text-white">Problema: Hacer un sándwich</h4>
                        <p class="text-gray-300 mb-6">Parece simple, ¿verdad? Pero la computadora necesita instrucciones MUY específicas:</p>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="glass p-6 rounded-xl border-2 border-red-500/30">
                                <h5 class="font-bold text-red-400 mb-3">❌ Instrucciones Vagas</h5>
                                <div class="space-y-2 text-gray-300">
                                    <div>1. Agarra el pan</div>
                                    <div>2. Pon jamón</div>
                                    <div>3. Cierra el sándwich</div>
                                </div>
                                <p class="text-sm text-red-300 mt-4">Problema: ¿Cuántas rebanadas? ¿Cuánto jamón? ¿Cómo cerrar?</p>
                            </div>
                            
                            <div class="glass p-6 rounded-xl border-2 border-green-500/30">
                                <h5 class="font-bold text-green-400 mb-3">✓ Instrucciones Precisas</h5>
                                <div class="space-y-2 text-gray-300">
                                    <div>1. Toma 2 rebanadas de pan</div>
                                    <div>2. Coloca 3 lonchas de jamón en una rebanada</div>
                                    <div>3. Pon la otra rebanada encima</div>
                                    <div>4. Presiona suavemente</div>
                                </div>
                                <p class="text-sm text-green-300 mt-4">¡Perfecto! Instrucciones claras y específicas</p>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-2xl font-bold mb-4 text-white">Los 3 Pilares del Pensamiento Lógico</h4>
                    <div class="space-y-4 mb-8">
                        <div class="glass-strong p-6 rounded-2xl">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                                    <span class="text-2xl font-black">1</span>
                                </div>
                                <div>
                                    <h5 class="font-bold text-xl text-white mb-2">Secuencia</h5>
                                    <p class="text-gray-300 mb-3">Las cosas pasan en ORDEN. Primero A, luego B, después C.</p>
                                    <div class="glass p-4 rounded-lg">
                                        <code class="text-purple-300">
                                            1. Levantarse<br>
                                            2. Ducharse<br>
                                            3. Desayunar<br>
                                            4. Ir a clase
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="glass-strong p-6 rounded-2xl">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                                    <span class="text-2xl font-black">2</span>
                                </div>
                                <div>
                                    <h5 class="font-bold text-xl text-white mb-2">Decisión</h5>
                                    <p class="text-gray-300 mb-3">Elegir entre opciones según una condición.</p>
                                    <div class="glass p-4 rounded-lg">
                                        <code class="text-purple-300">
                                            SI está lloviendo:<br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;Lleva paraguas<br>
                                            SI NO:<br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;Lleva gafas de sol
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="glass-strong p-6 rounded-2xl">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                                    <span class="text-2xl font-black">3</span>
                                </div>
                                <div>
                                    <h5 class="font-bold text-xl text-white mb-2">Repetición</h5>
                                    <p class="text-gray-300 mb-3">Hacer algo varias veces.</p>
                                    <div class="glass p-4 rounded-lg">
                                        <code class="text-purple-300">
                                            MIENTRAS haya ropa sucia:<br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;1. Toma una prenda<br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;2. Lávala<br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;3. Cuélgala
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-2xl font-bold mb-4 text-white">Ejercicio Mental</h4>
                    <div class="glass-strong p-6 rounded-2xl">
                        <p class="text-white font-semibold mb-3">Escribe los pasos para cepillarte los dientes:</p>
                        <div class="glass p-4 rounded-lg mb-4">
                            <p class="text-gray-400 text-sm mb-2">Piensa en cada paso pequeño...</p>
                            <ol class="text-gray-300 space-y-1 list-decimal list-inside">
                                <li>Tomar el cepillo de dientes</li>
                                <li>Abrir la pasta dental</li>
                                <li>Aplicar pasta en el cepillo</li>
                                <li>Abrir el grifo</li>
                                <li>Mojar el cepillo</li>
                                <li>Cepillar dientes (2 minutos)</li>
                                <li>Enjuagar boca</li>
                                <li>Lavar cepillo</li>
                                <li>Cerrar grifo</li>
                            </ol>
                        </div>
                        <p class="text-purple-400 text-sm">¡Eso es pensar como programador! Descomponer tareas en pasos pequeños y específicos.</p>
                    </div>
                `
            }
        ]
    }
];

// Continuaré agregando más módulos...
