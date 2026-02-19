window.evaluations[9] = {
    id: 10,
    title: "Proyecto Final: Ciudades",
    difficulty: "avanzado",
    icon: "fa-city",
    description: "Evaluación Final (Ayudantía 10): Diccionarios complejos, consultas y anidamiento.",
    timeLimit: 40,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Cargar Datos Simulado</h4>
                <p class="text-gray-300 mb-2">Simula la carga de un CSV a un diccionario.</p>
                <p class="text-gray-300 mb-2">Estructura deseada: <code class="text-neon-green">{"Ecuador": ["Guayaquil", "Quito"], "peru": ["Lima"]}</code>.</p>
                <p class="text-gray-300 mb-4">Crea este diccionario manualmente y asignalo a variable <code class="text-neon-green">paises</code>.</p>
                <p class="text-gray-300">Imprime el diccionario.</p>
            `,
            expectedOutput: "{'Ecuador': ['Guayaquil', 'Quito'], 'peru': ['Lima']}",
            points: 20
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Ciudad Aleatoria</h4>
                <p class="text-gray-300 mb-2">Importa <code class="text-neon-green">random</code>.</p>
                <p class="text-gray-300 mb-2">Define función <code class="text-neon-green">ciudadAleatoria(pais, dic)</code>.</p>
                <p class="text-gray-300 mb-4">Usa <code class="text-neon-green">random.choice(dic[pais])</code>.</p>
                <p class="text-gray-300 text-sm">Seed(42). Prueba con "Ecuador". Imprime resultado.</p>
            `,
            expectedOutput: "Quito", 
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Consultar País</h4>
                <p class="text-gray-300 mb-2">Dada una ciudad, encuentra a qué país pertenece.</p>
                <p class="text-gray-300 mb-2">Recorre claves y valores del diccionario.</p>
                <p class="text-gray-300 mb-4">Si ciudad está en la lista del país, retorna el país.</p>
                <p class="text-gray-300">Prueba buscar "Lima". Imprime el país encontrado.</p>
            `,
            expectedOutput: "peru",
            points: 25
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Agregar Ciudad</h4>
                <p class="text-gray-300 mb-2">Agrega "Cuenca" a la lista de "Ecuador".</p>
                <p class="text-gray-300 mb-4">Usa <code class="text-neon-green">.append()</code>.</p>
                <p class="text-gray-300">Imprime la lista de ciudades de Ecuador actualizada.</p>
            `,
            expectedOutput: "['Guayaquil', 'Quito', 'Cuenca']",
            points: 30
        }
    ]
};
