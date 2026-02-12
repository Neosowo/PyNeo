window.modules.push({
    id: 12,
    title: "Conjuntos y Tuplas",
    icon: "fa-layer-group",
    description: "Aprende a manejar datos únicos e inmutables.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <h3 class="text-3xl font-bold mb-6 text-white">Estructuras Especializadas</h3>
            <p class="text-gray-300 mb-8 text-lg">
                No todos los datos deben ser modificables ni estar ordenados. 
                Python ofrece herramientas para casos específicos.
            </p>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="neon-box-dark p-6 border-l-4 border-yellow-500 text-left">
                    <h4 class="text-yellow-500 font-bold mb-2">Tuplas (tuple)</h4>
                    <p class="text-sm text-gray-400">Datos que NO cambian. Perfectas para coordenadas o constantes.</p>
                </div>
                <div class="neon-box-dark p-6 border-l-4 border-purple-500 text-left">
                    <h4 class="text-purple-500 font-bold mb-2">Conjuntos (set)</h4>
                    <p class="text-sm text-gray-400">Colección de elementos ÚNICOS. Sin duplicados.</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Las Tuplas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Listas Inmutables</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Una tupla es como una lista, pero usa paréntesis <code class="text-neon-green">( )</code> y NO se puede modificar una vez creada.
                    </p>
                    
                    <div class="neon-box-secondary p-6">
                        <h5 class="font-bold text-white mb-2">¿Por qué usarlas?</h5>
                        <ul class="text-sm text-gray-400 space-y-2">
                            <li>• <b>Seguridad:</b> Evitas errores de cambio accidental.</li>
                            <li>• <b>Velocidad:</b> Son más rápidas que las listas.</li>
                        </ul>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-tuple-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">punto = (10, 20)
print("Coordenadas:", punto)

# Intentar cambiarlo daría error:
# punto[0] = 15  # <--- Esto no funciona

dias = ("Lunes", "Martes", "Miércoles")
print("Primer día:", dias[0])</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-tuple-1').value, 'output-tuple-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-tuple-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `},
        {
            title: "Conjuntos (Sets)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Elementos Únicos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Un <code class="text-neon-green">set</code> es una colección que no permite duplicados y no tiene un orden fijo.
                    </p>
                    
                    <div class="neon-box-dark p-6">
                        <h5 class="font-bold text-white mb-3">Operaciones útiles</h5>
                        <ul class="text-xs text-gray-400 space-y-2">
                            <li><code class="text-neon-green">.add()</code>: Añade un elemento.</li>
                            <li><code class="text-neon-green">.remove()</code>: Quita un elemento.</li>
                            <li>Automáticamente elimina repetidos.</li>
                        </ul>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-set-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># Creamos un conjunto con repetidos
frutas = {"Manzana", "Banana", "Uva", "Manzana"}

print("Conjunto de frutas (sin repetidos):")
print(frutas)

frutas.add("Pera")
print("Agregamos Pera:", frutas)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-set-1').value, 'output-set-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ver Conjunto
                    </button>
                </div>
                <div id="output-set-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `}
    ]
});
