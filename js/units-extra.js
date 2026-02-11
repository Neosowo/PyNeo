// UNIDADES 2-7 - Continúa desde app.js

// UNIDAD 2: Variables y Tipos de Datos
const unidad2 = {
    id: 2,
    title: "Variables y Tipos de Datos",
    icon: "fa-box",
    description: "Aprende a guardar información en tu programa",
    lessons: [
        {
            title: "¿Qué son las Variables?",
            content: `
                <h3 class="text-3xl font-bold mb-6 gradient-text">Variables: Cajas para Guardar Cosas</h3>
                
                <div class="glass-strong p-8 rounded-2xl mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Imagina una caja con una etiqueta...</h4>
                    <p class="text-xl text-gray-300 mb-6 leading-relaxed">
                        Una variable es como una caja donde guardas información. Le pones un nombre (etiqueta) 
                        y dentro guardas un valor (lo que hay en la caja).
                    </p>
                    
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="glass p-6 rounded-xl text-center">
                            <div class="text-6xl mb-4">📦</div>
                            <div class="font-bold text-purple-400 mb-2">nombre</div>
                            <div class="text-gray-400 text-sm">Etiqueta de la caja</div>
                            <div class="glass p-3 rounded-lg mt-3">
                                <code class="text-green-300">"Juan"</code>
                            </div>
                            <div class="text-gray-400 text-xs mt-2">Lo que hay dentro</div>
                        </div>
                        
                        <div class="glass p-6 rounded-xl text-center">
                            <div class="text-6xl mb-4">📦</div>
                            <div class="font-bold text-purple-400 mb-2">edad</div>
                            <div class="text-gray-400 text-sm">Etiqueta de la caja</div>
                            <div class="glass p-3 rounded-lg mt-3">
                                <code class="text-green-300">20</code>
                            </div>
                            <div class="text-gray-400 text-xs mt-2">Lo que hay dentro</div>
                        </div>
                        
                        <div class="glass p-6 rounded-xl text-center">
                            <div class="text-6xl mb-4">📦</div>
                            <div class="font-bold text-purple-400 mb-2">estudiante</div>
                            <div class="text-gray-400 text-sm">Etiqueta de la caja</div>
                            <div class="glass p-3 rounded-lg mt-3">
                                <code class="text-green-300">True</code>
                            </div>
                            <div class="text-gray-400 text-xs mt-2">Lo que hay dentro</div>
                        </div>
                    </div>
                </div>

                <h4 class="text-2xl font-bold mb-4 text-white">Creando Variables en Python</h4>
                <div class="glass-strong p-6 rounded-2xl mb-6">
                    <p class="text-gray-300 mb-4">Para crear una variable, usas el signo <code class="glass px-2 py-1 rounded text-purple-300">=</code> (igual)</p>
                    
                    <div class="code-editor p-6 mb-4">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span class="text-sm text-gray-400 ml-2">Ejemplo</span>
                        </div>
                        <textarea id="code-var1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># Crear variables
nombre = "María"
edad = 19
altura = 1.65
es_estudiante = True

# Mostrar las variables
print("Nombre:", nombre)
print("Edad:", edad)
print("Altura:", altura)
print("¿Es estudiante?:", es_estudiante)</textarea>
                        <button onclick="runPythonCode(document.getElementById('code-var1').value, 'output-var1')" class="btn-premium px-6 py-2 rounded-lg font-semibold text-white mt-4">
                            <i class="fas fa-play mr-2"></i>Ejecutar
                        </button>
                    </div>
                    <div id="output-var1" class="code-output p-4 text-sm">
                        <p class="text-gray-500">Ejecuta el código para ver las variables...</p>
                    </div>
                </div>

                <div class="glass border-l-4 border-yellow-500 p-6 rounded-xl mb-6">
                    <p class="font-semibold text-yellow-400 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>Reglas Importantes</p>
                    <ul class="text-gray-300 space-y-2 list-disc list-inside">
                        <li>Los nombres de variables NO pueden tener espacios (usa _ en su lugar)</li>
                        <li>NO pueden empezar con números (edad_20 ✓, 20edad ✗)</li>
                        <li>Python distingue mayúsculas y minúsculas (Nombre ≠ nombre)</li>
                        <li>Usa nombres descriptivos (edad es mejor que x)</li>
                    </ul>
                </div>

                <h4 class="text-2xl font-bold mb-4 text-white">Cambiando el Valor de una Variable</h4>
                <div class="glass-strong p-6 rounded-2xl mb-6">
                    <p class="text-gray-300 mb-4">Puedes cambiar lo que hay en la "caja" cuando quieras:</p>
                    
                    <div class="code-editor p-6 mb-4">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span class="text-sm text-gray-400 ml-2">Cambiando Variables</span>
                        </div>
                        <textarea id="code-var2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="10"># Crear una variable
puntos = 0
print("Puntos iniciales:", puntos)

# Cambiar su valor
puntos = 10
print("Después de ganar:", puntos)

# Cambiar de nuevo
puntos = 25
print("Después de ganar más:", puntos)</textarea>
                        <button onclick="runPythonCode(document.getElementById('code-var2').value, 'output-var2')" class="btn-premium px-6 py-2 rounded-lg font-semibold text-white mt-4">
                            <i class="fas fa-play mr-2"></i>Ejecutar
                        </button>
                    </div>
                    <div id="output-var2" class="code-output p-4 text-sm">
                        <p class="text-gray-500">Ejecuta para ver cómo cambian los valores...</p>
                    </div>
                </div>
            `
        },
        {
            title: "Tipos de Datos",
            content: `
                <h3 class="text-3xl font-bold mb-6 gradient-text">Los Diferentes Tipos de Información</h3>
                
                <div class="glass-strong p-8 rounded-2xl mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Python maneja diferentes tipos de datos</h4>
                    <p class="text-xl text-gray-300 mb-6 leading-relaxed">
                        Así como en la vida real tenemos diferentes tipos de cosas (números, palabras, verdadero/falso), 
                        Python también tiene diferentes tipos de datos.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="glass p-6 rounded-xl">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                                    <i class="fas fa-font text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-bold text-white">str (String)</h5>
                                    <p class="text-sm text-gray-400">Texto</p>
                                </div>
                            </div>
                            <div class="glass p-3 rounded-lg">
                                <code class="text-blue-300">"Hola"</code><br>
                                <code class="text-blue-300">"Python"</code><br>
                                <code class="text-blue-300">"123"</code> (texto, no número)
                            </div>
                        </div>
                        
                        <div class="glass p-6 rounded-xl">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
                                    <i class="fas fa-hashtag text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-bold text-white">int (Integer)</h5>
                                    <p class="text-sm text-gray-400">Números enteros</p>
                                </div>
                            </div>
                            <div class="glass p-3 rounded-lg">
                                <code class="text-green-300">42</code><br>
                                <code class="text-green-300">-15</code><br>
                                <code class="text-green-300">0</code>
                            </div>
                        </div>
                        
                        <div class="glass p-6 rounded-xl">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                                    <i class="fas fa-percentage text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-bold text-white">float</h5>
                                    <p class="text-sm text-gray-400">Números decimales</p>
                                </div>
                            </div>
                            <div class="glass p-3 rounded-lg">
                                <code class="text-purple-300">3.14</code><br>
                                <code class="text-purple-300">-0.5</code><br>
                                <code class="text-purple-300">2.0</code>
                            </div>
                        </div>
                        
                        <div class="glass p-6 rounded-xl">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 rounded-xl bg-pink-600 flex items-center justify-center">
                                    <i class="fas fa-check-circle text-white"></i>
                                </div>
                                <div>
                                    <h5 class="font-bold text-white">bool (Boolean)</h5>
                                    <p class="text-sm text-gray-400">Verdadero o Falso</p>
                                </div>
                            </div>
                            <div class="glass p-3 rounded-lg">
                                <code class="text-pink-300">True</code> (verdadero)<br>
                                <code class="text-pink-300">False</code> (falso)
                            </div>
                        </div>
                    </div>
                </div>

                <h4 class="text-2xl font-bold mb-4 text-white">Descubriendo el Tipo con type()</h4>
                <div class="glass-strong p-6 rounded-2xl mb-6">
                    <p class="text-gray-300 mb-4">Usa <code class="glass px-2 py-1 rounded text-purple-300">type()</code> para saber qué tipo de dato es:</p>
                    
                    <div class="code-editor p-6 mb-4">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span class="text-sm text-gray-400 ml-2">Descubriendo Tipos</span>
                        </div>
                        <textarea id="code-types" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="12"># Diferentes tipos de datos
nombre = "Carlos"
edad = 21
promedio = 8.5
aprobado = True

# Ver qué tipo son
print("nombre es tipo:", type(nombre))
print("edad es tipo:", type(edad))
print("promedio es tipo:", type(promedio))
print("aprobado es tipo:", type(aprobado))</textarea>
                        <button onclick="runPythonCode(document.getElementById('code-types').value, 'output-types')" class="btn-premium px-6 py-2 rounded-lg font-semibold text-white mt-4">
                            <i class="fas fa-play mr-2"></i>Ejecutar
                        </button>
                    </div>
                    <div id="output-types" class="code-output p-4 text-sm">
                        <p class="text-gray-500">Descubre los tipos de datos...</p>
                    </div>
                </div>

                <h4 class="text-2xl font-bold mb-4 text-white">Operaciones con Números</h4>
                <div class="glass-strong p-6 rounded-2xl mb-6">
                    <p class="text-gray-300 mb-4">Python es una calculadora súper poderosa:</p>
                    
                    <div class="grid md:grid-cols-2 gap-4 mb-6">
                        <div class="glass p-4 rounded-xl">
                            <code class="text-purple-300">+</code> <span class="text-gray-300">Suma</span>
                            <div class="text-sm text-gray-400 mt-1">5 + 3 = 8</div>
                        </div>
                        <div class="glass p-4 rounded-xl">
                            <code class="text-purple-300">-</code> <span class="text-gray-300">Resta</span>
                            <div class="text-sm text-gray-400 mt-1">10 - 4 = 6</div>
                        </div>
                        <div class="glass p-4 rounded-xl">
                            <code class="text-purple-300">*</code> <span class="text-gray-300">Multiplicación</span>
                            <div class="text-sm text-gray-400 mt-1">3 * 4 = 12</div>
                        </div>
                        <div class="glass p-4 rounded-xl">
                            <code class="text-purple-300">/</code> <span class="text-gray-300">División</span>
                            <div class="text-sm text-gray-400 mt-1">15 / 3 = 5.0</div>
                        </div>
                        <div class="glass p-4 rounded-xl">
                            <code class="text-purple-300">**</code> <span class="text-gray-300">Potencia</span>
                            <div class="text-sm text-gray-400 mt-1">2 ** 3 = 8</div>
                        </div>
                        <div class="glass p-4 rounded-xl">
                            <code class="text-purple-300">%</code> <span class="text-gray-300">Módulo (residuo)</span>
                            <div class="text-sm text-gray-400 mt-1">10 % 3 = 1</div>
                        </div>
                    </div>
                    
                    <div class="code-editor p-6 mb-4">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span class="text-sm text-gray-400 ml-2">Calculadora Python</span>
                        </div>
                        <textarea id="code-math" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="10"># Operaciones matemáticas
precio = 50
cantidad = 3
total = precio * cantidad
print("Total a pagar:", total)

# Calcular descuento del 10%
descuento = total * 0.10
precio_final = total - descuento
print("Con descuento:", precio_final)</textarea>
                        <button onclick="runPythonCode(document.getElementById('code-math').value, 'output-math')" class="btn-premium px-6 py-2 rounded-lg font-semibold text-white mt-4">
                            <i class="fas fa-play mr-2"></i>Ejecutar
                        </button>
                    </div>
                    <div id="output-math" class="code-output p-4 text-sm">
                        <p class="text-gray-500">Calcula con Python...</p>
                    </div>
                </div>

                <div class="glass border-l-4 border-green-500 p-6 rounded-xl">
                    <p class="font-semibold text-green-400 mb-2"><i class="fas fa-lightbulb mr-2"></i>Consejo Pro</p>
                    <p class="text-gray-300">Puedes usar variables en operaciones matemáticas. Python hace los cálculos automáticamente y guarda el resultado en una nueva variable.</p>
                </div>
            `
        }
    ]
};

// Exportar para agregar al array principal
// Este contenido se agregará manualmente al archivo app.js
