window.evaluations[18] = {
    id: 19,
    title: "Análisis Alcohol (Numpy/Listas)",
    difficulty: "intermedio",
    icon: "fa-beer",
    description: "Evaluación FP2021: Listas masivas de datos alcohol.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Parsing Inicial (Listas Paralelas)</h4>
                <p class="text-gray-300 mb-2">Supón string: <code class="text-neon-green">"Ecu,Per,Col"</code> y <code class="text-neon-green">"10,20,30"</code>.</p>
                <p class="text-gray-300 mb-2">Convierte a lista de string e int respectivamente.</p>
                <p class="text-gray-300">Imprime el tercer valor entero (30).</p>
            `,
            expectedOutput: "30",
            points: 40
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Consultar Consumo</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">consultar(dic_consumo, pais)</code>.</p>
                <p class="text-gray-300 mb-2">Retorna el valor de consumo de un país normalizando el nombre (uppercase o title).</p>
                <p class="text-gray-300">Prueba buscar "ecuador" en {"Ecuador": 10}. Imprime valor.</p>
            `,
            expectedOutput: "10",
            points: 60
        }
    ]
};
