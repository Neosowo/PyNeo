window.evaluations[25] = {
    id: 26,
    title: "Ecosistema Ártico (2018)",
    difficulty: "experto",
    icon: "fa-snowflake",
    description: "Tema 2 Examen 2Par 2018. Lógica de cuadrantes y análisis ambiental en matrices.",
    timeLimit: 50,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Cuadrantes Glaciares (50 pts)</h4>
                <p class="text-gray-300 mb-2">Una matriz de hielo <code class="bg-gray-800 px-1">mHielo</code> de tamaño 4x4 tiene valores <code class="text-neon-cyan">1</code> (hielo) y <code class="text-gray-500">0</code> (agua).</p>
                <div class="bg-gray-800 p-2 rounded text-xs font-mono mb-2">
                    mHielo = [
                        [1, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 1, 1],
                        [0, 0, 1, 1]
                    ]
                </div>
                <p class="text-gray-300 mb-2">Implementa una función <code class="text-neon-green">densidadCuadrantes(m)</code> que divida la matriz en 4 cuadrantes de 2x2:</p>
                <ul class="list-disc list-inside text-gray-400 text-sm mb-2">
                    <li>Q1: Arriba-Izquierda</li>
                    <li>Q2: Arriba-Derecha</li>
                    <li>Q3: Abajo-Izquierda</li>
                    <li>Q4: Abajo-Derecha</li>
                </ul>
                <p class="text-gray-300 mb-2">Y retorne una lista con la SUMA de '1's en cada cuadrante: <code>[SumaQ1, SumaQ2, SumaQ3, SumaQ4]</code>.</p>
                <p class="text-xs text-gray-500">Pista: Puedes usar slicing <code class="text-neon-green">m[0:2][0:2]</code> con cuidado o bucles anidados.</p>
            `,
            expectedOutput: "[4, 0, 0, 4]",
            points: 100
        }
    ]
};
