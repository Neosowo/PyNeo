window.modules.push({
    id: 2,
    title: "Variables y Datos",
    icon: "fa-database",
    description: "Aprende a guardar información y usar los tipos de datos básicos.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <h3 class="text-3xl font-bold mb-6 text-white">La Memoria de la Computadora</h3>
            <p class="text-gray-300 mb-8 text-lg">
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
            <p class="text-sm text-gray-400">
                En esta unidad aprenderás a crear estas cajas (Variables) y qué puedes guardar en ellas (Tipos de Datos).
            </p>
        </div>
    `,
    lessons: [
        {
            title: "¿Qué es una Variable?",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Tu Memoria Digital</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Una variable es una caja 📦</h4>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Imagina que tienes una caja vacía. Le pegas una etiqueta con un nombre (por ejemplo "puntos") y guardas un valor dentro. Eso es una variable.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-secondary p-6">
                            <h5 class="font-bold text-white mb-3">En la vida real</h5>
                            <p class="text-gray-300 text-sm">
                                Tienes una caja etiquetada <b>"zapatos"</b> y guardas unos tenis dentro.
                            </p>
                        </div>
                        
                        <div class="neon-box-dark p-6">
                            <h5 class="font-bold text-neon-green mb-3">En Python</h5>
                            <code class="text-white text-lg">publico = "Neo"</code>
                            <p class="text-gray-400 text-xs mt-2">El signo <b>=</b> se usa para GUARDAR.</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400 ml-2">Desafío: Variables</span>
                    </div>
                    <textarea id="code-var-intro" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># DESAFÍO:
# 1. Crea una variable llamada 'heroe' con el valor "Batman"
# 2. Imprime la variable usando print()
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-var-intro').value, 'output-var-intro')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar Reto
                    </button>
                </div>
                <div id="output-var-intro" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Ejecuta tu código...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Batman",
                matchType: "include",
                hint: "Crea variable heroe=\"Batman\" y print(heroe)."
            }
        },
        {
            title: "[EJERCICIO] Ejercicio: Crea tu Variable",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tú: Variables Personalizadas</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white"> Ejemplo Completo</h4>
                    <p class="text-gray-300 mb-4">Primero, observa este código que funciona:</p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <code class="text-white block">
                            villano = "Joker"<br>
                            print("El villano es:", villano)
                        </code>
                        <div class="mt-3 text-sm text-gray-400">
                             Salida: El villano es: Joker
                        </div>
                    </div>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">[EJERCICIO] Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Usando el ejemplo de arriba como guía, crea tu propio código que:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>• Crea una variable llamada <code class="text-neon-green">pais</code></li>
                        <li>• Guarda en ella el valor <code class="text-neon-green">"Ecuador"</code></li>
                        <li>• Imprime el mensaje: <code class="text-neon-green">"Mi país es: Ecuador"</code></li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            [PISTA] <strong>Pista:</strong> Cambia "villano" por "pais" y "Joker" por "Ecuador". Recuerda usar comillas para el texto.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Escribe tu código aquí</span>
                    </div>
                    <textarea id="code-ejercicio-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># Crea tu variable 'pais' aquí

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ejercicio-1').value, 'output-ejercicio-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ejercicio-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Intenta resolver el ejercicio...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Mi país es: Ecuador",
                matchType: "include",
                requiredCode: "pais",
                hint: "Crea: pais = \"Ecuador\" y luego print(\"Mi país es:\", pais)"
            }
        },
        {
            title: "Los 4 Tipos Básicos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">No todo son números</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        En Python (y en el PDF de la unidad), existen 4 tipos de datos fundamentales. Piensa en ellos como "sabores" de información.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="neon-box-secondary p-4 border-l-4 border-blue-500">
                            <h5 class="font-bold text-white">1. Enteros (int)</h5>
                            <p class="text-sm text-gray-400 mb-2">Números sin decimales.</p>
                            <code class="text-neon-green bg-black/30 px-2 py-1 rounded">vidas = 3</code>
                        </div>

                        <div class="neon-box-secondary p-4 border-l-4 border-purple-500">
                            <h5 class="font-bold text-white">2. Flotantes (float)</h5>
                            <p class="text-sm text-gray-400 mb-2">Números con punto decimal.</p>
                            <code class="text-neon-green bg-black/30 px-2 py-1 rounded">precio = 9.99</code>
                        </div>

                        <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                            <h5 class="font-bold text-white">3. Cadenas (str)</h5>
                            <p class="text-sm text-gray-400 mb-2">Texto entre comillas.</p>
                            <code class="text-neon-green bg-black/30 px-2 py-1 rounded">nombre = "Neo"</code>
                        </div>

                        <div class="neon-box-secondary p-4 border-l-4 border-red-500">
                            <h5 class="font-bold text-white">4. Booleanos (bool)</h5>
                            <p class="text-sm text-gray-400 mb-2">Verdadero o Falso.</p>
                            <code class="text-neon-green bg-black/30 px-2 py-1 rounded">es_robot = True</code>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Investigando tipos con type()</span>
                    </div>
                    <textarea id="code-types" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Python nos dice qué tipo es cada cosa
texto = "Fundamentos"
numero = 100
decimal = 3.14

print(type(texto))
print(type(numero))
print(type(decimal))</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-types').value, 'output-types')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-types" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Observa la salida...</p>
                </div>
            `,
            validation: {
                expectedOutput: "class 'str'",
                matchType: "include",
                requiredCode: "type",
                hint: "Asegúrate de ejecutar el código que usa la función type()."
            }
        },
        {
            title: "Python Calculadora",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Matemáticas Simples</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-4">
                        Puedes usar Python como una calculadora súper potente. Los símbolos son casi iguales a los de la escuela.
                    </p>
                    
                    <div class="neon-box-dark p-4 grid grid-cols-2 gap-4 text-sm">
                        <div class="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span class="text-white">Suma</span>
                            <code class="text-neon-green">+</code>
                        </div>
                        <div class="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span class="text-white">Resta</span>
                            <code class="text-neon-green">-</code>
                        </div>
                        <div class="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span class="text-white">Multiplicación</span>
                            <code class="text-neon-green">*</code>
                        </div>
                        <div class="flex justify-between items-center border-b border-gray-700 pb-2">
                            <span class="text-white">División</span>
                            <code class="text-neon-green">/</code>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-white">Potencia</span>
                            <code class="text-neon-green">**</code>
                        </div>
                    </div>
                </div>

                <h4 class="text-xl font-bold mb-4 text-white">Reto: Calcula el Área</h4>
                <p class="text-gray-400 mb-4 text-sm">
                    El área de un cuadrado es lado por lado. Si el lado es 5, ¿cuál es el área?
                </p>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-math" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5">lado = 5
area = lado * lado

print("El lado es:", lado)
print("El área es:", area)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-math').value, 'output-math')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calcular
                    </button>
                </div>
                <div id="output-math" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado aquí...</p>
                </div>
            `,
            validation: {
                expectedOutput: "25",
                matchType: "include",
                hint: "El área debe ser 25 (5 x 5)."
            }
        },
        {
            title: "[EJERCICIO] Ejercicio: Calculadora de Rectángulos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tú: Área del Rectángulo</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white"> Repasemos el Ejemplo del Cuadrado</h4>
                    <p class="text-gray-300 mb-4">En la lección anterior viste este código:</p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <code class="text-white block">
                            lado = 5<br>
                            area = lado * lado<br>
                            print("El área es:", area)
                        </code>
                        <div class="mt-3 text-sm text-gray-400">
                             Salida: El área es: 25
                        </div>
                    </div>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">[EJERCICIO] Tu Turno: Cambia el Problema</h4>
                    <p class="text-gray-300 mb-4">
                        Ahora calcula el área de un <strong>rectángulo</strong> (no un cuadrado).
                    </p>
                    <div class="neon-box-secondary p-6 mb-4">
                        <p class="text-white mb-2"> Recuerda:</p>
                        <ul class="text-gray-400 text-sm space-y-1">
                            <li>• Cuadrado: lado × lado</li>
                            <li>• Rectángulo: base × altura</li>
                        </ul>
                    </div>
                    
                    <p class="text-gray-300 mb-4">
                        Tu código debe:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>• Crear una variable <code class="text-neon-green">base</code> con valor <code class="text-neon-green">8</code></li>
                        <li>• Crear una variable <code class="text-neon-green">altura</code> con valor <code class="text-neon-green">4</code></li>
                        <li>• Multiplicar base por altura y guardarlo en <code class="text-neon-green">area</code></li>
                        <li>• Imprimir: <code class="text-neon-green">"El área del rectángulo es: 32"</code></li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            [PISTA] <strong>Pista:</strong> Modifica el código del cuadrado. En lugar de "lado", usa "base" y "altura".
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Escribe tu código aquí</span>
                    </div>
                    <textarea id="code-ejercicio-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Calcula el área del rectángulo
# base = 8, altura = 4

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ejercicio-2').value, 'output-ejercicio-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calcular
                    </button>
                </div>
                <div id="output-ejercicio-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">¿Puede tu código calcular correctamente?</p>
                </div>
            `,
            validation: {
                expectedOutput: "32",
                matchType: "include",
                requiredCode: "base",
                hint: "base = 8, altura = 4, area = base * altura, luego print."
            }
        },
        {
            title: "[EJERCICIO] Ejercicio: Construye un Saludo",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tú: Saludo Personalizado</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white"> Repasemos el Ejemplo de Concatenación</h4>
                    <p class="text-gray-300 mb-4">En la lección anterior viste:</p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <code class="text-white block">
                            nombre = "Juan"<br>
                            apellido = "Pérez"<br>
                            nombre_completo = nombre + " " + apellido<br>
                            print(nombre_completo)
                        </code>
                        <div class="mt-3 text-sm text-gray-400">
                             Salida: Juan Pérez
                        </div>
                    </div>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">[EJERCICIO] Tu Turno: Agrega un Saludo</h4>
                    <p class="text-gray-300 mb-4">
                        Usando el ejemplo como guía, crea un saludo más completo:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>• Crea la variable <code class="text-neon-green">nombre = "María"</code></li>
                        <li>• Crea la variable <code class="text-neon-green">ciudad = "Guayaquil"</code></li>
                        <li>• Une las variables con el texto <code class="text-neon-green">"Hola "</code> y <code class="text-neon-green">" de "</code> para formar:</li>
                        <li class="ml-6 text-neon-green">"Hola María de Guayaquil"</li>
                        <li>• Imprime el resultado</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            [PISTA] <strong>Pista:</strong> Necesitas unir 4 partes: "Hola " + nombre + " de " + ciudad
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Escribe tu código aquí</span>
                    </div>
                    <textarea id="code-ejercicio-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Crea las variables nombre y ciudad
# Úsalas para construir el saludo completo

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ejercicio-3').value, 'output-ejercicio-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Saludar
                    </button>
                </div>
                <div id="output-ejercicio-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">¿Puedes crear el saludo correcto?</p>
                </div>
            `,
            validation: {
                expectedOutput: "Hola María de Guayaquil",
                matchType: "exact",
                hint: 'saludo = "Hola " + nombre + " de " + ciudad y luego print(saludo)'
            }
        },
        {
            title: "Uniendo Textos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Pegamento de Palabras</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Concatenación</h4>
                    <p class="text-gray-300 mb-6">
                        Suena complicado, pero solo significa "unir". En Python, puedes sumar textos usando el símbolo <code class="text-neon-green">+</code>.
                    </p>

                    <div class="neon-box-secondary p-6 border-l-4 border-green-500">
                        <h5 class="font-bold text-white mb-2">¡Cuidado con los espacios!</h5>
                        <p class="text-sm text-gray-300">
                            Python no agrega espacios automáticamente. Tienes que ponerlos tú.
                        </p>
                        <div class="mt-3 bg-black/30 p-3 rounded font-mono text-sm">
                            <span class="text-red-400">"Hola" + "Mundo"</span> → "HolaMundo"<br>
                            <span class="text-neon-green">"Hola" + " " + "Mundo"</span> → "Hola Mundo"
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Crea tu nombre completo</span>
                    </div>
                    <textarea id="code-concat" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5">nombre = "Juan"
apellido = "Pérez"

# Unimos las variables con un espacio en medio
nombre_completo = nombre + " " + apellido

print(nombre_completo)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-concat').value, 'output-concat')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Unir
                    </button>
                </div>
                <div id="output-concat" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Ver resultado...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Juan Pérez",
                matchType: "include",
                hint: "El resultado debe incluir 'Juan Pérez'."
            }
        },
        {
            title: "Interactuar con el Usuario",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Tu Programa Escucha</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">La función input()</h4>
                    <p class="text-gray-300 mb-6">
                        Hasta ahora, tus programas eran "mudos". Con <code class="text-neon-green">input()</code>, el programa se detiene y espera a que el usuario escriba algo.
                    </p>

                    <div class="neon-box-secondary p-6 border-l-4 border-yellow-500 mb-6">
                        <h5 class="font-bold text-white mb-2">⚠️ Regla de Oro</h5>
                        <p class="text-sm text-gray-300">
                            Todo lo que el usuario escribe llega como <b>TEXTO</b>. Si escriben "5", Python recibe el texto "5", no el número 5.
                            <br>Para hacer matemáticas, necesitas convertirlo con <code class="text-neon-green">int()</code>.
                        </p>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-dark p-4">
                            <span class="text-gray-400 text-xs">Texto simple</span>
                            <div class="text-white mt-2">nombre = input("¿Nombre?")</div>
                        </div>
                        <div class="neon-box-dark p-4">
                            <span class="text-gray-400 text-xs">Para números</span>
                            <div class="text-white mt-2">edad = int(input("¿Edad?"))</div>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Calculadora de Edad en 2030</span>
                    </div>
                    <textarea id="code-input" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Pedimos la edad actual
texto_edad = input("¿Cuántos años tienes hoy? ")

# Convertimos el texto a número entero
edad_numero = int(texto_edad)

# Calculamos la edad en el futuro
futuro = edad_numero + 5
print("En 5 años tendrás:", futuro)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-input').value, 'output-input')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Probar
                    </button>
                </div>
                <div id="output-input" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Escribe tu respuesta en el cuadro que aparecerá...</p>
                </div>
            `,
            validation: {
                requiredCode: "input",
                hint: "Debes usar la función input() para pedir datos."
            }
        },
        {
            title: "Trucos con Texto",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Maquillando Palabras</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Python tiene herramientas integradas para transformar texto mágicamente. Se usan poniendo un punto <code class="text-neon-green">.</code> después del texto.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div class="neon-box-secondary p-4 text-center">
                            <code class="text-neon-green block mb-2">.upper()</code>
                            <span class="text-gray-400">GRITA TODO (MAYÚSCULAS)</span>
                        </div>
                        <div class="neon-box-secondary p-4 text-center">
                            <code class="text-neon-green block mb-2">.lower()</code>
                            <span class="text-gray-400">susurra todo (minúsculas)</span>
                        </div>
                        <div class="neon-box-secondary p-4 text-center">
                            <code class="text-neon-green block mb-2">.replace("a", "b")</code>
                            <span class="text-gray-400">Cambia letras</span>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Experimentando con .methods()</span>
                    </div>
                    <textarea id="code-str" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">mensaje = "Hola Mundo Python"

print(mensaje.upper())
print(mensaje.lower())
print(mensaje.replace("o", "X"))
print(mensaje.replace("Python", "Neo"))</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-str').value, 'output-str')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Transformar
                    </button>
                </div>
                <div id="output-str" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Observa los cambios...</p>
                </div>
            `,
            validation: {
                requiredCode: ".upper",
                hint: "Prueba al menos usar .upper()."
            }
        },
        {
            title: "[EJERCICIO] Ejercicio: Tu Generador de Apodos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tú: Transformador de Nombres</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white"> Repasemos los Métodos de Texto</h4>
                    <p class="text-gray-300 mb-4">En la lección anterior viste:</p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <code class="text-white block">
                            mensaje = "Hola Mundo Python"<br>
                            print(mensaje.upper())<br>
                            print(mensaje.lower())
                        </code>
                        <div class="mt-3 text-sm text-gray-400">
                             Salida:<br>
                            HOLA MUNDO PYTHON<br>
                            hola mundo python
                        </div>
                    </div>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">[EJERCICIO] Tu Turno: Crea un Apodo Genial</h4>
                    <p class="text-gray-300 mb-4">
                        Ahora crea un programa que transforme nombres en apodos épicos:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>• Crea la variable <code class="text-neon-green">nombre = "Carlos"</code></li>
                        <li>• Transforma el nombre a MAYÚSCULAS usando <code class="text-neon-green">.upper()</code></li>
                        <li>• Agrega el prefijo <code class="text-neon-green">"EL GRAN "</code> antes del nombre (concatenando)</li>
                        <li>• Imprime el resultado final: <code class="text-neon-green">"EL GRAN CARLOS"</code></li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            [PISTA] <strong>Pista:</strong> Primero convierte a mayúsculas con .upper(), luego une con "EL GRAN " usando +
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Escribe tu código aquí</span>
                    </div>
                    <textarea id="code-ejercicio-4" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Crea el nombre y transfórmalo en un apodo épico

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ejercicio-4').value, 'output-ejercicio-4')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Crear Apodo
                    </button>
                </div>
                <div id="output-ejercicio-4" class="code-output p-4 text-sm">
                    <p class="text-gray-500">¿Puedes crear el apodo épico?</p>
                </div>
            `,
            validation: {
                expectedOutput: "EL GRAN CARLOS",
                matchType: "exact",
                requiredCode: ".upper",
                hint: 'apodo = "EL GRAN " + nombre.upper() y luego print(apodo)'
            }
        },
        {
            title: "El Factor Suerte (Random)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Dados y Azar 🎲</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Importar Poderes</h4>
                    <p class="text-gray-300 mb-6">
                        Para usar azar, necesitamos traer una librería especial llamada <code class="text-neon-green">random</code>.
                    </p>

                    <div class="neon-box-dark p-6 border-l-4 border-purple-500">
                        <div class="text-gray-300 font-mono text-sm space-y-2">
                            <div><span class="text-purple-400">import</span> random</div>
                            <div class="text-gray-500"># Genera un número entre 1 y 10</div>
                            <div>suerte = random.randint(1, 10)</div>
                        </div>
                    </div>
                </div>

                <h4 class="text-2xl font-bold mb-4 text-white">Mini-Juego: El Dado</h4>
                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Simulador de Dado D6</span>
                    </div>
                    <textarea id="code-random" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">import random

print("Lanzando los dados...")
dado1 = random.randint(1, 6)
dado2 = random.randint(1, 6)

print("Dado 1:", dado1)
print("Dado 2:", dado2)
print("Total:", dado1 + dado2)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-random').value, 'output-random')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Lanzar
                    </button>
                </div>
                <div id="output-random" class="code-output p-4 text-sm">
                    <p class="text-gray-500">¡Prueba tu suerte varias veces!...</p>
                </div>
            `,
            validation: {
                requiredCode: "random.randint",
                hint: "Asegúrate de importar random y usar randint."
            }
        }
    ]
});
