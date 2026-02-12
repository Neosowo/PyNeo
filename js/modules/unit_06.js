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
                    <h4 class="font-bold mb-4 text-2xl text-white">Sintaxis Basica</h4>
                    <p class="text-gray-300 mb-6">
                        Usamos la palabra clave <code class="text-neon-green">def</code> seguida del nombre de la funcion y parentesis.
                    </p>
                    
                    <div class="neon-box-dark p-6 mb-6">
                        <pre class="text-sm text-white font-mono">def mi_funcion():
    # Codigo que se ejecuta
    print("Hola desde la funcion")

# Llamar a la funcion
mi_funcion()</pre>
                    </div>
                    
                    <div class="neon-box-secondary p-6 border-l-4 border-blue-500">
                        <h5 class="font-bold text-white mb-2">Importante</h5>
                        <p class="text-sm text-gray-300">
                            Definir una funcion NO la ejecuta. Debes llamarla por su nombre para que se active.
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-func-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># Definir
def saludar():
    print("Hola, bienvenido!")
    print("Espero que estes bien")

# Usar (llamar)
saludar()
saludar()  # Puedes llamarla cuantas veces quieras</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-func-1').value, 'output-func-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-func-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `},
        {
            title: "Parametros",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Funciones Flexibles</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Los parametros hacen que las funciones sean dinamicas. Le pasas datos diferentes cada vez que las llamas.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-dark p-6">
                            <h5 class="font-bold text-white mb-3">Sin Parametros</h5>
                            <pre class="text-xs text-gray-400">def saludo():
    print("Hola")</pre>
                            <p class="text-xs text-gray-500 mt-2">Siempre dice lo mismo</p>
                        </div>
                        <div class="neon-box-dark p-6 border border-neon-green">
                            <h5 class="font-bold text-white mb-3">Con Parametros</h5>
                            <pre class="text-xs text-white">def saludo(nombre):
    print("Hola " + nombre)</pre>
                            <p class="text-xs text-neon-green mt-2">Se adapta al nombre</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-func-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">def presentar(nombre, edad):
    print(f"Hola, soy {nombre}")
    print(f"Tengo {edad} años")

# Llamadas con diferentes datos
presentar("Ana", 25)
print("---")
presentar("Carlos", 30)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-func-2').value, 'output-func-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-func-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `},
        {
            title: "Return (Devolver Valores)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">El Verdadero Poder</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Con <code class="text-neon-green">return</code>, una funcion puede devolver un valor para usarlo en otra parte del codigo.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-dark p-6">
                            <h5 class="font-bold text-red-400 mb-2">Solo Print</h5>
                            <pre class="text-xs text-gray-400">def suma(a, b):
    print(a + b)

suma(5, 3)  # Muestra 8
# No puedes guardar el resultado</pre>
                        </div>
                        <div class="neon-box-dark p-6 border border-neon-green">
                            <h5 class="font-bold text-neon-green mb-2">Con Return</h5>
                            <pre class="text-xs text-white">def suma(a, b):
    return a + b

resultado = suma(5, 3)
print(resultado + 10)  # 18</pre>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-func-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">def calcular_area(base, altura):
    area = base * altura
    return area

# Guardar el resultado
mi_area = calcular_area(5, 10)
print("El area es:", mi_area)
print("El doble seria:", mi_area * 2)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-func-3').value, 'output-func-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Calcular
                    </button>
                </div>
                <div id="output-func-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        }
    ]
});
