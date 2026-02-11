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
                <h3 class="text-3xl font-bold mb-6 text-white">Excel en Código</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">La librería Pandas </h4>
                    <p class="text-gray-300 mb-6">
                        En el mundo real, los datos no vienen en variables sueltas, vienen en tablas (como en Excel).
                        Python usa una librería llamada <b>pandas</b> para manejar esto.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-secondary p-6">
                            <h5 class="font-bold text-white mb-2">DataFrame</h5>
                            <p class="text-sm text-gray-400">
                                Es el nombre técnico de una "Tabla". Tiene filas y columnas.
                            </p>
                        </div>
                        <div class="neon-box-dark p-6 border-l-4 border-blue-500">
                            <h5 class="font-bold text-white mb-2">Importar</h5>
                            <code class="text-neon-green">import pandas as pd</code>
                            <p class="text-xs text-gray-400 mt-2">
                                Los programadores son vagos, así que le ponemos el apodo "pd".
                            </p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Creando tu primera tabla</span>
                    </div>
                    <textarea id="code-pd-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">import pandas as pd

# Datos en forma de Diccionario
datos = {
    "Nombre": ["Ana", "Bob", "Charlie"],
    "Edad": [25, 30, 35],
    "Ciudad": ["Madrid", "Lima", "Bogota"]
}

# Crear la tabla (DataFrame)
tabla = pd.DataFrame(datos)

print(tabla)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pd-1').value, 'output-pd-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ver Tabla
                    </button>
                </div>
                
                <div id="output-pd-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Nota: Si usas Skulpt básico, esto podría no ejecutarse, pero así se ve el código real.</p>
                </div>
            `
        },
        {
            title: "Explorando Datos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Leyendo la Información</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Una vez que tienes tu tabla, puedes sacar columnas específicas o ver estadísticas rápidas.
                    </p>
                    
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">tabla["Edad"]</code>
                            <span class="text-gray-400">Selecciona solo una columna.</span>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">tabla.head(5)</code>
                            <span class="text-gray-400">Muestra las primeras 5 filas.</span>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">tabla.describe()</code>
                            <span class="text-gray-400">Calcula promedio, max, min, etc.</span>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-pd-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="10">import pandas as pd

datos = {
    "Producto": ["Manzana", "Pera", "Uva", "Sandia"],
    "Precio": [1.50, 2.00, 3.50, 5.00],
    "Stock": [100, 50, 20, 10]
}

df = pd.DataFrame(datos)

print("--- Columna Precios ---")
print(df["Precio"])

print("\n--- Estadísticas ---")
print(df["Precio"].describe())</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-pd-2').value, 'output-pd-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Analizar
                    </button>
                </div>
                <div id="output-pd-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado del análisis...</p>
                </div>
            `
        }
    ]
});
