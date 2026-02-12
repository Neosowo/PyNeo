window.evaluations[24] = {
    id: 25,
    title: "EcoMine: Minería de Datos (2018)",
    difficulty: "máster",
    icon: "fa-gem",
    description: "Tema 2 Examen Mejora 2018. Análisis de texto y extracción de datos de minerales estratégicos.",
    timeLimit: 40,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Extracción de Minerales (40 pts)</h4>
                <p class="text-gray-300 mb-2">Un sistema de inteligencia empresarial analiza discursos para encontrar oportunidades.</p>
                <div class="bg-gray-800 p-2 rounded text-xs font-mono mb-2 text-gray-400">
                    discurso = "el presidente anuncio nuevas reservas de mral_litio en el sur y mral_cobre en el norte para exportar mas mral_oro"
                </div>
                <p class="text-gray-300 mb-2">Escribe un código que extraiga todas las palabras que empiecen con el prefijo <code class="text-neon-orange">'mral_'</code>.</p>
                <p class="text-gray-300 mb-2">Luego, elimina el prefijo para obtener solo el nombre del mineral (ej: 'litio', 'cobre').</p>
                <p class="text-gray-300 mb-2 font-bold">Guarda los nombres únicos en una lista llamada <code class="text-neon-green">minerales_encontrados</code> y ordénala alfabéticamente.</p>
            `,
            expectedOutput: "['cobre', 'litio', 'oro']",
            points: 100
        }
    ]
};
