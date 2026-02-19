window.modules.push({
    id: 13,
    title: "Dominando Pandas",
    icon: "fa-table",
    description: "De principiante a analista de datos con Pandas.",
    intro: `
        <div class="neon-box p-8 mb-8 text-center">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Data Science Profesional</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Ya conoces lo básico. Ahora vamos a ver por qué Pandas es la herramienta favorita de los científicos de datos: 
                <strong>Filtrado masivo</strong> y <strong>Agrupación inteligente</strong>.
            </p>
            <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div class="neon-box-dark p-6 border-l-2 border-neon-green">
                    <i class="fas fa-filter text-3xl text-neon-green mb-3"></i>
                    <h4 class="text-white font-bold mb-1">Filtros Avanzados</h4>
                    <p class="text-xs text-gray-400">Encuentra agujas en pajares de millones de datos.</p>
                </div>
                <div class="neon-box-dark p-6 border-l-2 border-purple-500">
                    <i class="fas fa-layer-group text-3xl text-purple-500 mb-3"></i>
                    <h4 class="text-white font-bold mb-1">Agrupación</h4>
                    <p class="text-xs text-gray-400">Genera reportes resumidos por categorías automáticamente.</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Fundamentos Sólidos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">DataFrames y Series</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Un <strong>DataFrame</strong> es tu hoja de Excel. Una <strong>Series</strong> es una columna.
                        La magia empieza cuando usas <code>.describe()</code> para entenderlo todo de un vistazo.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="neon-box-dark p-6 border-l-2 border-blue-500">
                            <h4 class="text-xl font-bold text-white mb-3">Crear Tabla</h4>
                            <code class="text-xs text-blue-400 block bg-black/40 p-3 rounded">
                                data = {"Nombre": ["Ana", "Bob"], "Edad": [20, 30]}<br>
                                df = pd.DataFrame(data)
                            </code>
                        </div>
                        
                        <div class="neon-box-dark p-6 border-l-2 border-yellow-500">
                            <h4 class="text-xl font-bold text-white mb-3">Resumen Flash</h4>
                            <code class="text-xs text-yellow-400 block bg-black/40 p-3 rounded">
                                print(df.describe())
                            </code>
                            <p class="text-[10px] text-gray-400 mt-2">Te da media, mín, máx y conteo al instante.</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Análisis Inicial</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Importa pandas, crea un DataFrame con datos de "Ventas" ([100, 200, 150, 400]) y usa <code>describe()</code>.
                    </p>
                    <textarea id="code-pan-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">import pandas as pd

# Crea df con columna "Ventas" y describe:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pan-1').value, 'output-pan-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Analizar
                    </button>
                </div>
                <div id="output-pan-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Esperando datos...</p>
                </div>
            `,
            validation: {
                expectedOutput: "max",
                matchType: "include",
                requiredCode: "pd.DataFrame",
                hint: "Usa df = pd.DataFrame({'Ventas': [...]}) y luego print(df.describe())"
            }
        },
        {
            title: "Explorando Columnas",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Accede a tus Datos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Una vez que tienes un DataFrame, puedes acceder a cualquier columna usando su nombre entre corchetes.
                        Y sobre esa columna puedes hacer operaciones matemáticas al instante.
                    </p>
                    
                    <div class="grid md:grid-cols-3 gap-6 mb-6">
                        <div class="neon-box-dark p-5 border-l-2 border-neon-green text-center">
                            <i class="fas fa-columns text-2xl text-neon-green mb-2"></i>
                            <h4 class="font-bold text-white mb-1 text-sm">Acceder columna</h4>
                            <code class="text-xs text-neon-green block bg-black/40 p-2 rounded mt-2">df["Precio"]</code>
                        </div>
                        <div class="neon-box-dark p-5 border-l-2 border-blue-400 text-center">
                            <i class="fas fa-plus-circle text-2xl text-blue-400 mb-2"></i>
                            <h4 class="font-bold text-white mb-1 text-sm">Sumar todo</h4>
                            <code class="text-xs text-blue-400 block bg-black/40 p-2 rounded mt-2">df["Precio"].sum()</code>
                        </div>
                        <div class="neon-box-dark p-5 border-l-2 border-yellow-400 text-center">
                            <i class="fas fa-calculator text-2xl text-yellow-400 mb-2"></i>
                            <h4 class="font-bold text-white mb-1 text-sm">Calcular media</h4>
                            <code class="text-xs text-yellow-400 block bg-black/40 p-2 rounded mt-2">df["Precio"].mean()</code>
                        </div>
                    </div>

                    <div class="neon-box-secondary p-5 border-l-2 border-purple-400">
                        <h4 class="font-bold text-white mb-2">💡 Ejemplo práctico</h4>
                        <code class="text-xs text-purple-300 block bg-black/40 p-3 rounded">
                            ventas = pd.DataFrame({"Ciudad": ["Madrid", "Lima", "Bogotá"], "Total": [500, 300, 450]})<br>
                            print(ventas["Total"].sum())   # → 1250<br>
                            print(ventas["Total"].mean())  # → 416.6...
                        </code>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Calculadora de Inventario</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Tienes un inventario de productos. Imprime el <strong>total</strong> de unidades disponibles 
                        usando <code>.sum()</code> en la columna <code>"Stock"</code>.
                    </p>
                    <textarea id="code-pan-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">import pandas as pd
inventario = pd.DataFrame({
    "Producto": ["Manzana", "Pan", "Leche"],
    "Stock": [50, 30, 20]
})

# Imprime el total de unidades en Stock:
print(inventario["Stock"].sum())
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pan-2').value, 'output-pan-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calcular Total
                    </button>
                </div>
                <div id="output-pan-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Calculando inventario...</p>
                </div>
            `,
            validation: {
                expectedOutput: "100",
                matchType: "include",
                requiredCode: ".sum()",
                hint: "Usa print(inventario['Stock'].sum()) — la suma de 50+30+20 es 100"
            }
        },
        {
            title: "El Poder de GroupBy",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Agrupa y Vencerás</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Esta es la función que te conseguirá un trabajo. <code>groupby()</code> te permite agrupar datos por categorías (como "Departamento" o "País") y calcular totales.
                    </p>
                    
                    <div class="space-y-4 mb-6">
                        <div class="neon-box-dark p-4 border border-purple-500/50 flex items-center gap-4">
                            <div class="text-2xl text-purple-400">1</div>
                            <div class="text-sm text-gray-300"><strong>Agrupar:</strong> <code>df.groupby("Ciudad")</code></div>
                        </div>
                        <div class="neon-box-dark p-4 border border-purple-500/50 flex items-center gap-4">
                            <div class="text-2xl text-purple-400">2</div>
                            <div class="text-sm text-gray-300"><strong>Seleccionar:</strong> <code>["Ventas"]</code> (lo que quieres sumar)</div>
                        </div>
                        <div class="neon-box-dark p-4 border border-purple-500/50 flex items-center gap-4">
                            <div class="text-2xl text-purple-400">3</div>
                            <div class="text-sm text-gray-300"><strong>Calcular:</strong> <code>.sum()</code> o <code>.mean()</code></div>
                        </div>
                    </div>

                    <code class="text-xs text-purple-300 block bg-black/40 p-3 rounded mb-2 text-center">
                        df.groupby("Ciudad")["Ventas"].sum()
                    </code>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Reporte de Ventas</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Calcula el total de ventas por "Vendedor". Agrupa por vendedor y usa <code>.sum()</code> en la columna ventas.
                    </p>
                    <textarea id="code-pan-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">import pandas as pd
df = pd.DataFrame({
    "Vendedor": ["Juan", "Ana", "Juan", "Ana"],
    "Ventas": [100, 200, 50, 300]
})

# Agrupa por Vendedor y suma las Ventas:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pan-3').value, 'output-pan-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Generar Reporte
                    </button>
                </div>
                <div id="output-pan-3" class="code-output p-4 text-sm mt-4">
                    <p class="text-gray-500">Agrupando datos...</p>
                </div>
            `,
            validation: {
                expectedOutput: "150",
                matchType: "include",
                requiredCode: "groupby",
                hint: "Escribe print(df.groupby('Vendedor')['Ventas'].sum())"
            }
        }
    ]
});
