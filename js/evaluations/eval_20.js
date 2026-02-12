window.evaluations[19] = {
    id: 20,
    title: "Twitter Trends (Sets)",
    difficulty: "avanzado",
    icon: "fa-hashtag",
    description: "Evaluación Examen 2016 Twitter: Operaciones de Conjuntos y Tendencias.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Tendencias Comunes</h4>
                <p class="text-gray-300 mb-2">Supón un diccionario de tendencias diarias: <code class="text-neon-green">d = {"Lun": {"#A", "#B"}, "Mar": {"#B", "#C"}}</code> (Sets).</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">comunes(d, f1, f2)</code> que retorne la <strong>Intersección</strong> (&).</p>
                <p class="text-gray-300 mb-4">Prueba con "Lun" y "Mar".</p>
                <p class="text-gray-300">Imprime el set resultante.</p>
            `,
            expectedOutput: "{'#B'}",
            points: 40
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Tendencias Excluyentes</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">excluyentes(d, f1, f2)</code> que retorne la <strong>Diferencia Simétrica</strong> (^).</p>
                <p class="text-gray-300 mb-2">Son hashtags que aparecen en UNO de los días pero NO en ambos.</p>
                <p class="text-gray-300">Imprime el set resultante de "Lun" y "Mar" ({'#A', '#C'}).</p>
            `,
            expectedOutput: "{'#A', '#C'}",
            points: 60
        }
    ]
};
