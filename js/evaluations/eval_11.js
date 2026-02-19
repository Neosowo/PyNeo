window.evaluations[10] = {
    id: 11,
    title: "Análisis COVID (Ayudantía 11)",
    difficulty: "avanzado",
    icon: "fa-virus",
    description: "Evaluación sobre diccionarios anidados: Datos reales de contagios en Ecuador.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Consultar por Fecha</h4>
                <p class="text-gray-300 mb-2">Supón un diccionario <code class="text-neon-green">d = {"2020-01-22": {"total": {"contagiados": 10}}}</code>.</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">consultar(dic, fecha)</code> que retorne los contagios totales de esa fecha.</p>
                <p class="text-gray-300 mb-4">Si la fecha no existe, intenta manejar el error (o asume que existe).</p>
                <p class="text-gray-300">Prueba con dic <code class="text-neon-green">{"2020": {"total": {"contagiados": 5}}}</code> y fecha "2020".</p>
            `,
            expectedOutput: "5",
            points: 25
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Día con Más Contagios</h4>
                <p class="text-gray-300 mb-2">El diccionario tiene clave "diario" -> "contagiados".</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">maxContagios(dic)</code>.</p>
                <p class="text-gray-300 mb-4">Itera sobre las fechas y encuentra la fecha con mayor número de contagios diarios.</p>
                <p class="text-gray-300">Retorna la fecha. Prueba con: <code class="text-neon-green">{"A": {"diario": {"contagiados": 10}}, "B": {"diario": {"contagiados": 20}}}</code> -> "B".</p>
            `,
            expectedOutput: "B",
            points: 35
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Total Recuperados</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">totalRecuperados(dic)</code>.</p>
                <p class="text-gray-300 mb-4">Suma todos los "recuperados" DIARIOS de todas las fechas.</p>
                <p class="text-gray-300">Estructura: dic[fecha]["diario"]["recuperados"]. Prueba con datos simples.</p>
            `,
            expectedOutput: "30", 
            points: 40
        }
    ]
};
