window.evaluations[6] = {
    id: 7,
    title: "Matrices (Multas)",
    difficulty: "avanzado",
    icon: "fa-th",
    description: "Evaluación sobre manejo de matrices (listas anidadas): Proyecto Multas.",
    timeLimit: 35,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Crear Matriz 5x5 (Ceros)</h4>
                <p class="text-gray-300 mb-2">Crea una matriz 5x5 llena de ceros usando list comprehension o bucles anidados.</p>
                <p class="text-gray-300 mb-4">Llamala <code class="text-neon-green">matriz</code>.</p>
                <p class="text-gray-300">Imprime el valor en <code class="text-neon-green">matriz[4][4]</code>.</p>
            `,
            expectedOutput: "0",
            points: 15
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Cargar Multas</h4>
                <p class="text-gray-300 mb-2">Dada <code class="text-neon-green">listaMultas = [[0, 0, 100], [4, 4, 50]]</code>.</p>
                <p class="text-gray-300 mb-2">Cada sublista es [fila, columna, valor].</p>
                <p class="text-gray-300 mb-4">Recorre e incrementa la matriz 5x5 en esas posiciones.</p>
                <p class="text-gray-300">Imprime la suma total de todas las multas en la matriz.</p>
            `,
            expectedOutput: "150",
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Sumar Sector Norte</h4>
                <p class="text-gray-300 mb-2">Para una matriz 5x5 dada (o creada anteriormente con multas), el Sector Norte es toda la fila 0.</p>
                <p class="text-gray-300 mb-2">Suma todos los elementos de la fila 0.</p>
                <p class="text-gray-300">Imprime el total del Norte.</p>
                <p class="text-xs text-gray-500">Nota: Si usaste los datos anteriores ([0,0,100]), la fila 0 tiene 100.</p>
            `,
            expectedOutput: "100",
            points: 20
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Sector Centro</h4>
                <p class="text-gray-300 mb-2">El Centro es el cuadrado interno de 3x3 (filas 1 a 3, cols 1 a 3).</p>
                <p class="text-gray-300 mb-4">Suma los elementos en ese rango usando slicing o bucles.</p>
                <p class="text-gray-300">Para una matriz de unos (llena de 1s), el centro suma 9. Hazlo con la matriz de multas anterior (sin multas alli, suma 0).</p>
            `,
            expectedOutput: "0",
            points: 30
        }
    ]
};
