window.evaluations[16] = {
    id: 17,
    title: "Gestión Archivos (Proyecto)",
    difficulty: "avanzado",
    icon: "fa-folder-open",
    description: "Evaluación Mejoramiento 2020: Carga y escritura de datos múltiples.",
    timeLimit: 35,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Cargar Matriz Cosechas</h4>
                <p class="text-gray-300 mb-2">Simula carga de archivo texto: <code class="text-neon-green">Prod,Mes,Cant\\\\nA,Ene,100\\\\nB,Ene,50\\\\nA,Feb,60</code>.</p>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">cargar(texto)</code> que sume las cantidades por producto y mes en una Matriz o Diccionario.</p>
                <p class="text-gray-300 mb-4">Retorna el total de A en Ene (100) y Feb (60) = 160.</p>
            `,
            expectedOutput: "160",
            points: 50
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Generar Reporte txt</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">generar_reporte(dic, cat)</code>.</p>
                <p class="text-gray-300 mb-2">Debe crear un string formateado csv: <code class="text-neon-green">"Prod,Cant\\\\nA,100\\\\nB,50"</code>.</p>
                <p class="text-gray-300 mb-4">Solo retorna el string simulando el contenido del archivo.</p>
                <p class="text-gray-300">Prueba con ` + '`dic={"A":100, "B":50}`' + `.</p>
            `,
            expectedOutput: "Prod,Cant\nA,100\nB,50",
            points: 50
        }
    ]
};
