window.modules.push({
    id: 3,
    title: "Listas en Python",
    icon: "fa-list",
    description: "Aprende a guardar múltiples datos en una sola variable.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <div class="text-6xl mb-6 text-neon-green"><i class="fas fa-layer-group"></i></div>
            <h3 class="text-3xl font-bold mb-4 text-white">Coleccionando Datos</h3>
            <p class="text-gray-300 mb-8 text-lg">
                Las listas son como cajas con compartimentos donde puedes guardar lo que quieras: nombres, números o incluso otras listas.
            </p>
            <div class="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div class="neon-box-secondary p-4">
                    <div class="text-2xl text-white">0</div>
                    <div class="text-xs text-gray-500">Primer Item</div>
                </div>
                <div class="neon-box-secondary p-4">
                    <div class="text-2xl text-white">1</div>
                    <div class="text-xs text-gray-500">Segundo Item</div>
                </div>
                <div class="neon-box-secondary p-4 border-dashed border-gray-600">
                    <div class="text-2xl text-gray-600">+</div>
                    <div class="text-xs text-gray-600">Agregar</div>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Creando Listas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Estructura Básica</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        En Python, creamos listas usando corchetes <code>[]</code> y separando los elementos con comas. Pueden contener cualquier tipo de dato.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="neon-box-dark p-6 border-l-2 border-neon-green">
                            <h4 class="text-xl font-bold text-white mb-3">Sintaxis</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                <code>mi_lista = [1, 2, 3]</code>
                            </p>
                        </div>
                        
                        <div class="neon-box-dark p-6 border-l-2 border-blue-500">
                            <h4 class="text-xl font-bold text-white mb-3">Diversidad</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                Una lista puede tener textos y números mezclados.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Tu Inventario</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Crea una lista llamada <code>colores</code> que contenga: "rojo", "verde" y "azul". Luego imprímela.
                    </p>
                    <textarea id="code-list-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># Crea tu lista aquí:

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-list-1').value, 'output-list-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar Lista
                    </button>
                </div>
                <div id="output-list-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Esperando colección...</p>
                </div>
            `,
            validation: {
                expectedOutput: "['rojo', 'verde', 'azul']",
                matchType: "include",
                hint: "Escribe colores = ['rojo', 'verde', 'azul'] y luego print(colores)"
            }
        },
        {
            title: "Acceso por Índice",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Posiciones en la Lista</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Para obtener un elemento específico, usamos su <strong>índice</strong> entre corchetes. 
                        <strong>¡Dato vital!</strong> En programación siempre empezamos a contar desde <strong>0</strong>.
                    </p>
                    
                    <div class="bg-black/30 p-4 rounded border border-gray-700 mb-6">
                        <h5 class="text-white font-bold text-sm mb-2">Ejemplo Visual</h5>
                        <p class="text-sm text-gray-400">
                            Lista: ["A", "B", "C"] <br>
                            Índice: &nbsp;&nbsp;0 &nbsp;&nbsp;&nbsp;1 &nbsp;&nbsp;&nbsp;2
                        </p>
                    </div>

                    <div class="neon-box-secondary p-6 border-l-2 border-red-500">
                        <h4 class="text-lg font-bold text-white mb-2">Índices Negativos</h4>
                        <p class="text-gray-300 text-sm">
                            Python permite usar <code>-1</code> para obtener el último elemento, <code>-2</code> para el penúltimo, y así sucesivamente.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Acceso Preciso</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Dada la lista <code>frutas</code>, imprime únicamente la palabra "pera" accediendo a su posición.
                    </p>
                    <textarea id="code-list-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">frutas = ["manzana", "pera", "uva"]

# Imprime el segundo elemento:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-list-2').value, 'output-list-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Extraer Dato
                    </button>
                </div>
                <div id="output-list-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Buscando en memoria...</p>
                </div>
            `,
            validation: {
                expectedOutput: "pera",
                matchType: "exact",
                hint: "Recuerda que la primera posición es 0, así que la segunda es fruits[1]"
            }
        },
        {
            title: "Modificando Listas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Listas Dinámicas</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Las listas son "mutables", lo que significa que puedes cambiar su contenido, agregar nuevos elementos o borrarlos en cualquier momento.
                    </p>
                    
                    <div class="space-y-4">
                        <div class="neon-box-dark p-4 border border-blue-900/50">
                            <h5 class="font-bold text-blue-400 mb-1">.append(valor)</h5>
                            <p class="text-sm text-gray-400">Agrega un elemento al final de la lista.</p>
                        </div>
                        
                        <div class="neon-box-dark p-4 border border-purple-900/50">
                            <h5 class="font-bold text-purple-400 mb-1">.pop() o .remove()</h5>
                            <p class="text-sm text-gray-400">Elimina elementos de la lista.</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Actualizando Datos</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Tienes una lista de <code>usuarios</code>. Agrega el nombre "Neo" al final de la lista y luego imprímela.
                    </p>
                    <textarea id="code-list-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">usuarios = ["Ana", "Pedro"]

# Agrega "Neo" aquí:

# Imprime la lista completa:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-list-3').value, 'output-list-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Modificar Lista
                    </button>
                </div>
                <div id="output-list-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Actualizando inventario...</p>
                </div>
            `,
            validation: {
                expectedOutput: "['Ana', 'Pedro', 'Neo']",
                matchType: "include",
                hint: "Usa usuarios.append('Neo') antes del print."
            }
        }
    ]
});
