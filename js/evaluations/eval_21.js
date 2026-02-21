window.evaluations[20] = {
    id: 21,
    title: "Economía y Finanzas (Bonus)",
    difficulty: "principiante",
    icon: "fa-coins",
    description: "Evaluación Bonus (FP2021-1): Cálculos financieros, conversión de divisas e interés compuesto.",
    timeLimit: 25,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Conversor Euro-Dólar</h4>
                <p class="text-gray-300 mb-2">Solicita una cantidad en Euros (float).</p>
                <p class="text-gray-300 mb-2">Tasa de cambio: 1 Euro = 1.13 Dólares (o usa tasa inversa: Dolar = Euro / 0.885).</p>
                <p class="text-gray-300 mb-4 font-bold">Usa la fórmula: <code class="text-neon-green">dolares = euros / 0.885</code>.</p>
                <p class="text-gray-300">Imprime: <code class="text-neon-green">"X euros son Y dolares"</code> (redondeado a 2 decimales).</p>
                <p class="text-xs text-gray-500">Prompt: "Euros: ". Prueba con 100.</p>
            `,
            expectedOutput: "Euros: 100\n100.00 euros son 112.99 dolares",
            points: 30
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Interés Compuesto</h4>
                <p class="text-gray-300 mb-2">Calcula el capital final.</p>
                <p class="text-gray-300 mb-2">Entradas: Inversión (P), Tasa Interés % (r), Años (t).</p>
                <p class="text-gray-400 text-sm mb-4">Fórmula: <code class="text-neon-green">CF = P * (1 + r/100) ** t</code>.</p>
                <p class="text-gray-300">Entrada prueba: P=1000, r=5, t=10. Imprime "Capital Final: X".</p>
            `,
            expectedOutput: "Capital Final: 1628.894626777442",
            points: 35
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Cambio de Compra</h4>
                <p class="text-gray-300 mb-2">Cliente paga con 40 dolares. Producto cuesta 41.27 euros.</p>
                <p class="text-gray-300 mb-2">Tasa: 1 Dolar = 0.72 Euros ? No, el ejercicio dice: <code class="text-neon-green">tasaCambio = 0.72</code> (Euro/Dolar? No especifica, pero logicamente convertimos producto a dolares).</p>
                <p class="text-gray-300 mb-4">Convierte precio producto a dolares: <code class="text-neon-green">precio_dolar = precio_euro * tasa</code> (o diviendo? El ejercicio original multiplica: <code class="text-neon-green">valorProductoDC * tasaCambio</code>). Hazlo igual.</p>
                <p class="text-gray-300">Calcula el cambio: <code class="text-neon-green">pago - costo_convertido</code>. Imprime con 2 decimales.</p>
                <p class="text-xs text-gray-500">40 - (41.27 * 0.72) = 40 - 29.7144 = 10.28.</p>
            `,
            expectedOutput: "10.29",
            points: 35
        }
    ]
};
