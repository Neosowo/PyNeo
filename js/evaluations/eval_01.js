window.evaluations[0] = {
    id: 1,
    title: "Validaciones Básicas",
    difficulty: "principiante",
    icon: "fa-check-double",
    description: "Ejercicios reales de Ayudantía 1: Cédula, Correo y Conversiones.",
    timeLimit: 20,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Validar Cédula (Lógica Booleana)</h4>
                <p class="text-gray-300 mb-2">Escribe un programa que solicite una cédula y valide si cumple TODAS estas condiciones:</p>
                <ul class="list-disc list-inside text-gray-400 mb-4 text-sm">
                    <li>Solo números (no letras).</li>
                    <li>Longitud exacta de 10 dígitos.</li>
                    <li>Empieza con "09".</li>
                </ul>
                <p class="text-gray-300 mb-2 font-bold">Requerimientos:</p>
                <p class="text-gray-400 text-sm mb-4">Usa el prompt: <code class="text-neon-green">"Ingrese su cedula: "</code> y al final imprime: <code class="text-neon-green">"Cedula valida? True"</code> (o False).</p>
                <p class="text-xs text-gray-500">Ejemplo de entrada válida para probar: 0928219281</p>
            `,
            expectedOutput: "Ingrese su cedula: Cedula valida? True",
            // Nota: El output incluirá el prompt y el input del usuario simulado si uso inputfun.
            // Para simplificar la validación auto, me centraré en la última línea o palabra clave.
            points: 25
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Conversión Fahrenheit</h4>
                <p class="text-gray-300 mb-2">Solicita una temperatura en grados Fahrenheit (entero) y conviértela a Celsius.</p>
                <p class="text-gray-400 text-sm mb-4">Fórmula: <code class="text-neon-green">C = (F - 32) * 5/9</code></p>
                <p class="text-gray-300 mb-2">Usa el prompt: <code class="text-neon-green">"Ingrese F: "</code></p>
                <p class="text-gray-300">Imprime el formato exacto: <code class="text-neon-green">"X grados F son Y grados C"</code></p>
                <p class="text-xs text-gray-500">Prueba con 78 (debe dar aprox 25)</p>
            `,
            expectedOutput: "Ingrese F: 78 grados F son 25 grados C", // Aceptaré variaciones decimales en el validador visual
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Convertidor de Segundos</h4>
                <p class="text-gray-300 mb-2">Solicita una cantidad de segundos (entero) y conviértelo a Horas, Minutos y Segundos.</p>
                <p class="text-gray-400 text-sm mb-4">Prompt: <code class="text-neon-green">"Segundos: "</code></p>
                <p class="text-gray-300">Salida exacta: <code class="text-neon-green">"X seg son H hora(s), M minuto(s), S segundo(s)"</code></p>
                <p class="text-xs text-gray-500">Prueba con 3661 (1h, 1m, 1s)</p>
            `,
            expectedOutput: "Segundos: 3661 seg son 1 hora(s), 1 minuto(s), 1 segundo(s)",
            points: 25
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Validar Correo ESPOL</h4>
                <p class="text-gray-300 mb-2">Valida si un correo es institucional:</p>
                <ul class="list-disc list-inside text-gray-400 mb-2 text-sm">
                    <li>Termina en "espol.edu.ec".</li>
                    <li>Tiene exactamente una "@".</li>
                    <li>Empieza con letra.</li>
                    <li>El usuario no es "espol".</li>
                </ul>
                <p class="text-gray-300">Prompt: <code class="text-neon-green">"Correo: "</code>. Imprime <code class="text-neon-green">"Valido? True"</code></p>
            `,
            expectedOutput: "Correo: Valido? True",
            points: 25
        }
    ]
};
