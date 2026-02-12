window.evaluations[14] = {
    id: 15,
    title: "Producción Agrícola (Mejoramiento)",
    difficulty: "avanzado",
    icon: "fa-seedling",
    description: "Evaluación Mejoramiento 2019: Análisis de cosechas mensuales.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Mes Más Rentable</h4>
                <p class="text-gray-300 mb-2">Matriz <code class="text-neon-green">M</code> de Productos x Meses (12 cols).</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">mesMasRentable(M)</code>.</p>
                <p class="text-gray-300 mb-4">Suma las columnas (meses) y retorna el índice del mes con mayor producción. (Usar Numpy argmax o manual).</p>
                <p class="text-gray-300">Prueba con [[10, 20], [5, 40]] (2 meses). Col 0=15, col 1=60. Debe retornar 1 (o "FEB").</p>
            `,
            expectedOutput: "1",
            points: 40
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Mejor Trimestre</h4>
                <p class="text-gray-300 mb-2">Divide el año en trimestres (T1=0-2, T2=3-5, T3=6-8, T4=9-11).</p>
                <p class="text-gray-300 mb-2">Para UN producto (fila específica), suma y di cuál trimestre fue mejor.</p>
                <p class="text-gray-300 mb-4">Define <code class="text-neon-green">mejorTrimestre(Prod)</code>.</p>
                <p class="text-gray-300">Prueba con fila de 12 elementos (todo ceros excepto T2 que tiene 100).</p>
            `,
            expectedOutput: "2", // T2
            points: 60
        }
    ]
};
