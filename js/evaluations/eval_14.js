window.evaluations[13] = {
    id: 14,
    title: "Turismo Ecuador (Matrices)",
    difficulty: "avanzado",
    icon: "fa-plane-departure",
    description: "Evaluación sobre Matrices Numpy (Ayudantía 12: Turismo).",
    timeLimit: 35,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Total Turistas</h4>
                <p class="text-gray-300 mb-2">Dada una matriz <code class="text-neon-green">M</code> de turistas por año (cols) y ciudad (filas).</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">total(M, col)</code> que sume toda la columna.</p>
                <p class="text-gray-300 mb-4">Prueba con [[10, 20], [30, 40]] y col 0 (año 2007).</p>
                <p class="text-gray-300">Imprime el total.</p>
            `,
            expectedOutput: "40",
            points: 25
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Promedio Sierra</h4>
                <p class="text-gray-300 mb-2">Las filas 0-1 son Costa, 2-3 son Sierra.</p>
                <p class="text-gray-300 mb-2">Calcula el promedio de las filas de la Sierra.</p>
            `,
            expectedOutput: "35.0", // (30+40)/2 si Sierra es abajo
            points: 30
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Años de Crecimiento</h4>
                <p class="text-gray-300 mb-2">Para una ciudad (fila específica), cuenta cuántos años el turismo creció respecto al anterior.</p>
            `,
            expectedOutput: "1",
            points: 40
        }
    ]
};
