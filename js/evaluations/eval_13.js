window.evaluations[12] = {
    id: 13,
    title: "Especies Peligro (Examen 2019)",
    difficulty: "avanzado",
    icon: "fa-paw",
    description: "Evaluación sobre Diccionarios Anidados (Ayudantía 12: Especies).",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. País Más Popular por Especie</h4>
                <p class="text-gray-300 mb-2">Diccionario: <code class="text-neon-green">d = {"Tigre": [("India", 100), ("Nepal", 50)]}</code>.</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">masPopular(d, esp)</code> que retorne el país con más ejemplares.</p>
                <p class="text-gray-300">Prueba con "Tigre".</p>
            `,
            expectedOutput: "India",
            points: 40
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Lista de Países por Especie</h4>
                <p class="text-gray-300 mb-2">Invierte la lógica: Retorna un diccionario donde la clave sea el país y el valor una lista de especies.</p>
                <p class="text-gray-300 mb-4">Define <code class="text-neon-green">pais_especie(d)</code>.</p>
                <p class="text-gray-300">Prueba con: <code class="text-neon-green">{"Tigre": [("India", 100)]}</code> -> {"India": ["Tigre"]}.</p>
            `,
            expectedOutput: "{'India': ['Tigre']}",
            points: 60
        }
    ]
};
