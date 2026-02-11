window.modules.push({
    id: 8,
    title: "Herramientas Pro",
    icon: "fa-star",
    description: "F-strings, slicing y trucos avanzados.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Python Moderno</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Ya dominas lo basico. Ahora aprende las herramientas que usan los profesionales para escribir codigo limpio y eficiente.
            </p>
            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div class="neon-box-dark p-6 text-center">
                    <div class="text-5xl text-blue-400 mb-3"><i class="fas fa-quote-right"></i></div>
                    <h4 class="text-white font-bold mb-2">F-Strings</h4>
                    <p class="text-sm text-gray-400">Formateo elegante de textos</p>
                </div>
                <div class="neon-box-dark p-6 text-center">
                    <div class="text-5xl text-yellow-400 mb-3"><i class="fas fa-cut"></i></div>
                    <h4 class="text-white font-bold mb-2">Slicing</h4>
                    <p class="text-sm text-gray-400">Extrae porciones de listas y textos</p>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "F-Strings (Formato Moderno)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">La Forma Profesional</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Adios concatenacion, hola f-strings</h4>
                    <p class="text-gray-300 mb-6">
                        Los f-strings (formatted strings) son la manera mas limpia de insertar variables en textos. Coloca una <code class="text-neon-green">f</code> antes de las comillas y usa llaves { } para las variables.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="neon-box-dark p-6">
                            <h5 class="text-red-400 font-bold mb-3">Forma Antigua</h5>
                            <pre class="text-xs text-gray-400">nombre = "Ana"
edad = 25
print("Hola " + nombre + 
      ", tienes " + str(edad) +
      " años")</pre>
                            <p class="text-xs text-gray-500 mt-2">Complejo y propenso a errores</p>
                        </div>
                        <div class="neon-box-dark p-6 border border-neon-green">
                            <h5 class="text-neon-green font-bold mb-3">Con F-String</h5>
                            <pre class="text-xs text-white">nombre = "Ana"
edad = 25
print(f"Hola {nombre}, 
      tienes {edad} años")</pre>
                            <p class="text-xs text-neon-green mt-2">Claro y simple</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-fstr-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8">
producto = "Laptop"
precio = 899.99
descuento = 15 

# F-string en accion 
mensaje = f"El {producto} cuesta \${precio}"
print(mensaje)

oferta = f"Descuento del {descuento}%: \${precio - (precio * descuento / 100):.2f}"
print(oferta)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-fstr-1').value, 'output-fstr-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-fstr-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        },
        {
            title: "[EJERCICIO] Tarjeta de Presentacion",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tu: F-String Personalizado</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Repasemos F-Strings</h4>
                    <p class="text-gray-300 mb-4">Ya viste como los f-strings facilitan la insercion de variables en textos.</p>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Crea una tarjeta de presentacion:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>Define variables: nombre = "Carlos", profesion = "Ingeniero", experiencia = 5</li>
                        <li>Usa un f-string para imprimir: "Soy Carlos, trabajo como Ingeniero con 5 años de experiencia"</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            <strong>[PISTA]</strong> print(f"Soy {nombre}, trabajo como {profesion}...")
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-ej1-unit8" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6"># Crea la tarjeta con f-string

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ej1-unit8').value, 'output-ej1-unit8')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ej1-unit8" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Carlos",
                matchType: "include",
                hint: 'nombre = "Carlos"; profesion = "Ingeniero"; experiencia = 5; print(f"Soy {nombre}, trabajo como {profesion} con {experiencia} años de experiencia")'
            }
        },
        {
            title: "Slicing (Cortar Secuencias)",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Extrae Fragmentos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        El slicing te permite extraer porciones de listas o textos usando la sintaxis <code class="text-neon-green">[inicio:fin]</code>.
                    </p>
                    
                    <div class="neon-box-secondary p-6 mb-6">
                        <h5 class="font-bold text-white mb-3">Reglas Importantes</h5>
                        <ul class="text-sm text-gray-300 space-y-2">
                            <li>El indice de inicio se INCLUYE</li>
                            <li>El indice final NO se incluye</li>
                            <li>Si omites inicio, empieza desde 0</li>
                            <li>Si omites fin, va hasta el final</li>
                        </ul>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                        <div class="neon-box-dark p-4">
                            <code class="text-neon-green block mb-2">lista[1:4]</code>
                            <p class="text-gray-400">Desde 1 hasta 3</p>
                        </div>
                        <div class="neon-box-dark p-4">
                            <code class="text-neon-green block mb-2">lista[:3]</code>
                            <p class="text-gray-400">Primeros 3 elementos</p>
                        </div>
                        <div class="neon-box-dark p-4">
                            <code class="text-neon-green block mb-2">lista[2:]</code>
                            <p class="text-gray-400">Desde el 2 hasta el final</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-slice-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="10">numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print("Lista completa:", numeros)
print("Del 2 al 5:", numeros[2:6])  # 2, 3, 4, 5
print("Primeros 4:", numeros[:4])   # 0, 1, 2, 3
print("Desde el 6:", numeros[6:])   # 6, 7, 8, 9

# Tambien funciona con texto
texto = "Python"
print("Primeras 3 letras:", texto[:3])  # Pyt</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-slice-1').value, 'output-slice-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Cortar
                    </button>
                </div>
                <div id="output-slice-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        },
        {
            title: "[EJERCICIO] Extractor de Nombres",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tu: Slicing en Accion</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Repasemos Slicing</h4>
                    <p class="text-gray-300 mb-4">El slicing extrae fragmentos usando [inicio:fin].</p>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Dada esta lista de nombres:
                    </p>
                    <div class="bg-black/30 p-3 rounded mb-4">
                        <code class="text-neon-green">nombres = ["Ana", "Bruno", "Carlos", "Diana", "Elena"]</code>
                    </div>
                    <p class="text-gray-300 mb-4">Extrae y muestra:</p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>Los primeros 3 nombres</li>
                        <li>Los ultimos 2 nombres</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            <strong>[PISTA]</strong> nombres[:3] y nombres[3:]
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-ej2-unit8" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">nombres = ["Ana", "Bruno", "Carlos", "Diana", "Elena"]

# Extrae los fragmentos solicitados

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ej2-unit8').value, 'output-ej2-unit8')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ej2-unit8" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Ana",
                matchType: "include",
                hint: 'print(nombres[:3]); print(nombres[3:])'
            }
        },
        {
            title: "Slicing Avanzado",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Mas Control</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Puedes agregar un tercer parametro para controlar el salto (step): <code class="text-neon-green">[inicio:fin:salto]</code>
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6 text-sm">
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">lista[::2]</code>
                            <p class="text-gray-400">Todos los elementos, saltando de 2 en 2</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">lista[::-1]</code>
                            <p class="text-gray-400">Invierte la lista completamente</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-slice-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="9">letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

print("Original:", letras)
print("De 2 en 2:", letras[::2])      # A, C, E, G
print("Inversa:", letras[::-1])       # H, G, F, E...

# Truco: invertir texto
palabra = "Python"
print("Al reves:", palabra[::-1])     # nohtyP</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-slice-2').value, 'output-slice-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Explorar
                    </button>
                </div>
                <div id="output-slice-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        }
    ]
});