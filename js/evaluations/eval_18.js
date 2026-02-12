window.evaluations[17] = {
    id: 18,
    title: "Geografía 2021",
    difficulty: "intermedio",
    icon: "fa-globe-americas",
    description: "Evaluación FP2021: Diccionarios de 3 niveles y aleatoriedad.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Ciudad Aleatoria</h4>
                <p class="text-gray-300 mb-2">Supón un diccionario de Países->Provincias->Ciudades.</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">random_city(d, pais)</code>.</p>
                <p class="text-gray-300 mb-4">Usa <code class="text-neon-green">random.choice</code> doble (primero elige provincia random, luego ciudad random).</p>
                <p class="text-gray-300">Seed(42). Datos: <code class="text-neon-green">d = {"Ecuador": {"Guayas": ["Gye"], "Manabi": ["Manta"]}}</code>.</p>
            `,
            expectedOutput: "Gye", // Check seed stability o valida con includes.
            points: 50
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Agregar Ciudad Nueva</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">agregar(d, pais, prov, ciudad)</code>.</p>
                <p class="text-gray-300 mb-4">Si no existe país, créalo. Si no existe prov, créala. Agrega ciudad a la lista.</p>
                <p class="text-gray-300 mb-2">Prueba agregando "Cuenca" a "Azuay" en "Ecuador".</p>
                <p class="text-gray-300">Imprime el diccionario final.</p>
            `,
            expectedOutput: "{'Ecuador': {'Guayas': ['Gye'], 'Manabi': ['Manta'], 'Azuay': ['Cuenca']}}",
            points: 50
        }
    ]
};
