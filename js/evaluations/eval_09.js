window.evaluations[8] = {
    id: 9,
    title: "Diccionarios (Estudiantes)",
    difficulty: "intermedio",
    icon: "fa-book-open",
    description: "Evaluación sobre gestión de estudiantes con diccionarios (Ayudantía 10).",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Crear Diccionario Estudiante</h4>
                <p class="text-gray-300 mb-2">Crea un diccionario <code class="text-neon-green">alumno</code> con:</p>
                <ul class="list-disc list-inside text-gray-400 mb-2 text-sm">
                    <li>Nombre: "Leo"</li>
                    <li>Edad: 20</li>
                    <li>Materias: ["Mat", "Fis"] (Tupla o Lista)</li>
                </ul>
                <p class="text-gray-300">Imprime el diccionario.</p>
            `,
            expectedOutput: "{'Nombre': 'Leo', 'Edad': 20, 'Materias': ['Mat', 'Fis']}", 
            points: 20
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Actualizar Edad</h4>
                <p class="text-gray-300 mb-2">Usando el diccionario anterior, suma 1 a la edad.</p>
                <p class="text-gray-300 mb-4">Imprime la nueva edad.</p>
                <p class="text-xs text-gray-500">Debe ser 21.</p>
            `,
            expectedOutput: "21",
            points: 20
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Consultar Nota</h4>
                <p class="text-gray-300 mb-2">Supón que tienes <code class="text-neon-green">d = {"Mat": 80, "Fis": 50}</code>.</p>
                <p class="text-gray-300 mb-2">Define función <code class="text-neon-green">consultar(dic, mat)</code> que devuelva la nota.</p>
                <p class="text-gray-300 mb-4">Si la materia no está, devuelve "No existe".</p>
                <p class="text-gray-300">Prueba con "Bio" e imprime resultado.</p>
            `,
            expectedOutput: "No existe",
            points: 30
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Recomendaciones</h4>
                <p class="text-gray-300 mb-2">Si nota < 60 -> "Bad". Si >= 60 -> "Good".</p>
                <p class="text-gray-300 mb-2">Itera sobre <code class="text-neon-green">n = [80, 50]</code>.</p>
                <p class="text-gray-300 mb-4">Genera una lista de mensajes y muestra la lista.</p>
                <p class="text-gray-300">Output esperado: <code class="text-neon-green">['Good', 'Bad']</code>.</p>
            `,
            expectedOutput: "['Good', 'Bad']",
            points: 30
        }
    ]
};
