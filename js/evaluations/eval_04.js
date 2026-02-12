window.evaluations[3] = {
    id: 4,
    title: "Funciones y Módulos",
    difficulty: "intermedio",
    icon: "fa-cube",
    description: "Ejercicios de Ayudantía 3: Volumen de Esfera, Listas sin Repetir y Búsqueda.",
    timeLimit: 25,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Volumen de Esfera</h4>
                <p class="text-gray-300 mb-2">Importa el módulo <code class="text-neon-green">math</code>.</p>
                <p class="text-gray-300 mb-2">Define una función <code class="text-neon-green">volumenEsfera(radio)</code> que retorna el volumen.</p>
                <p class="text-gray-400 text-sm mb-4">Fórmula: (4/3) * pi * radio^3. Si radio es negativo, retorna -1.</p>
                <p class="text-gray-300">Prueba con radio 10 e imprime el resultado.</p>
            `,
            expectedOutput: "4188.790204786391",
            points: 20
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Enteros Sin Repetir</h4>
                <p class="text-gray-300 mb-2">Define función <code class="text-neon-green">enterosSinRepetir(lista)</code> que reciba una lista con duplicados y retorne una nueva lista con elementos únicos.</p>
                <p class="text-gray-300 mb-4">Sin usar SET, hazlo con bucle y condicional <code class="text-neon-green">if not in</code>.</p>
                <p class="text-gray-300">Prueba con <code class="text-neon-green">[4,3,23,23,4,5,7]</code> e imprime.</p>
            `,
            expectedOutput: "[4, 3, 23, 5, 7]",
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Buscar Nombres</h4>
                <p class="text-gray-300 mb-2">Define función <code class="text-neon-green">buscar(arreglo, texto)</code> para encontrar nombres que contengan el texto (sin importar mayúsculas).</p>
                <p class="text-gray-300 mb-4">Debe retornar lista de coincidencias formateadas en Title Case y sin espacios.</p>
                <p class="text-gray-300">Prueba con <code class="text-neon-green">["leonardo mENDoza", "Luis"]</code> y busca "l".</p>
            `,
            expectedOutput: "['LeonardoMendoza', 'Luis']",
            points: 25
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Saludo Personalizado</h4>
                <p class="text-gray-300 mb-2">Define función <code class="text-neon-green">saludo3(nombre="")</code> con parámetro por defecto vacío.</p>
                <p class="text-gray-300">Debe retornar "Hola " + nombre. Prueba con "Pedro" e imprímelo.</p>
            `,
            expectedOutput: "Hola Pedro",
            points: 30
        }
    ]
};
