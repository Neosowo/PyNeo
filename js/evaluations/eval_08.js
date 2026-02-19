window.evaluations[7] = {
    id: 8,
    title: "Conjuntos y Tuplas",
    difficulty: "intermedio",
    icon: "fa-layer-group",
    description: "Evaluación basada en Ayudantía 9: Operaciones con conjuntos y tuplas.",
    timeLimit: 25,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Tupla Fecha</h4>
                <p class="text-gray-300 mb-2">Define función <code class="text-neon-green">fecha(d, m, a)</code>.</p>
                <p class="text-gray-300 mb-4">Retorna una tupla con los tres valores.</p>
                <p class="text-gray-300">Prueba con (25, 12, 2023) e imprime.</p>
            `,
            expectedOutput: "(25, 12, 2023)",
            points: 15
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Estudiantes en Ambos Cursos (Intersección)</h4>
                <p class="text-gray-300 mb-2">Dados los conjuntos: <code class="text-neon-green">alg = {"Ana", "Luis"}</code> y <code class="text-neon-green">calc = {"Luis", "Pepe"}</code>.</p>
                <p class="text-gray-300 mb-4">Encuentra la intersección (estudiantes en ambos) usando <code class="text-neon-green">&</code> o <code class="text-neon-green">intersection()</code>.</p>
                <p class="text-gray-300">Imprime el conjunto resultante.</p>
            `,
            expectedOutput: "{'Luis'}", 
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Sólo Álgebra (Diferencia)</h4>
                <p class="text-gray-300 mb-2">Usando los mismos conjuntos anteriores.</p>
                <p class="text-gray-300 mb-4">Encuentra quién está en Álgebra pero NO en Cálculo (<code class="text-neon-green">alg - calc</code>).</p>
                <p class="text-gray-300">Imprime el resultado.</p>
            `,
            expectedOutput: "{'Ana'}",
            points: 25
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Diferencia Simétrica</h4>
                <p class="text-gray-300 mb-2">Usando los mismos conjuntos.</p>
                <p class="text-gray-300 mb-4">Encuentra estudiantes que están en UNO de los dos cursos, pero NO en ambos (<code class="text-neon-green">^</code>).</p>
                <p class="text-gray-300">Imprime el conjunto resultante (orden no importa, validaré contenido).</p>
                <p class="text-xs text-gray-500">Debe ser {'Ana', 'Pepe'}.</p>
            `,
            expectedOutput: "{'Ana', 'Pepe'}", 
            points: 35
        }
    ]
};
