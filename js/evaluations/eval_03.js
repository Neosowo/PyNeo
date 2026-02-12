window.evaluations[2] = {
    id: 3,
    title: "Bucles y Listas",
    difficulty: "intermedio",
    icon: "fa-list-ul",
    description: "Evaluación sobre bucles while, algoritmos con listas y validaciones de entrada.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Sumador de Números</h4>
                <p class="text-gray-300 mb-2">Pide números al usuario hasta que ingrese 0.</p>
                <p class="text-gray-300 mb-2">Usa <code class="text-neon-green">while</code> e <code class="text-neon-green">input()</code>.</p>
                <p class="text-gray-300 mb-4">Al final imprime la suma total: <code class="text-neon-green">"La sumatoria es X"</code>.</p>
                <p class="text-xs text-gray-500">Prompt: <code class="text-neon-green">Input 0 para salir: </code>. Prueba con 10, 20, 0.</p>
            `,
            expectedOutput: "Input 0 para salir: Input 0 para salir: Input 0 para salir: La sumatoria es 30",
            // Input 0... se repite 3 veces (10, 20, 0)
            points: 25
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Palíndromo Numérico</h4>
                <p class="text-gray-300 mb-2">Verifica si un número de varias cifras se lee igual al derecho y al revés.</p>
                <p class="text-gray-300 mb-2">Prompt: <code class="text-neon-green">"Numero: "</code>.</p>
                <p class="text-gray-300 mb-4 font-bold">Sin usar <code class="text-neon-green">reversed()</code>, usa un bucle for comparando índices.</p>
                <p class="text-gray-300">Salida: <code class="text-neon-green">"Es palindromo? True"</code></p>
                <p class="text-xs text-gray-500">Prueba con 12321.</p>
            `,
            expectedOutput: "Numero: Es palindromo? True",
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Promedio de Talleres (Avanzado)</h4>
                <p class="text-gray-300 mb-2">Pide al usuario cuántos talleres tiene (prompt: <code class="text-neon-green">"N: "</code>). Para el examen usa 3.</p>
                <p class="text-gray-300 mb-2">Luego pide las notas (prompt: <code class="text-neon-green">"Nota: "</code>).</p>
                <p class="text-gray-300 mb-4 font-bold">Elimina la nota más baja de la lista y calcula el promedio de las restantes.</p>
                <p class="text-gray-300">Salida final: <code class="text-neon-green">"Promedio: X.X"</code>. Notas: 10, 5, 8. (Elimina 5, promedio de 10 y 8 es 9.0)</p>
            `,
            expectedOutput: "N: Nota: Nota: Nota: Promedio: 9.0",
            points: 30
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Agregar Cantantes (Validación)</h4>
                <p class="text-gray-300 mb-2">Tienes una lista vacía <code class="text-neon-green">lista = []</code>.</p>
                <p class="text-gray-300 mb-2">Pide un nombre (prompt: <code class="text-neon-green">"Nombre: "</code>). Si ya existe en la lista, vuelve a pedir.</p>
                <p class="text-gray-300 mb-4">Hazlo 2 veces. Imprime la lista final.</p>
                <p class="text-xs text-gray-500">Prueba con "Ana", luego intenta "Ana" de nuevo (debe rechazarlo implícitamente, pero en test escribe "Ana", "Luis").</p>
            `,
            expectedOutput: "Nombre: Nombre: ['Ana', 'Luis']",
            points: 20
        }
    ]
};
