window.modules.push({
    id: 10,
    title: "Datos con Pandas",
    icon: "fa-table",
    description: "Análisis de datos profesional con la librería Pandas.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Data Science con Python</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Pandas es la herramienta más usada para manejar tablas de datos (DataFrames). 
                Olvídate de los bucles complejos; con Pandas, una sola línea de código puede procesar millones de datos.
            </p>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="neon-box-dark p-6 text-center border-b-2 border-blue-500">
                    <div class="text-3xl text-blue-400 mb-2"><i class="fas fa-file-csv"></i></div>
                    <h4 class="text-white font-bold mb-1">Carga</h4>
                    <p class="text-xs text-gray-500">Lee archivos CSV y Excel.</p>
                </div>
                <div class="neon-box-dark p-6 text-center border-b-2 border-neon-green">
                    <div class="text-3xl text-neon-green mb-2"><i class="fas fa-filter"></i></div>
                    <h4 class="text-white font-bold mb-1">Filtros</h4>
                    <p class="text-xs text-gray-500">Busca datos específicos al instante.</p>
                </div>
                <div class="neon-box-dark p-6 text-center border-b-2 border-purple-500">
                    <div class="text-3xl text-purple-400 mb-2"><i class="fas fa-chart-line"></i></div>
                    <h4 class="text-white font-bold mb-1">Análisis</h4>
                    <p class="text-xs text-gray-500">Estadísticas y agrupaciones (GroupBy).</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Series y DataFrames",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Estructuras de Datos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Pandas tiene dos estructuras principales: <strong>Series</strong> (columnas sueltas) y <strong>DataFrames</strong> (tablas completas).
                    </p>
                    
                    <div class="neon-box-secondary p-6 mb-8">
                        <h4 class="font-bold text-white mb-2">Importación Estándar</h4>
                        <p class="text-gray-300 text-sm mb-4">
                            Casi todo el mundo importa pandas con el alias <code>pd</code> para escribir menos:
                        </p>
                        <code class="text-xs text-neon-green block">import pandas as pd</code>
                    </div>

                    <div class="neon-box-dark p-6 border-l-2 border-blue-500">
                        <h4 class="text-xl font-bold text-white mb-3">Creación desde Diccionarios</h4>
                        <p class="text-gray-400 text-sm mb-4">
                            Es muy común crear un DataFrame a partir de un diccionario donde las claves son las columnas.
                        </p>
                        <code class="text-xs text-blue-400 block bg-black/40 p-3 rounded">
                            datos = {"Nombre": ["A", "B"], "Puntos": [10, 20]}<br>
                            df = pd.DataFrame(datos)
                        </code>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Tu primer DataFrame</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Simulamos Pandas. Crea un diccionario llamado <code>datos</code> con "Nombre" y "Edad", luego usa <code>pd.DataFrame(datos)</code> para convertirlo en tabla e imprímelo.
                    </p>
                    <textarea id="code-pan-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">import pandas as pd

datos = {
    "Nombre": ["Ana", "Luis"],
    "Edad": [25, 30]
}

# Crea el DataFrame df aquí:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pan-1').value, 'output-pan-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Generar Tabla
                    </button>
                </div>
                <div id="output-pan-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Formateando tabla...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Nombre",
                matchType: "include",
                requiredCode: "pd.DataFrame",
                hint: "Usa df = pd.DataFrame(datos) y luego print(df)"
            }
        },
        {
            title: "Indexación Profesional",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">loc vs iloc</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Para seleccionar datos específicos en Pandas, usamos dos herramientas clave:
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-4 mb-8">
                        <div class="neon-box-dark p-4 border-l-2 border-yellow-500">
                            <h5 class="font-bold text-white mb-1">.loc[]</h5>
                            <p class="text-xs text-gray-400 mb-2">Acceso por <b>ETIQUETAS</b> (nombres de filas/columnas).</p>
                            <code class="text-[10px] text-yellow-400 block">df.loc[0, "Nombre"]</code>
                        </div>
                        <div class="neon-box-dark p-4 border-l-2 border-blue-500">
                            <h5 class="font-bold text-white mb-1">.iloc[]</h5>
                            <p class="text-xs text-gray-400 mb-2">Acceso por <b>POSICIÓN</b> (índices numéricos de 0 a n).</p>
                            <code class="text-[10px] text-blue-400 block">df.iloc[0, 0]</code>
                        </div>
                    </div>

                    <div class="neon-box-secondary p-6">
                        <h4 class="font-bold text-white mb-2">Selección de Rangos</h4>
                        <p class="text-gray-300 text-sm mb-3">
                            Puedes obtener varias filas o columnas a la vez usando slicing:
                        </p>
                        <code class="text-xs text-neon-green block bg-black/40 p-2 rounded">
                            df.iloc[0:2, :] # Primeras 2 filas, todas las columnas
                        </code>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Filtrado de Edad</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Imprime solo la fila en la posición 0 del DataFrame <code>df</code> usando <code>iloc</code>.
                    </p>
                    <textarea id="code-pan-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="7">import pandas as pd
df = pd.DataFrame({"X": [1, 2], "Y": [3, 4]})

# Usa iloc para mostrar la primera fila:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pan-2').value, 'output-pan-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Filtrar Dato
                    </button>
                </div>
                <div id="output-pan-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Localizando dato...</p>
                </div>
            `,
            validation: {
                expectedOutput: "1",
                matchType: "include",
                requiredCode: "iloc",
                hint: "Escribe print(df.iloc[0])"
            }
        },
        {
            title: "Agregación (GroupBy)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Resumen Estadístico</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Cuando tienes miles de datos, necesitas agruparlos para entenderlos. <code>groupby()</code> es tu mejor aliado.
                    </p>
                    
                    <div class="space-y-4 mb-8">
                        <div class="neon-box-dark p-6 border border-purple-500/30">
                            <h5 class="text-white font-bold mb-3">Ejemplo de Resumen</h5>
                            <code class="text-xs text-purple-300 block bg-black/40 p-3 rounded">
                                import pandas as pd<br><br>
                                # Datos de ejemplo:<br>
                                df = pd.DataFrame({<br>
                                &nbsp;&nbsp;"Tienda": ["Norte", "Sur", "Norte"],<br>
                                &nbsp;&nbsp;"Ventas": [100, 200, 150]<br>
                                })<br><br>
                                # Agrupar por Tienda y sumar Ventas:<br>
                                print(df.groupby("Tienda")["Ventas"].sum())
                            </code>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                        <div class="neon-box-dark p-2 text-[10px] text-gray-400">.mean() (Media)</div>
                        <div class="neon-box-dark p-2 text-[10px] text-gray-400">.count() (Contar)</div>
                        <div class="neon-box-dark p-2 text-[10px] text-gray-400">.max() (Máximo)</div>
                        <div class="neon-box-dark p-2 text-[10px] text-gray-400">.std() (Desviación)</div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Análisis Grupal</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Usa <code>groupby</code> para agrupar por "Ciudad" y calcular la <b>media</b> (.mean()) de las temperaturas en el DataFrame <code>clima</code>.
                    </p>
                    <textarea id="code-pan-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">import pandas as pd
clima = pd.DataFrame({
    "Ciudad": ["A", "B", "A", "B"],
    "Temp": [20, 30, 22, 28]
})

# Agrupa y calcula la media:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pan-3').value, 'output-pan-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calcular Media
                    </button>
                </div>
                <div id="output-pan-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Agregando resultados...</p>
                </div>
            `,
            validation: {
                expectedOutput: "21",
                matchType: "include",
                requiredCode: "groupby",
                hint: "Escribe print(clima.groupby('Ciudad')['Temp'].mean())"
            }
        },
        {
            title: "Filtrado Inteligente",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Búsqueda por Condiciones</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Una de las mejores cosas de Pandas es que puedes filtrar filas completas usando condiciones lógicas, igual que harías en Excel o SQL.
                    </p>
                    
                    <div class="neon-box-secondary p-6">
                        <h4 class="font-bold text-white mb-2">Máscara Booleana</h4>
                        <p class="text-gray-300 text-sm mb-4">
                            Pasa la condición dentro de corchetes <code>df[ condición ]</code>:
                        </p>
                        <code class="text-xs text-neon-green block bg-black/40 p-3 rounded">
                            # Solo filas donde la edad sea mayor a 18:<br>
                            mayores = df[ df["Edad"] > 18 ]
                        </code>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <p class="text-gray-300 text-sm mb-4">
                        Filtra el DataFrame <code>precios</code> para mostrar solo los productos que cuesten más de 50.
                    </p>
                    <textarea id="code-pan-filter" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">import pandas as pd
precios = pd.DataFrame({
    "Prod": ["A", "B", "C"],
    "Precio": [40, 60, 80]
})

# Filtra y muestra los caros (> 50):
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pan-filter').value, 'output-pan-filter')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Filtrar Precios
                    </button>
                </div>
                <div id="output-pan-filter" class="code-output p-4 text-sm mt-4">
                    <p class="text-gray-500">Esperando filtro...</p>
                </div>
            `,
            validation: {
                expectedOutput: "60",
                matchType: "include",
                requiredCode: "]",
                hint: "Usa print(precios[ precios['Precio'] > 50 ])"
            }
        }
    ]
});
