window.evaluations[4] = {
    id: 5,
    title: "Funciones Avanzadas",
    difficulty: "avanzado",
    icon: "fa-project-diagram",
    description: "Evaluación sobre funciones recursivas, argumentos variables e histogramas.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Factorial Recursivo</h4>
                <p class="text-gray-300 mb-2">Define una función recursiva <code class="text-neon-green">factorial1(n)</code>.</p>
                <p class="text-gray-300 mb-2">Caso base: n==1 retorna 1.</p>
                <p class="text-gray-300 mb-4">Caso recursivo: n * factorial(n-1).</p>
                <p class="text-gray-300">Prueba con 5 e imprime.</p>
            `,
            expectedOutput: "120",
            points: 25
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Histograma</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">histograma(lista)</code> que reciba números.</p>
                <p class="text-gray-300 mb-2">Pide un caracter (prompt: <code class="text-neon-green">"Char: "</code>). Si length != 1, repite.</p>
                <p class="text-gray-300 mb-4">Imprime el caracter multiplicado por cada número de la lista.</p>
                <p class="text-gray-300">Prueba con lista <code class="text-neon-green">[4, 2]</code> y char '*'.</p>
            `,
            expectedOutput: "Char: ****\n**",
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Max Min Mean (Args)</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">Max_Min_Mean(*numeros)</code> con argumentos variables.</p>
                <p class="text-gray-300 mb-4">Retorna maximo, minimo y promedio en una tupla.</p>
                <p class="text-gray-300">Prueba con (10, 20, 30) e imprime la tupla retornada.</p>
            `,
            expectedOutput: "(30, 10, 20.0)",
            points: 25
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Comprobar Raíz > 10</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">calcularRaiz(n)</code> -> n**0.5.</p>
                <p class="text-gray-300 mb-4">Define <code class="text-neon-green">comprobar(lista)</code> que itere y use la función anterior.</p>
                <p class="text-gray-300">Si raiz > 10 imprime "Mayor", si no "Menor". Prueba con [100, 144].</p>
                <p class="text-xs text-gray-500">Output exacto: "Menor\nMayor" (Raiz de 100 es 10 (no mayor), 144 es 12 (mayor)).</p>
            `,
            expectedOutput: "Menor\nMayor", 
            points: 25
        }
    ]
};
