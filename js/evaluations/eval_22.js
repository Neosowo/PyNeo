window.evaluations[21] = {
    id: 22,
    title: "Examen 2025: Análisis de Texto",
    difficulty: "avanzado",
    icon: "fa-font",
    description: "Tema 1 del Examen de Mejoramiento 2025-1S: Manipulación avanzada de cadenas y aleatoriedad.",
    timeLimit: 40,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Procesamiento de Texto (25 pts)</h4>
                <p class="text-gray-300 mb-2">Dada la variable <code class="text-neon-green">mensaje</code> (ya definida en el entorno), realiza:</p>
                <ol class="list-decimal list-inside text-gray-400 text-sm space-y-1 mb-4">
                    <li>Elimina los signos de puntuación: <code class="bg-gray-800 px-1">. , ;</code></li>
                    <li>Convierte todo a minúsculas.</li>
                    <li>Obtén una lista de palabras únicas.</li>
                    <li>Selecciona <strong>20 palabras distintas al azar</strong>. (IMPORTANTE: Usa <code class="text-neon-green">random.seed(42)</code> antes de seleccionar para que coincida la respuesta).</li>
                    <li>Ordena la lista alfabéticamente.</li>
                    <li>Asegúrate que la <strong>primera palabra</strong> tenga al menos 8 caracteres. Si no, rellena con <code class="text-neon-green">'-'</code> al final hasta completar 8.</li>
                    <li>Convierte a MAYÚSCULAS las palabras en posiciones impares (índices 1, 3, 5...).</li>
                    <li>Une todo en una sola cadena separada por espacios e imprímela.</li>
                </ol>
                <p class="text-xs text-gray-500 mt-2">Nota: Para eliminar puntuación usa <code class="text-neon-green">replace</code> o <code class="text-neon-green">strip</code>. Usa <code class="text-neon-green">import random</code>.</p>
                <div class="bg-gray-800 p-2 rounded text-xs font-mono mb-2">
                    mensaje = "Las redes sociales son el epicentro de la vida digital para los jóvenes, conectándolos con amigos, tendencias y causas globales. Plataformas como TikTok e Instagram no solo ofrecen entretenimiento, sino que también moldean identidades y opiniones, desde la moda hasta el activismo."
                </div>
            `,
            expectedOutput: "ACTIVISMO amigos CAUSAS como CONECTÁNDOLOS de DESDE digital EL entretenimiento EPICENTRO globales HASTA identidades INSTAGRAM jóvenes LA las MODA moldean",
            
            
            
            
            
            
            
            
            points: 100
        }
    ]
};
