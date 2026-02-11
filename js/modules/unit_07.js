window.modules.push({
    id: 7,
    title: "Diccionarios",
    icon: "fa-book",
    description: "Guarda datos con etiquetas personalizadas.",
    intro: `
        <div class="neon-box p-8 mb-8">
            <h3 class="text-3xl font-bold mb-6 text-white text-center">Datos Organizados con Nombres</h3>
            <p class="text-gray-300 mb-8 text-lg text-center">
                Las listas usan numeros (0, 1, 2...) para identificar elementos.
                Los diccionarios usan nombres descriptivos (claves) para encontrar valores rapidamente.
            </p>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="neon-box-dark p-6">
                    <h4 class="text-red-400 font-bold mb-3">Lista (Indices Numericos)</h4>
                    <pre class="text-xs text-gray-400">persona = ["Juan", 25, "Madrid"]
print(persona[0])  # Juan
# Confuso: ¿Que es [1]?</pre>
                </div>
                <div class="neon-box-dark p-6 border border-neon-green">
                    <h4 class="text-neon-green font-bold mb-3">Diccionario (Claves)</h4>
                    <pre class="text-xs text-white">persona = {
    "nombre": "Juan",
    "edad": 25,
    "ciudad": "Madrid"
}
print(persona["nombre"])  # Claro!</pre>
                </div>
            </div>
        </div>
    `,
    lessons: [
        {
            title: "Que son los Diccionarios",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Pares Clave-Valor</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Estructura</h4>
                    <p class="text-gray-300 mb-6">
                        Un diccionario guarda informacion en pares <code class="text-neon-green">clave: valor</code>, separados por comas y encerrados en llaves { }.
                    </p>
                    
                    <div class="neon-box-secondary p-6 mb-6">
                        <h5 class="font-bold text-white mb-3">Sintaxis</h5>
                        <pre class="text-sm text-white">mi_dict = {
    "clave1": valor1,
    "clave2": valor2
}</pre>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div class="neon-box-dark p-4">
                            <div class="text-yellow-400 font-bold mb-1">Clave</div>
                            <p class="text-gray-400">Es el nombre con el que identificas el dato (siempre texto entre comillas)</p>
                        </div>
                        <div class="neon-box-dark p-4">
                            <div class="text-neon-green font-bold mb-1">Valor</div>
                            <p class="text-gray-400">Es el dato que guardas (puede ser numero, texto, lista, etc.)</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-dict-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="8"># Perfil de usuario
usuario = {
    "nombre": "Ana Garcia",
    "edad": 28,
    "pais": "Mexico",
    "premium": True
}

print("Nombre:", usuario["nombre"])
print("Edad:", usuario["edad"])</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-dict-1').value, 'output-dict-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ver Perfil
                    </button>
                </div>
                <div id="output-dict-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        },
        {
            title: "[EJERCICIO] Tu Primer Diccionario",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tu: Ficha de Producto</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Repasemos Diccionarios</h4>
                    <p class="text-gray-300 mb-4">Ya viste como crear un diccionario con datos de un usuario.</p>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Crea un diccionario llamado <code class="text-neon-green">producto</code> con:
                    </p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>Clave "nombre" con valor "Laptop"</li>
                        <li>Clave "precio" con valor 800</li>
                        <li>Clave "disponible" con valor True</li>
                        <li>Imprime el nombre y el precio</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            <strong>[PISTA]</strong> producto = {"nombre": "Laptop", ...}
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-ej1-unit7" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="7"># Crea el diccionario producto

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ej1-unit7').value, 'output-ej1-unit7')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ej1-unit7" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `,
            validation: {
                expectedOutput: "Laptop",
                matchType: "include",
                requiredCode: "producto",
                hint: 'producto = {"nombre": "Laptop", "precio": 800, "disponible": True}; print(producto["nombre"]); print(producto["precio"])'
            }
        },
        {
            title: "Modificar y Agregar",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Diccionarios Dinamicos</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Puedes cambiar valores existentes o agregar nuevas claves en cualquier momento.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6 text-sm">
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Modificar</h5>
                            <code class="text-neon-green block mb-2">persona["edad"] = 30</code>
                            <p class="text-gray-400">Cambia el valor de una clave existente</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Agregar</h5>
                            <code class="text-neon-green block mb-2">persona["email"] = "..."</code>
                            <p class="text-gray-400">Crea una nueva clave</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-dict-2" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="10">coche = {
    "marca": "Toyota",
    "modelo": "Corolla"
}

print("Estado inicial:", coche)

# Modificar
coche["modelo"] = "Camry"

# Agregar nueva clave
coche["año"] = 2023

print("Estado final:", coche)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-dict-2').value, 'output-dict-2')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-dict-2" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        },
        {
            title: "[EJERCICIO] Actualizar Inventario",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Ahora Tu: Sistema de Stock</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Repasemos Modificaciones</h4>
                    <p class="text-gray-300 mb-4">Ya aprendiste a cambiar valores y agregar nuevas claves.</p>
                    
                    <h4 class="font-bold mb-4 text-xl text-neon-green">Tu Turno</h4>
                    <p class="text-gray-300 mb-4">
                        Dado este diccionario de inventario:
                    </p>
                    <div class="bg-black/30 p-3 rounded mb-4">
                        <code class="text-neon-green">item = {"nombre": "Teclado", "cantidad": 10}</code>
                    </div>
                    <p class="text-gray-300 mb-4">Haz lo siguiente:</p>
                    <ul class="text-gray-400 mb-4 ml-6 space-y-2">
                        <li>Cambia la cantidad a 5</li>
                        <li>Agrega una nueva clave "precio" con valor 25</li>
                        <li>Imprime el diccionario completo</li>
                    </ul>
                    
                    <div class="neon-box-secondary p-4 border-l-4 border-yellow-500">
                        <p class="text-sm text-gray-300">
                            <strong>[PISTA]</strong> item["cantidad"] = 5
                        </p>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-ej2-unit7" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="6">item = {"nombre": "Teclado", "cantidad": 10}

# Modifica y agrega datos

</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-ej2-unit7').value, 'output-ej2-unit7')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Verificar
                    </button>
                </div>
                <div id="output-ej2-unit7" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `,
            validation: {
                expectedOutput: "5",
                matchType: "include",
                hint: 'item["cantidad"] = 5; item["precio"] = 25; print(item)'
            }
        },
        {
            title: "Metodos Utiles",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Operaciones Avanzadas</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">Python incluye metodos para trabajar con diccionarios de forma eficiente.</p>
                    
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">.keys()</code>
                            <p class="text-gray-400">Devuelve todas las claves</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">.values()</code>
                            <p class="text-gray-400">Devuelve todos los valores</p>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <code class="text-neon-green block mb-2">.items()</code>
                            <p class="text-gray-400">Devuelve pares clave-valor</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <textarea id="code-dict-3" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="10">config = {
    "idioma": "es",
    "volumen": 80,
    "modo_oscuro": True
}

print("Claves:", list(config.keys()))
print("Valores:", list(config.values()))

print("\nRecorriendo:")
for clave, valor in config.items():
    print(f"{clave}: {valor}")</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-dict-3').value, 'output-dict-3')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Explorar
                    </button>
                </div>
                <div id="output-dict-3" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Resultado...</p>
                </div>
            `
        }
    ]
});
