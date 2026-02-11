# Neo.py - Guía para Agregar Contenido

## 📋 Estructura del Proyecto

```
NeoPY/
├── index.html          # Página principal (NO MODIFICAR)
├── js/
│   └── app.js         # Archivo donde se agrega TODO el contenido
└── README-CONTENT.md  # Esta guía
```

## 🎯 Cómo Agregar Contenido

### Paso 1: Abrir el archivo
Abre `js/app.js` y busca la sección `MÓDULOS DEL CURSO`

### Paso 2: Copiar la plantilla
Busca el comentario `PLANTILLA PARA NUEVAS UNIDADES` y copia todo el código entre los `/* */`

### Paso 3: Pegar después de la última unidad
Pega la plantilla después de la última unidad, **antes** del cierre del array `]`

### Paso 4: Modificar los datos

```javascript
{
    id: 2,  // ← Cambia el número (debe ser único)
    title: "Variables y Tipos de Datos",  // ← Nombre de la unidad
    icon: "fa-code",  // ← Icono (ver lista abajo)
    description: "Aprende a guardar información",  // ← Descripción corta
    lessons: [
        {
            title: "¿Qué es una Variable?",  // ← Nombre de la lección
            content: `
                <!-- Aquí va el HTML de la lección -->
            `
        }
    ]
}
```

## 🎨 Clases CSS Disponibles

### Cajas/Contenedores
- `neon-box` - Caja principal con borde verde neón
- `neon-box-secondary` - Caja secundaria (más tenue)
- `neon-box-dark` - Caja oscura con borde verde

### Texto
- `text-white` - Texto blanco
- `text-gray-300` - Texto gris claro
- `text-gray-400` - Texto gris
- `text-neon-green` - Texto verde brillante
- `text-neon-light` - Texto verde claro

### Código
- `code-editor` - Contenedor para editor de código
- `code-output` - Contenedor para resultados

### Botones
- `btn-neon` - Botón verde brillante

## 📝 Plantilla de Lección Completa

```javascript
{
    title: "Nombre de la Lección",
    content: `
        <h3 class="text-3xl font-bold mb-6 text-white">Título Principal</h3>
        
        <!-- Caja de explicación -->
        <div class="neon-box p-8 mb-8">
            <h4 class="font-bold mb-4 text-2xl text-white">Subtítulo</h4>
            <p class="text-gray-300 mb-6">
                Explicación del concepto aquí...
            </p>
        </div>

        <!-- Ejemplo de código interactivo -->
        <div class="code-editor p-6 mb-4">
            <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <div class="flex gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span class="text-sm text-gray-400 ml-2">Python</span>
            </div>
            <textarea id="code-ejemplo-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="4">print("Hola")</textarea>
            <button onclick="runPythonCode(document.getElementById('code-ejemplo-1').value, 'output-ejemplo-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                <i class="fas fa-play mr-2"></i>Ejecutar
            </button>
        </div>
        <div id="output-ejemplo-1" class="code-output p-4 text-sm">
            <p class="text-gray-500">Haz clic en Ejecutar...</p>
        </div>

        <!-- Nota importante -->
        <div class="neon-box border-l-4 border-green-500 p-6 mt-6">
            <p class="font-semibold text-neon-green mb-2">💡 Importante</p>
            <p class="text-gray-300">Texto de la nota aquí...</p>
        </div>
    `
}
```

## 🎯 Iconos Disponibles (Font Awesome)

- `fa-brain` - Cerebro (pensamiento lógico)
- `fa-code` - Código (programación)
- `fa-database` - Base de datos
- `fa-list` - Lista (arrays)
- `fa-question-circle` - Pregunta (condicionales)
- `fa-sync` - Ciclo (loops)
- `fa-chart-line` - Gráfica (Pandas)
- `fa-calculator` - Calculadora
- `fa-keyboard` - Teclado (input)

## ⚠️ Reglas Importantes

1. **IDs únicos**: Cada `textarea` y `div` de output debe tener un ID único
   - Ejemplo: `code-ejemplo-1`, `output-ejemplo-1`
   - Ejemplo: `code-ejemplo-2`, `output-ejemplo-2`

2. **Comillas**: Usa comillas invertidas `` ` `` para el content
   - Dentro del content, usa comillas dobles `"` para HTML

3. **No olvides la coma**: Después de cada unidad (excepto la última)

## 📚 Ejemplo Completo de Nueva Unidad

```javascript
// Agregar después de la Unidad 1
,{
    id: 2,
    title: "Variables y Tipos de Datos",
    icon: "fa-database",
    description: "Aprende a guardar y usar información",
    lessons: [
        {
            title: "¿Qué es una Variable?",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Variables en Python</h3>
                
                <div class="neon-box p-8 mb-8">
                    <h4 class="font-bold mb-4 text-2xl text-white">Una variable es como una caja</h4>
                    <p class="text-gray-300 mb-6">
                        Guardas información dentro y le pones un nombre para encontrarla después.
                    </p>
                    
                    <div class="neon-box-secondary p-6">
                        <h5 class="font-bold text-white mb-3">Ejemplo</h5>
                        <div class="text-gray-300">
                            <code class="text-neon-green">nombre = "Juan"</code>
                            <p class="mt-2">Guardamos "Juan" en una caja llamada "nombre"</p>
                        </div>
                    </div>
                </div>

                <div class="code-editor p-6 mb-4">
                    <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <div class="flex gap-1.5">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span class="text-sm text-gray-400 ml-2">Prueba esto</span>
                    </div>
                    <textarea id="code-var-1" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="4">nombre = "Juan"
edad = 25
print(nombre)
print(edad)</textarea>
                    <button onclick="runPythonCode(document.getElementById('code-var-1').value, 'output-var-1')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                        <i class="fas fa-play mr-2"></i>Ejecutar
                    </button>
                </div>
                <div id="output-var-1" class="code-output p-4 text-sm">
                    <p class="text-gray-500">Haz clic en Ejecutar...</p>
                </div>
            `
        },
        {
            title: "Tipos de Datos",
            content: `
                <h3 class="text-3xl font-bold mb-6 text-white">Tipos de Información</h3>
                
                <div class="neon-box p-8 mb-8">
                    <p class="text-gray-300 mb-6">
                        Python puede guardar diferentes tipos de información:
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Texto (str)</h5>
                            <code class="text-neon-green">"Hola"</code>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Número (int)</h5>
                            <code class="text-neon-green">42</code>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Decimal (float)</h5>
                            <code class="text-neon-green">3.14</code>
                        </div>
                        <div class="neon-box-secondary p-4">
                            <h5 class="font-bold text-white mb-2">Verdadero/Falso (bool)</h5>
                            <code class="text-neon-green">True</code>
                        </div>
                    </div>
                </div>
            `
        }
    ]
}
```

## 🚀 Prompt para IA

Si quieres que una IA agregue contenido, usa este prompt:

```
Lee el archivo js/app.js y agrega una nueva unidad sobre [TEMA].

Sigue estas reglas:
1. Usa la plantilla que está en los comentarios
2. El ID debe ser el siguiente número disponible
3. Usa solo las clases CSS que están en README-CONTENT.md
4. Cada editor de código necesita IDs únicos
5. Mantén el texto simple para principiantes
6. Agrega 3-5 lecciones por unidad

Tema: [Describe el tema aquí]
```

## 📞 Soporte

Si algo no funciona:
1. Verifica que todos los IDs sean únicos
2. Revisa que no falten comas entre unidades
3. Asegúrate de que las comillas estén correctas
4. Comprueba que el HTML esté bien cerrado
