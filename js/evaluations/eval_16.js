window.evaluations[15] = {
    id: 16,
    title: "Parsing y Lógica (Mejoramiento)",
    difficulty: "intermedio",
    icon: "fa-code",
    description: "Ejercicios de Mejoramiento 2020: Manipulación de Strings complejos y lógica de juegos.",
    timeLimit: 25,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Parsing de Datos String</h4>
                <p class="text-gray-300 mb-2">Cadena A: <code class="text-neon-green">"Empresas,17,0|9|1,10|19|2"</code>.</p>
                <p class="text-gray-300 mb-2">Objetivo: Extraer los primeros números de cada bloque separado por pipes '|' después de la segunda coma.</p>
                <p class="text-gray-300 mb-4">Define <code class="text-neon-green">parse(A)</code>.</p>
                <p class="text-gray-300">Debe retornar lista [0, 10]. (Extrae el 0 de 0|9|1 y el 10 de 10|19|2).</p>
            `,
            expectedOutput: "[0, 10]",
            points: 50
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Puntaje Juego</h4>
                <p class="text-gray-300 mb-2">Diccionario <code class="text-neon-green">ptos = {"A": 10, "B": 5}</code>.</p>
                <p class="text-gray-300 mb-4">Calcula el puntaje de una palabra sumando sus letras. Si la letra no tiene puntaje, suma 0.</p>
                <p class="text-gray-300">Palabra "ABA" -> 10 + 5 + 10 = 25.</p>
            `,
            expectedOutput: "25",
            points: 50
        }
    ]
};
