window.evaluations[23] = {
    id: 24,
    title: "Agricultura 2.0: Drones (2016)",
    difficulty: "intermedio",
    icon: "fa-helicopter",
    description: "Tema 2 Examen Mejora 2016. Análisis de matrices de cultivos usando drones simulados.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Densidad de Cultivos (30 pts)</h4>
                <p class="text-gray-300 mb-2">Una empresa usa drones para sensar cultivos en una matriz MxN.</p>
                <p class="text-gray-300 mb-2">Se te da una matriz <code class="bg-gray-800 px-1">plantacion</code> con números enteros (cantidad de cultivos por celda) y un entero <code class="bg-gray-800 px-1">limite</code>.</p>
                <p class="text-gray-300 mb-2">Implementa la función <code class="text-neon-green">analizarDensidad(plantacion, limite)</code> que retorne una NUEVA matriz donde:</p>
                <ul class="list-disc list-inside text-gray-400 text-sm mb-4">
                    <li>Si la celda tiene menos de <code class="bg-gray-800 px-1">limite</code> cultivos -> poner <code class="text-yellow-300">'BAJO'</code>.</li>
                    <li>Caso contrario -> poner <code class="text-green-400">'ALTO'</code>.</li>
                </ul>
                <p class="text-xs text-gray-500 font-mono bg-gray-900 p-2 rounded">
                    plantacion = [[5, 3], [1, 8]]
                    limite = 4
                    # Retorna: [['ALTO', 'BAJO'], ['BAJO', 'ALTO']]
                </p>
            `,
            expectedOutput: "[['ALTO', 'BAJO'], ['BAJO', 'ALTO']]",
            points: 50
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Promedio por Surcos (30 pts)</h4>
                <p class="text-gray-300 mb-2">Implementa la función <code class="text-neon-green">promedioSurcos(plantacion)</code>.</p>
                <p class="text-gray-300 mb-2">Retorna una lista con el promedio de cultivos de cada fila (surco).</p>
                <p class="text-xs text-gray-500 font-mono bg-gray-900 p-2 rounded">
                    plantacion = [[5, 3], [1, 8]]
                    # Fila 0: (5+3)/2 = 4.0
                    # Fila 1: (1+8)/2 = 4.5
                    # Retorna: [4.0, 4.5]
                </p>
            `,
            expectedOutput: "[4.0, 4.5]",
            points: 50
        }
    ]
};
