window.evaluations[11] = {
    id: 12,
    title: "Huracanes (Examen 2017)",
    difficulty: "avanzado",
    icon: "fa-wind",
    description: "Evaluación sobre Matrices y Diccionarios (Ayudantía 11: Huracanes).",
    timeLimit: 35,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Total Marejada (Matriz)</h4>
                <p class="text-gray-300 mb-2">Supón una matriz <code class="text-neon-green">M = [[A1, K1], [A2, K2]]</code>.</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">total_marejada(M, cat)</code>.</p>
                <p class="text-gray-300 mb-4">Si cat=1, filtra valores < 100 de M[0] y suma sus valores correspondientes en M[1].</p>
                <p class="text-gray-300">Prueba con [[50, 200], [10, 20]] y cat=1. Debe sumar 10.</p>
            `,
            expectedOutput: "10",
            points: 40
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Velocidad Superior</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">velocidad_superior(ListaH, anio)</code>.</p>
                <p class="text-gray-300 mb-2">La lista tiene tuplas (anio, nombre, velocidad).</p>
                <p class="text-gray-300 mb-2">Filtra por anio, calcula promedio de velocidad y cuenta cuántos superan ese promedio.</p>
                <p class="text-gray-300">Prueba con [(2017, "Irma", 250), (2017, "Katia", 150)]. Promedio=200. >200 es 1 (Irma).</p>
            `,
            expectedOutput: "1",
            points: 60
        }
    ]
};
