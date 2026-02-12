window.modules.push({
    id: 11,
    title: "Matrices y Lógica Espacial",
    icon: "fa-border-all",
    description: "Domina las estructuras de datos en 2D y el análisis de cuadrantes.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Datos en Dos Dimensiones</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Una matriz es simplemente una <b>lista de listas</b>. 
                Es la base para imágenes, mapas, juegos (como el ajedrez) y hojas de cálculo.
            </p>
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <div class="neon-box-dark p-6 text-center">
                    <div class="grid grid-cols-3 gap-2 max-w-[150px] mx-auto mb-4">
                        <div class="w-10 h-10 bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs text-blue-400">[0][0]</div>
                        <div class="w-10 h-10 bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs text-blue-400">[0][1]</div>
                        <div class="w-10 h-10 bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs text-blue-400">[0][2]</div>
                        <div class="w-10 h-10 bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs text-blue-400">[1][0]</div>
                        <div class="w-10 h-10 bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs text-blue-400">[1][1]</div>
                        <div class="w-10 h-10 bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs text-blue-400">[1][2]</div>
                    </div>
                    <p class="text-sm text-gray-400">Filas y Columnas</p>
                </div>
                <div class="neon-box-secondary p-6">
                    <h4 class="text-white font-bold mb-3">Conceptos Clave</h4>
                    <ul class="text-sm text-gray-500 space-y-2">
                        <li>• Acceso: <code>matriz[fila][columna]</code></li>
                        <li>• Recorrido: Bucles anidados</li>
                        <li>• Slicing 2D: Sub-matrices</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Creando Matrices",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Listas Anidadas</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Para crear una matriz, definimos una lista donde cada elemento es otra lista.
                    </p>
                    
                    <div class="neon-box-dark p-6">
                        <pre class="text-sm text-neon-green">matriz = [
    [1, 2, 3],  # Fila 0
    [4, 5, 6],  # Fila 1
    [7, 8, 9]   # Fila 2
]</pre>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Accediendo a una posición</span>
                    </div>
                    <textarea id="code-mat-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">matriz = [
    ["A", "B"],
    ["C", "D"]
]

print("Toda la matriz:", matriz)
print("Fila 0:", matriz[0])
print("Elemento en [1][0] (Fila 1, Col 0):", matriz[1][0])</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-mat-1').value, 'output-mat-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ver Posiciones
                    </button>
                </div>
                <div id="output-mat-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `},
        {
            title: "Recorriendo Matrices",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Bucles Anidados</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Para procesar toda la matriz, necesitamos un bucle dentro de otro bucle.
                    </p>
                    
                    <div class="neon-box-dark p-6">
                        <pre class="text-sm text-gray-400">for fila in matriz:
    for elemento in fila:
        print(elemento)</pre>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-mat-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="10">tablero = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
]

print("Dibujando tablero:")
for fila in tablero:
    for celda in fila:
        if celda == 1:
            print("X", end=" ")
        else:
            print(".", end=" ")
    print() # Salto de línea al terminar la fila</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-mat-2').value, 'output-mat-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Dibujar Tablero
                    </button>
                </div>
                <div id="output-mat-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Visualización espacial...</p>
                </div>
            `}
    ]
});
