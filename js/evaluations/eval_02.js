window.evaluations[1] = {
    id: 2,
    title: "Lógica y Condicionales",
    difficulty: "principiante",
    icon: "fa-project-diagram",
    description: "Ejercicios reales de Ayudantía 2: Hora, Penaltis y Descuentos.",
    timeLimit: 25,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Formato de Hora (AM/PM)</h4>
                <p class="text-gray-300 mb-2">Solicita una hora en formato HH:MM (ej: 14:30).</p>
                <p class="text-gray-300 mb-2">Extrae la hora y determina si es AM (menor a 12) o PM.</p>
                <p class="text-gray-400 text-sm mb-4">Prompt: <code class="text-neon-green">"Hora (HH:MM): "</code></p>
                <p class="text-gray-300">Salida esperada para 14:30: <code class="text-neon-green">"ES P.M"</code></p>
                <p class="text-xs text-gray-500">Nota: Asume formato de 24 horas correcto.</p>
            `,
            expectedOutput: "Hora (HH:MM): 14:30\nES P.M",
            points: 20
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Supermercado Descuento</h4>
                <p class="text-gray-300 mb-2">Calcula el total a pagar por "Galletas Oreo" (precio $0.90).</p>
                <ul class="list-disc list-inside text-gray-400 mb-2 text-sm">
                    <li>Si compra &lt; 36: 10% descuento.</li>
                    <li>Si compra &gt;= 36: 15% descuento y 1 obsequio por cada docena.</li>
                </ul>
                <p class="text-gray-300 text-sm">Entrada: 40 unidades.</p>
                <p class="text-gray-300">Imprime: <code class="text-neon-green">"Total: 30.60"</code> y <code class="text-neon-green">"Obsequio 3 productos"</code></p>
                <p class="text-xs text-gray-500">Prompt: <code class="text-neon-green">"Cantidad: "</code></p>
            `,
            expectedOutput: "Cantidad: 40\nTotal: 30.60\nObsequio 3 productos",
            points: 30
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Juego del Penalti (Determinístico)</h4>
                <p class="text-gray-300 mb-2">Simula un penalti. El usuario elige zona [1-6].</p>
                <p class="text-gray-300 mb-2">IMPORTANTE: Usa <code class="text-neon-green">import random</code> y <code class="text-neon-green">random.seed(42)</code> al inicio para que el resultado sea igual al esperado.</p>
                <p class="text-gray-300 mb-2">El portero elige zona random (1-6). Si coinciden: "NO ES GOL", sino "ES GOL".</p>
                <p class="text-xs text-gray-500">Si usas seed(42), el portero elegirá 6 (usando randint) o 1 (usando randrange). Usa randint(1,6).</p>
                <p class="text-gray-300">Prompt: <code class="text-neon-green">"Zona: "</code>.  Prueba con Zona 1.</p>
            `,
            expectedOutput: "Zona: 1\nEL PORTERO SE LANZO A 6\nES GOL\nPor derecha",




            points: 25
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Rangos Pares</h4>
                <p class="text-gray-300 mb-2">Imprime los números pares del 0 al 10 (inclusive) usando <code class="text-neon-green">range()</code>.</p>
                <p class="text-gray-300">Uno debajo de otro.</p>
            `,
            expectedOutput: "0\n2\n4\n6\n8\n10",
            points: 25
        }
    ]
};
