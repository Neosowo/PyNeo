window.modules.push({
    id: 10,
    title: "Datos con Pandas",
    icon: "fa-chart-line",
    description: "Introducción al análisis de datos y tablas.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Introducción a la Ciencia de Datos</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Python es el lenguaje número uno en el mundo para Ciencia de Datos e Inteligencia Artificial.
                ¿El secreto? Una herramienta llamada <b>Pandas</b>.
            </p>
            <div class="grid md:grid-cols-2 gap-6 items-center">
                <div class="text-center">
                    <i class="fas fa-table text-6xl text-blue-500 mb-4"></i>
                    <p class="text-sm text-gray-400">Maneja tablas gigantes como si nada.</p>
                </div>
                <div class="neon-box-dark p-4 text-xs font-mono text-gray-300">
                    import pandas as pd<br><br>
                    # Carga miles de filas al instante
                    datos = pd.read_csv("ventas.csv")<br>
                    print(datos.describe())
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Tablas Inteligentes",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Estructuras de Datos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        En el análisis profesional, los datos se organizan en <strong>DataFrames</strong> (tablas de filas y columnas). Antes de usar Pandas, solemos estructurar la información usando diccionarios de listas.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="neon-box-dark p-6 border-l-2 border-blue-500">
                            <h4 class="text-xl font-bold text-white mb-3">Claves como Columnas</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                Cada clave del diccionario representa el nombre de una columna.
                            </p>
                        </div>
                        
                        <div class="neon-box-dark p-6 border-l-2 border-neon-green">
                            <h4 class="text-xl font-bold text-white mb-3">Listas como Filas</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                El valor asociado es una lista con los datos de cada fila.
                            </p>
                        </div>
                    </div>

                    <div class="neon-box-secondary p-6">
                        <h4 class="font-bold text-white mb-2">Simulación de Pandas</h4>
                        <p class="text-gray-300 text-sm">
                            Aunque aquí usamos Python puro, esta es exactamente la lógica que usa Pandas para crear tablas desde cero.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Tu Primer Dataset</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Crea un diccionario llamado <code>datos</code> donde las claves sean "Nombres" y "Notas", y los valores sean listas con 3 elementos cada una (ej: ["Ana", "Neo", "Leo"] y [10, 9, 8]).
                    </p>
                    <textarea id="code-pd-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Crea el diccionario datos con Nombres y Notas:

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pd-1').value, 'output-pd-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Estructurar Tabla
                    </button>
                </div>
                <div id="output-pd-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Generando matriz de datos...</p>
                </div>
            `,
            validation: {
                expectedOutput: "'Nombres': ['Ana', 'Neo', 'Leo']",
                matchType: "include",
                hint: "Usa datos = {'Nombres': ['Ana', 'Neo', 'Leo'], 'Notas': [10, 9, 8]} y luego print(datos)."
            }
        },
        {
            title: "Explorando Datos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Extracción de Series</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Acceder a la información es el primer paso del análisis. Si queremos analizar una "columna" específica, simplemente consultamos la clave correspondiente en nuestro dataset.
                    </p>
                    
                    <div class="bg-black/30 p-4 rounded border border-gray-700 mb-8">
                        <h5 class="text-white font-bold text-sm mb-2">Acceso a Columnas</h5>
                        <p class="text-sm text-gray-400 mb-2">Obtener todos los valores de una categoría:</p>
                        <code class="text-xs text-neon-green block">columna_precios = tienda["Precios"]</code>
                    </div>

                    <div class="neon-box-secondary p-6 border-l-2 border-yellow-500">
                        <h4 class="text-lg font-bold text-white mb-2">Indexación Doble</h4>
                        <p class="text-gray-300 text-sm">
                            Puedes acceder a un dato exacto combinando la clave y el índice: <code>tienda["Precios"][0]</code>.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Filtrado de Columna</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Dada la <code>tienda</code>, imprime primero la lista completa de "Precios" y luego imprime únicamente el <strong>primer precio</strong> de esa lista.
                    </p>
                    <textarea id="code-pd-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">tienda = {
    "Productos": ["Pan", "Agua"],
    "Precios": [1.50, 0.80]
}

# 1. Imprime la columna Precios
# 2. Imprime el primer precio (índice 0)
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pd-2').value, 'output-pd-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Analizar Precios
                    </button>
                </div>
                <div id="output-pd-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Consultando dataset...</p>
                </div>
            `,
            validation: {
                expectedOutput: "1.5",
                matchType: "include",
                hint: "Primero print(tienda['Precios']) y luego print(tienda['Precios'][0])."
            }
        }
    ]
});
