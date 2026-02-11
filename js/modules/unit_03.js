window.modules.push({
    id: 3,
    title: "Listas y Colecciones",
    icon: "fa-list",
    description: "Aprende a guardar multiples datos en una sola variable.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white">Colecciones de Datos</h3>
            <p class="text-gray-300 mb-6 text-lg">
                A veces, una sola variable no es suficiente. ¿Qué pasa si quieres guardar los nombres de todos tus amigos?
                ¿Crearías variable1, variable2, variable3...? ¡No!
            </p>
            <div class="neon-box-dark p-6 border-l-4 border-yellow-500 mb-6">
                <h4 class="text-xl font-bold text-white mb-2">La Solución: Listas</h4>
                <p class="text-gray-300">
                    Una lista es como una estantería donde puedes guardar muchos elementos ordenados uno detrás de otro.
                </p>
            </div>
            <ul class="text-left text-gray-300 space-y-2 max-w-md mx-auto">
                <li class="flex items-center"><i class="fas fa-check text-neon-green mr-2"></i> Inventarios de juegos</li>
                <li class="flex items-center"><i class="fas fa-check text-neon-green mr-2"></i> Listas de compras</li>
                <li class="flex items-center"><i class="fas fa-check text-neon-green mr-2"></i> Canciones de una playlist</li>
            </ul>
        </div>
    `,
    lessons: [
        {
            title: "¿Que es una Lista?",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Variables con Multiples Valores</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Una variable, muchos datos</h4>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Hasta ahora, una variable solo guardaba una cosa (un numero o un texto). Una lista nos permite guardar muchos elementos juntos, separados por comas y encerrados entre corchetes [ ].
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-secondary p-6">
                            <h5 class="font-bold text-white mb-3">Sintaxis</h5>
                            <div class="code-editor bg-black/30 p-4 rounded">
                                <code class="text-neon-green">mi_lista = [elemento1, elemento2]</code>
                            </div>
                        </div>
                        
                        <div class="neon-box-dark p-6">
                            <h5 class="font-bold text-white mb-3">Ejemplos Reales</h5>
                            <ul class="space-y-2 text-gray-300 text-sm">
                                <li>numeros = [1, 2, 3, 4, 5]</li>
                                <li>nombres = ["Ana", "Pedro", "Luis"]</li>
                                <li>mezcla = [10, "Hola", True]</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h4 class="text-2xl font-bold mb-4 text-white">Tu Primera Lista</h4>
                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Creando un inventario</span>
                    </div>
                    <textarea id="code-list-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># Creamos una lista de frutas
frutas = ["Manzana", "Banana", "Uva"]

print("Mi lista de frutas:")
print(frutas)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-list-1').value, 'output-list-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-list-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado aqui...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Manzana",
                matchType: "include"
            }
        },
        {
            title: "[EJERCICIO] Ejercicio: Crea tu Lista",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tú: Lista de Colores</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white"> Repasemos las Listas</h4>
                    <p class="text-gray-300 mb-4">Ya viste cómo crear una lista de frutas:</p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <code class="text-white block">
                            frutas = ["Manzana", "Banana", "Uva"]<br>
                            print(frutas)
                        </code>
                        <div class="mt-3 text-sm text-gray-400">
                             Salida: ['Manzana', 'Banana', 'Uva']
                        </div>
                    </div>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">[EJERCICIO] Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Crea una lista de colores y muéstrala:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>• Crea una variable llamada <code class="text-neon-green">colores</code></li>
                        <li>• Guarda tres colores: <code class="text-neon-green">"Rojo", "Verde", "Azul"</code></li>
                        <li>• Imprime la lista completa</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            [PISTA] <strong>Pista:</strong> Usa corchetes [] y separa los elementos con comas.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Escribe tu código aquí</span>
                    </div>
                    <textarea id="code-ej1-unit3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="4"># Crea una lista de colores

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ej1-unit3').value, 'output-ej1-unit3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ej1-unit3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">¿Puedes crear la lista correctamente?</p>
                </div>
            `,
            validation: {
                expectedOutput: "Rojo",
                matchType: "include",
                requiredCode: "colores",
                hint: 'colores = ["Rojo", "Verde", "Azul"] y luego print(colores)'
            }
        },
        {
            title: "Posiciones e Indices",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">El Orden Importa</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Contando desde Cero</h4>
                    <p class="text-gray-300 mb-6">
                        En programacion, siempre empezamos a contar desde 0, no desde 1. Cada elemento tiene una posicion llamada "indice".
                    </p>
                    
                    <div class="neon-box-secondary p-6 mb-6">
                        <h5 class="font-bold text-white mb-4">Ejemplo: lista = ["A", "B", "C"]</h5>
                        <div class="flex gap-2 text-center">
                            <div class="flex-1 bg-black/30 p-2 rounded">
                                <div class="text-neon-green font-bold">"A"</div>
                                <div class="text-xs text-gray-500">Indice 0</div>
                            </div>
                            <div class="flex-1 bg-black/30 p-2 rounded">
                                <div class="text-neon-green font-bold">"B"</div>
                                <div class="text-xs text-gray-500">Indice 1</div>
                            </div>
                            <div class="flex-1 bg-black/30 p-2 rounded">
                                <div class="text-neon-green font-bold">"C"</div>
                                <div class="text-xs text-gray-500">Indice 2</div>
                            </div>
                        </div>
                    </div>

                    <div class="neon-box-dark p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            <b>Truco:</b> Si usas indices negativos, cuentas desde el final. <br>
                            -1 es el ultimo elemento, -2 el penultimo.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Accediendo a elementos</span>
                    </div>
                    <textarea id="code-list-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">colores = ["Rojo", "Verde", "Azul", "Amarillo"]

print("El primer color (0):", colores[0])
print("El tercer color (2):", colores[2])
print("El ultimo color (-1):", colores[-1])</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-list-2').value, 'output-list-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ver Colores
                    </button>
                </div>
                <div id="output-list-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Observa los indices...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Rojo",
                matchType: "include"
            }
        },
        {
            title: "[EJERCICIO] Ejercicio: Acceso por Índice",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tú: Accede a Elementos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white"> Repasemos los Índices</h4>
                    <p class="text-gray-300 mb-4">Ya aprendiste que las listas empiezan en 0:</p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <code class="text-white block">
                            colores = ["Rojo", "Verde", "Azul"]<br>
                            print(colores[0]) # Rojo<br>
                            print(colores[1]) # Verde
                        </code>
                    </div>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">[EJERCICIO] Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Dada esta lista de animales:
                    </p>
                    <div class="bg-black/30 p-3 rounded mb-4">
                        <code class="text-neon-green">animales = ["Perro", "Gato", "Pajaro", "Pez"]</code>
                    </div>
                    <p class="text-gray-300 mb-4">
                        Imprime:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>• El segundo animal (índice 1)</li>
                        <li>• El último animal usando índice negativo (-1)</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            [PISTA] <strong>Pista:</strong> animales[1] y animales[-1]
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Escribe tu código aquí</span>
                    </div>
                    <textarea id="code-ej2-unit3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5">animales = ["Perro", "Gato", "Pajaro", "Pez"]

# Imprime el segundo y el último

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ej2-unit3').value, 'output-ej2-unit3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ej2-unit3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">¿Puedes acceder correctamente?</p>
                </div>
            `,
            validation: {
                expectedOutput: "Gato",
                matchType: "include",
                hint: 'print(animales[1]) y print(animales[-1])'
            }
        },
        {
            title: "Modificar Listas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Agregando Datos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Las listas son dinámicas. Puedes agregar elementos nuevos o contar cuantos tienes.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">lista.append(x)</code>
                            <p class="text-sm text-gray-400">Agrega 'x' al final de la lista.</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">len(lista)</code>
                            <p class="text-sm text-gray-400">Te dice cuantos elementos hay en total.</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-list-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="7">mochila = ["Linterna", "Mapa"]
print("Mochila inicial:", mochila)

# Agregamos algo nuevo
mochila.append("Botella de Agua")
mochila.append("Brujula")

print("Mochila final:", mochila)
print("Total de objetos:", len(mochila))</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-list-3').value, 'output-list-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-list-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `,
            validation: {
                expectedOutput: "4",
                matchType: "include"
            }
        },
        {
            title: "[EJERCICIO] Ejercicio: Lista Dinámica",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tú: Construye tu Lista</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white"> Repasemos append()</h4>
                    <p class="text-gray-300 mb-4">Ya viste cómo agregar elementos:</p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <code class="text-white block">
                            mochila = ["Linterna"]<br>
                            mochila.append("Mapa")<br>
                            # Ahora mochila = ["Linterna", "Mapa"]
                        </code>
                    </div>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">[EJERCICIO] Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Crea una lista de tareas:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>• Empieza con una lista vacía: <code class="text-neon-green">tareas = []</code></li>
                        <li>• Agrega "Estudiar"</li>
                        <li>• Agrega "Ejercicio"</li>
                        <li>• Agrega "Leer"</li>
                        <li>• Imprime la cantidad total de tareas con len()</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            [PISTA] <strong>Pista:</strong> Usa .append() tres veces y luego print(len(tareas))
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Escribe tu código aquí</span>
                    </div>
                    <textarea id="code-ej3-unit3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="7"># Crea lista vacía y agrega 3 tareas

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ej3-unit3').value, 'output-ej3-unit3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ej3-unit3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Debería mostrar: 3</p>
                </div>
            `,
            validation: {
                expectedOutput: "3",
                matchType: "include",
                requiredCode: "append",
                hint: 'tareas = []; tareas.append("Estudiar"); tareas.append("Ejercicio"); tareas.append("Leer"); print(len(tareas))'
            }
        }
    ]
});
