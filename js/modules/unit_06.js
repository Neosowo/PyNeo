window.modules.push({
    id: 6,
    title: "Funciones",
    icon: "fa-cubes",
    description: "Crea tus propias herramientas reutilizables.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Modulariza tu Codigo</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Una función es como una caja de herramientas personalizada.
                La creas una vez y la usas mil veces sin reescribir codigo.
            </p>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="neon-box-dark p-6 text-center">
                    <div class="text-4xl text-blue-400 mb-3"><i class="fas fa-inbox"></i></div>
                    <h4 class="text-white font-bold mb-2">Entrada</h4>
                    <p class="text-sm text-gray-400">Parametros que le das</p>
                </div>
                <div class="neon-box-dark p-6 text-center">
                    <div class="text-4xl text-yellow-400 mb-3"><i class="fas fa-cog"></i></div>
                    <h4 class="text-white font-bold mb-2">Proceso</h4>
                    <p class="text-sm text-gray-400">El codigo que ejecuta</p>
                </div>
                <div class="neon-box-dark p-6 text-center">
                    <div class="text-4xl text-neon-green mb-3"><i class="fas fa-share"></i></div>
                    <h4 class="text-white font-bold mb-2">Salida</h4>
                    <p class="text-sm text-gray-400">El resultado que devuelve</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Definiendo Funciones",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Tu Primera Herramienta</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Una función es un bloque de código reutilizable que realiza una tarea específica. En lugar de escribir el mismo código muchas veces, lo encerramos en una función y lo invocamos cuando lo necesitemos.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="neon-box-dark p-6 border-l-2 border-blue-500">
                            <h4 class="text-xl font-bold text-white mb-3">Definición (def)</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                Usamos la palabra <code>def</code> seguida del nombre de la función y paréntesis.
                            </p>
                            <code class="text-xs text-neon-green block">def mi_funcion():</code>
                        </div>
                        
                        <div class="neon-box-dark p-6 border-l-2 border-neon-green">
                            <h4 class="text-xl font-bold text-white mb-3">Llamada</h4>
                            <p class="text-gray-400 text-sm mb-4">
                                Para que el código dentro de la función se ejecute, debes "llamarla" por su nombre más tarde.
                            </p>
                        </div>
                    </div>

                    <div class="neon-box-secondary p-6">
                        <h4 class="font-bold text-white mb-2">Orden de Ejecución</h4>
                        <p class="text-gray-300 text-sm">
                            Python lee la definición pero no hace nada hasta que la función es llamada explícitamente en el flujo del programa.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Creando Herramientas</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Crea una función llamada <code>neo</code> que imprima "Aprendiendo Python". No olvides llamar a la función al final del script.
                    </p>
                    <textarea id="code-func-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Define tu función neo() aquí:

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-func-1').value, 'output-func-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Activar Función
                    </button>
                </div>
                <div id="output-func-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Esperando llamada...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Aprendiendo Python",
                matchType: "exact",
                hint: "Escribe def neo(): con su respectivo print indentado, y luego llama neo() fuera de la definición."
            }
        },
        {
            title: "Parámetros",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Funciones Flexibles</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        Los parámetros permiten que una función reciba datos del exterior. Esto la hace mucho más potente, ya que puede trabajar con valores diferentes en cada llamada.
                    </p>
                    
                    <div class="bg-black/30 p-4 rounded border border-gray-700 mb-8">
                        <h5 class="text-white font-bold text-sm mb-2">Paso de Datos</h5>
                        <p class="text-sm text-gray-400 mb-2">Los parámetros van dentro de los paréntesis en la definición:</p>
                        <code class="text-xs text-blue-400 mt-2">def saludo(nombre):</code>
                        <p class="text-xs text-gray-500 mt-2">Dentro de la función, 'nombre' actúa como una variable normal.</p>
                    </div>

                    <div class="neon-box-secondary p-6 border-l-2 border-yellow-500">
                        <h4 class="text-lg font-bold text-white mb-2">Argumentos</h4>
                        <p class="text-gray-300 text-sm">
                            Cuando llamas a la función, el valor que envías (ej: "Neo") se llama <strong>argumento</strong>.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Procesando Entradas</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Completa la función <code>doble(x)</code> para que imprima el resultado de multiplicar <code>x</code> por 2. Luego llama a la función pasando el número 5.
                    </p>
                    <textarea id="code-func-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">def doble(x):
    # Imprime x multiplicado por 2:
    
# Llama a doble pasando el 5:
</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-func-2').value, 'output-func-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar Función
                    </button>
                </div>
                <div id="output-func-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Calculando con parámetros...</p>
                </div>
            `,
            validation: {
                expectedOutput: "10",
                matchType: "include",
                hint: "Dentro haz print(x * 2) y llama a la función con doble(5)."
            }
        },
        {
            title: "Return (Devolver Valores)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Resultados de Salida</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        A veces no queremos que la función imprima nada, sino que nos "devuelva" un resultado para usarlo más adelante en nuestro programa. Para eso usamos <code>return</code>.
                    </p>
                    
                    <div class="space-y-4">
                        <div class="neon-box-dark p-4 border border-neon-green/30">
                            <h5 class="font-bold text-neon-green mb-1">Finalización</h5>
                            <p class="text-sm text-gray-400">
                                Cuando Python encuentra un <code>return</code>, la función termina inmediatamente y expulsa el valor indicado.
                            </p>
                        </div>
                        
                        <div class="neon-box-dark p-4 border border-purple-900/50">
                            <h5 class="font-bold text-purple-400 mb-1">Almacenamiento</h5>
                            <p class="text-sm text-gray-400">
                                Los valores retornados pueden guardarse en variables: <code>resultado = sumar(5, 3)</code>.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <span class="text-sm text-gray-400">Capturando Resultados</span>
                    </div>
                    <p class="text-gray-300 text-sm mb-4">
                        Crea una función llamada <code>sumar(a, b)</code> que retorne la suma de ambos. Luego guarda el resultado en una variable <code>total</code> e imprímela.
                    </p>
                    <textarea id="code-func-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># Define sumar con return aquí:

# Llama a la función y muestra el resultado:
total = sumar(10, 20)
print(total)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-func-3').value, 'output-func-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calcular con Retorno
                    </button>
                </div>
                <div id="output-func-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Recuperando valor...</p>
                </div>
            `,
            validation: {
                expectedOutput: "30",
                matchType: "exact",
                requiredCode: "return",
                hint: "Dentro de la función usa return a + b."
            }
        }
    ]
});
