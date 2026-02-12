window.evaluations[26] = {
    id: 27,
    title: "Campos Petroleros (2015)",
    difficulty: "veterano",
    icon: "fa-oil-well",
    description: "Tema 3 Examen 2S 2015. Análisis de datos semi-estructurados y localización geoespacial.",
    timeLimit: 45,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Parsing de Archivos (30 pts)</h4>
                <p class="text-gray-300 mb-2">Un registro de campos petroleros tiene el formato: <code class="bg-gray-800 px-1">ID|Nombre|Fila,Columna|SimuladoBarriles</code>.</p>
                <div class="bg-gray-800 p-2 rounded text-xs font-mono mb-2 text-gray-400">
                    datos = [
                        "1|Campo Bolivar|0,2|97",
                        "2|Campo Zamora|3,0|86",
                        "3|Campo Tungurahua|4,3|101"
                    ]
                </div>
                <p class="text-gray-300 mb-2">Implementa una función <code class="text-neon-green">cargar_mapa(lista_datos, N, M)</code> que genere una matriz de NxM (llena de ceros).</p>
                <p class="text-gray-300 mb-2">Y coloque el número de Barriles en la posición (Fila, Columna) indicada.</p>
                <p class="text-gray-300 mb-2">Imprime la matriz resultante con formato bonito (fila por fila).</p>
                <p class="text-xs text-gray-500">Nota: N=5, M=5. Usa <code class="text-neon-green">split('|')</code> y <code class="text-neon-green">split(',')</code>.</p>
            `,
            expectedOutput: "[0, 0, 97, 0, 0]\n[0, 0, 0, 0, 0]\n[0, 0, 0, 0, 0]\n[86, 0, 0, 0, 0]\n[0, 0, 0, 101, 0]",
            points: 100
        }
    ]
};
