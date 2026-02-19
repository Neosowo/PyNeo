window.evaluations.push({
    id: 999, // ID especial para que esté al final o filtrado
    title: "Protocolo Ghost",
    difficulty: "oculto",
    icon: "fa-user-secret",
    description: "Acceso autorizado nivel 5. Retos de lógica avanzada y criptografía básica.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. El Cifrado César (Criptografía)</h4>
                <p class="text-gray-300 mb-2">Implementa una función que descifre un mensaje. El cifrado rota cada letra 3 posiciones hacia atrás en el alfabeto.</p>
                <p class="text-gray-400 text-sm mb-4">Ejemplo: 'D' -> 'A', 'E' -> 'B'.</p>
                <p class="text-gray-300 mb-2 font-bold">Requerimientos:</p>
                <ul class="list-disc list-inside text-gray-400 mb-4 text-sm">
                    <li>La entrada es una cadena en MAYÚSCULAS.</li>
                    <li>Solo debes rotar letras (A-Z). Ignora espacios y símbolos.</li>
                    <li>Usa el prompt: <code class="text-neon-green">"Mensaje: "</code></li>
                </ul>
                <p class="text-xs text-gray-500">Prueba con "KROD PXQGR" (debe dar "HOLA MUNDO")</p>
            `,
            expectedOutput: "Mensaje: HOLA MUNDO",
            points: 50
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Números Primos Gemelos</h4>
                <p class="text-gray-300 mb-2">Encuentra si un número N y N+2 son ambos primos (primos gemelos).</p>
                <p class="text-gray-300 mb-2">Usa el prompt: <code class="text-neon-green">"Numero: "</code></p>
                <p class="text-gray-300">Si son gemelos, imprime: <code class="text-neon-green">"Es gemelo"</code>. Si no, <code class="text-red-400">"No es gemelo"</code>.</p>
                <p class="text-xs text-gray-500">Ejemplo: 11 (11 y 13 son primos -> Es gemelo). 10 (No es gemelo).</p>
            `,
            expectedOutput: "Numero: Es gemelo",
            points: 50
        }
    ]
});
