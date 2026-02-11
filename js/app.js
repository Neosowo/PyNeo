// ============================================
// Neo.py - Sistema de Aprendizaje Python
// ============================================

// ESTADO DE LA APLICACIÓN
let currentModule = null;
let currentLesson = 0;
let progress = JSON.parse(localStorage.getItem('neopy-progress')) || {};

// ============================================
// COMPILADOR PYTHON (SKULPT)
// ============================================
function runPythonCode(code, outputId) {
    const outputElement = document.getElementById(outputId);
    outputElement.innerHTML = '<p class="text-yellow-400"><i class="fas fa-spinner fa-spin mr-2"></i>Ejecutando...</p>';

    let output = '';

    Sk.configure({
        output: function (text) {
            output += text;
        },
        read: function (x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        }
    });

    Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(
        function (mod) {
            outputElement.innerHTML = '<p class="text-neon-green"><i class="fas fa-check-circle mr-2"></i>Salida:</p><pre class="text-gray-300 mt-2 whitespace-pre-wrap">' + output + '</pre>';
        },
        function (err) {
            outputElement.innerHTML = `<p class="text-red-400"><i class="fas fa-exclamation-triangle mr-2"></i>Error:</p><pre class="text-red-300 mt-2">${err.toString()}</pre>`;
        }
    );
}

// ============================================
// MÓDULOS DEL CURSO
// ============================================
// INSTRUCCIONES PARA AGREGAR CONTENIDO:
// 1. Copia un módulo completo
// 2. Cambia: id, title, icon, description
// 3. Agrega lecciones con: title y content
// 4. En content usa HTML con las clases:
//    - neon-box (caja principal)
//    - neon-box-secondary (caja secundaria)
//    - neon-box-dark (caja oscura)
//    - text-neon-green (texto verde brillante)
//    - code-editor (para código)
//    - code-output (para resultados)
// ============================================

const modules = [
    // ==========================================
    // UNIDAD 1: PENSAMIENTO LÓGICO
    // ==========================================
    {
        id: 1,
        title: "Pensamiento Lógico y Fundamentos",
        icon: "fa-brain",
        description: "Aprende a pensar como programador desde cero",
        lessons: [
            // ----------------------------------
            // Lección 1.1
            // ----------------------------------
            {
                title: "¿Qué es Programar?",
                content: `
                    <h3 class="text-3xl font-bold mb-6 text-white">Bienvenido a la Programación</h3>
                    
                    <div class="neon-box p-8 mb-8">
                        <h4 class="font-bold mb-4 text-2xl text-white">Programar es dar instrucciones</h4>
                        <p class="text-xl text-gray-300 mb-6 leading-relaxed">
                            Cuando programas, le dices a la computadora qué hacer, paso a paso. Como una receta de cocina.
                        </p>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="neon-box-secondary p-6">
                                <h5 class="font-bold text-white mb-3">Receta de Cocina</h5>
                                <div class="space-y-2 text-gray-300 text-sm">
                                    <div>1. Calienta el horno</div>
                                    <div>2. Mezcla harina y azúcar</div>
                                    <div>3. Agrega huevos</div>
                                    <div>4. Hornea 30 minutos</div>
                                </div>
                            </div>
                            
                            <div class="neon-box-dark p-6">
                                <h5 class="font-bold text-white mb-3">Programa</h5>
                                <div class="space-y-2 text-gray-300 text-sm">
                                    <div>1. Pide el nombre</div>
                                    <div>2. Guarda el nombre</div>
                                    <div>3. Crea un saludo</div>
                                    <div>4. Muestra el saludo</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-2xl font-bold mb-4 text-white">¿Por qué Python?</h4>
                    <div class="neon-box p-6 mb-6">
                        <p class="text-gray-300 mb-4">Python es fácil de aprender:</p>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="neon-box-secondary p-4">
                                <span class="text-white font-semibold">✓ Se lee fácil</span>
                            </div>
                            <div class="neon-box-secondary p-4">
                                <span class="text-white font-semibold">✓ No es complicado</span>
                            </div>
                            <div class="neon-box-secondary p-4">
                                <span class="text-white font-semibold">✓ Muy usado</span>
                            </div>
                            <div class="neon-box-secondary p-4">
                                <span class="text-white font-semibold">✓ Hace muchas cosas</span>
                            </div>
                        </div>
                    </div>
                `
            },

            // ----------------------------------
            // Lección 1.2
            // ----------------------------------
            {
                title: "Cómo Piensa un Programador",
                content: `
                    <h3 class="text-3xl font-bold mb-6 text-white">Pensar Paso a Paso</h3>
                    
                    <div class="neon-box p-8 mb-8">
                        <h4 class="font-bold mb-4 text-2xl text-white">Ejemplo: Hacer un sándwich</h4>
                        <p class="text-gray-300 mb-6">La computadora necesita instrucciones muy claras:</p>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="neon-box-dark p-6 border-2 border-red-500/30">
                                <h5 class="font-bold text-red-400 mb-3">✗ Mal (muy vago)</h5>
                                <div class="space-y-2 text-gray-300">
                                    <div>1. Agarra pan</div>
                                    <div>2. Pon jamón</div>
                                    <div>3. Cierra</div>
                                </div>
                            </div>
                            
                            <div class="neon-box-secondary p-6 border-2 border-green-500/30">
                                <h5 class="font-bold text-neon-green mb-3">✓ Bien (claro)</h5>
                                <div class="space-y-2 text-gray-300">
                                    <div>1. Toma 2 rebanadas de pan</div>
                                    <div>2. Pon 3 lonchas de jamón</div>
                                    <div>3. Pon la otra rebanada encima</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-2xl font-bold mb-4 text-white">3 Cosas Importantes</h4>
                    <div class="space-y-4 mb-8">
                        <div class="neon-box p-6">
                            <h5 class="font-bold text-xl text-white mb-2">1. Orden</h5>
                            <p class="text-gray-300 mb-3">Las cosas pasan en orden. Primero A, luego B.</p>
                            <div class="neon-box-dark p-4">
                                <div class="text-gray-300">Levantarse → Ducharse → Desayunar</div>
                            </div>
                        </div>

                        <div class="neon-box p-6">
                            <h5 class="font-bold text-xl text-white mb-2">2. Decisiones</h5>
                            <p class="text-gray-300 mb-3">Elegir qué hacer según la situación.</p>
                            <div class="neon-box-dark p-4">
                                <div class="text-gray-300">SI llueve → Lleva paraguas</div>
                                <div class="text-gray-300">SI NO → Lleva gafas</div>
                            </div>
                        </div>

                        <div class="neon-box p-6">
                            <h5 class="font-bold text-xl text-white mb-2">3. Repetir</h5>
                            <p class="text-gray-300 mb-3">Hacer algo varias veces.</p>
                            <div class="neon-box-dark p-4">
                                <div class="text-gray-300">MIENTRAS haya ropa sucia:</div>
                                <div class="text-gray-300 ml-4">→ Lavar una prenda</div>
                            </div>
                        </div>
                    </div>
                `
            },

            // ----------------------------------
            // Lección 1.3
            // ----------------------------------
            {
                title: "Tu Primer Programa",
                content: `
                    <h3 class="text-3xl font-bold mb-6 text-white">Escribe tu Primer Código</h3>
                    
                    <div class="neon-box p-8 mb-8">
                        <h4 class="font-bold mb-4 text-2xl text-white">Hola Mundo</h4>
                        <p class="text-gray-300 mb-6">
                            Vamos a mostrar un mensaje en la pantalla. Usa <code class="neon-box-dark px-2 py-1 text-neon-green">print()</code>
                        </p>
                        
                        <div class="code-editor p-6 mb-4">
                            <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                                <div class="flex gap-1.5">
                                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span class="text-sm text-gray-400 ml-2">Python</span>
                            </div>
                            <textarea id="code-hello" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="4">print("Hola Mundo")
print("Este es mi primer programa")
print("Python es genial")</textarea>
                            <button onclick="runPythonCode(document.getElementById('code-hello').value, 'output-hello')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                                <i class="fas fa-play mr-2"></i>Ejecutar
                            </button>
                        </div>
                        <div id="output-hello" class="code-output p-4 text-sm">
                            <p class="text-gray-500">Haz clic en Ejecutar...</p>
                        </div>
                    </div>

                    <h4 class="text-2xl font-bold mb-4 text-white">¿Qué hace print()?</h4>
                    <div class="neon-box p-6 mb-6">
                        <p class="text-gray-300 mb-4"><code class="neon-box-dark px-3 py-1 text-neon-green">print()</code> muestra texto en la pantalla</p>
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="neon-box-secondary p-4">
                                <h5 class="font-bold text-white mb-2">Las comillas " "</h5>
                                <p class="text-sm text-gray-300">El texto va entre comillas</p>
                            </div>
                            <div class="neon-box-secondary p-4">
                                <h5 class="font-bold text-white mb-2">Los paréntesis ( )</h5>
                                <p class="text-sm text-gray-300">Dentro va lo que quieres mostrar</p>
                            </div>
                        </div>
                    </div>

                    <h4 class="text-2xl font-bold mb-4 text-white">Ahora tú - Cambia el mensaje</h4>
                    <div class="code-editor p-6 mb-4">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span class="text-sm text-gray-400 ml-2">Tu Turno</span>
                        </div>
                        <textarea id="code-custom" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="5"># Cambia estos mensajes
print("Tu nombre aquí")
print("Tu edad")
print("Tu comida favorita")</textarea>
                        <button onclick="runPythonCode(document.getElementById('code-custom').value, 'output-custom')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                            <i class="fas fa-play mr-2"></i>Ejecutar
                        </button>
                    </div>
                    <div id="output-custom" class="code-output p-4 text-sm">
                        <p class="text-gray-500">Modifica y ejecuta...</p>
                    </div>

                    <div class="neon-box border-l-4 border-green-500 p-6 mt-6">
                        <p class="font-semibold text-neon-green mb-2">¡Felicitaciones!</p>
                        <p class="text-gray-300">Acabas de programar. Cada print() muestra una línea diferente.</p>
                    </div>
                `
            }
        ]
    }

    // ==========================================
    // PLANTILLA PARA NUEVAS UNIDADES
    // ==========================================
    // Copia desde aquí ↓
    /*
    ,{
        id: 2,  // Cambia el número
        title: "Nombre de la Unidad",
        icon: "fa-code",  // Iconos: fa-code, fa-database, fa-chart-line, fa-list, fa-question-circle, fa-sync
        description: "Descripción corta de la unidad",
        lessons: [
            {
                title: "Nombre de la Lección",
                content: `
                    <h3 class="text-3xl font-bold mb-6 text-white">Título Principal</h3>
                    
                    <div class="neon-box p-8 mb-8">
                        <h4 class="font-bold mb-4 text-2xl text-white">Subtítulo</h4>
                        <p class="text-gray-300 mb-6">
                            Explicación aquí...
                        </p>
                    </div>

                    <!-- Para código interactivo -->
                    <div class="code-editor p-6 mb-4">
                        <div class="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span class="text-sm text-gray-400 ml-2">Python</span>
                        </div>
                        <textarea id="code-ejemplo" class="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" rows="4">print("Hola")</textarea>
                        <button onclick="runPythonCode(document.getElementById('code-ejemplo').value, 'output-ejemplo')" class="btn-neon px-6 py-2 rounded-lg font-semibold text-white mt-4">
                            <i class="fas fa-play mr-2"></i>Ejecutar
                        </button>
                    </div>
                    <div id="output-ejemplo" class="code-output p-4 text-sm">
                        <p class="text-gray-500">Haz clic en Ejecutar...</p>
                    </div>
                `
            }
        ]
    }
    */
    // Hasta aquí ↑
];

// ============================================
// FUNCIONES DE LA APLICACIÓN
// ============================================

function init() {
    loadModules();
    updateOverallProgress();
}

function loadModules() {
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = '';

    modules.forEach((module, index) => {
        const isLocked = index > 0 && !progress[modules[index - 1].id];
        const isCompleted = progress[module.id];

        const card = document.createElement('div');
        card.className = `module-card p-8 ${isLocked ? 'locked pointer-events-none' : 'cursor-pointer'} reveal`;

        const progressPercent = isCompleted ? 100 : 0;
        const circumference = 2 * Math.PI * 36;
        const offset = circumference - (progressPercent / 100) * circumference;

        card.innerHTML = `
            <div class="flex items-start justify-between mb-6">
                <div class="relative">
                    <svg class="progress-ring w-20 h-20" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" stroke="rgba(0, 255, 136, 0.2)" stroke-width="4" fill="none"/>
                        <circle class="progress-ring-circle" cx="40" cy="40" r="36" 
                                stroke="#00ff88" stroke-width="4" fill="none"
                                stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                                stroke-linecap="round"/>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fas ${module.icon} text-3xl text-neon-green"></i>
                    </div>
                </div>
                ${isCompleted ? '<div class="badge-neon px-3 py-1 rounded text-xs font-bold flex items-center gap-1"><i class="fas fa-check"></i> COMPLETADO</div>' : ''}
                ${isLocked ? '<div class="neon-box px-3 py-1 rounded text-xs font-bold flex items-center gap-1 text-gray-400"><i class="fas fa-lock"></i> BLOQUEADO</div>' : ''}
            </div>
            
            <div class="mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-bold text-neon-green">UNIDAD ${index + 1}</span>
                </div>
                <h3 class="text-2xl font-black mb-3 text-white">${module.title}</h3>
                <p class="text-gray-400 mb-4 leading-relaxed">${module.description}</p>
            </div>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-700">
                <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span><i class="fas fa-book-open mr-1"></i> ${module.lessons.length} lecciones</span>
                </div>
                ${!isLocked ? '<div class="flex items-center gap-2 text-neon-green font-bold"><span>COMENZAR</span><i class="fas fa-arrow-right"></i></div>' : ''}
            </div>
        `;

        if (!isLocked) {
            card.onclick = () => openModule(module.id);

            // Efecto 3D al mover el mouse
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }

        grid.appendChild(card);
    });

    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('active'), i * 100);
        });
    }, 100);
}

function openModule(moduleId) {
    currentModule = modules.find(m => m.id === moduleId);
    currentLesson = 0;

    document.getElementById('modules-section').classList.add('hidden');
    document.getElementById('module-content').classList.remove('hidden');
    document.getElementById('hero-section').classList.add('hidden');

    loadLesson();
}

function closeModule() {
    document.getElementById('modules-section').classList.remove('hidden');
    document.getElementById('module-content').classList.add('hidden');
    document.getElementById('hero-section').classList.remove('hidden');
    currentModule = null;
}

function loadLesson() {
    const lesson = currentModule.lessons[currentLesson];
    document.getElementById('module-title').textContent = currentModule.title;
    document.getElementById('module-description').textContent = `Lección ${currentLesson + 1} de ${currentModule.lessons.length}: ${lesson.title}`;
    document.getElementById('lesson-content').innerHTML = lesson.content;

    document.getElementById('prev-lesson').disabled = currentLesson === 0;
    const nextBtn = document.getElementById('next-lesson');
    nextBtn.innerHTML = currentLesson === currentModule.lessons.length - 1 ? 'COMPLETAR UNIDAD <i class="fas fa-trophy ml-2"></i>' : 'SIGUIENTE <i class="fas fa-chevron-right ml-2"></i>';

    window.scrollTo(0, 0);
}

function nextLesson() {
    if (currentLesson < currentModule.lessons.length - 1) {
        currentLesson++;
        loadLesson();
    } else {
        completeModule();
    }
}

function previousLesson() {
    if (currentLesson > 0) {
        currentLesson--;
        loadLesson();
    }
}

function completeModule() {
    progress[currentModule.id] = true;
    localStorage.setItem('neopy-progress', JSON.stringify(progress));

    showSuccessModal(`¡Has completado "${currentModule.title}"!`);
    createConfetti();

    setTimeout(() => {
        closeModule();
        loadModules();
        updateOverallProgress();
    }, 2000);
}

function showSuccessModal(message) {
    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').classList.remove('hidden');
    document.getElementById('success-modal').classList.add('flex');
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
    document.getElementById('success-modal').classList.remove('flex');
}

function updateOverallProgress() {
    const completed = Object.keys(progress).length;
    const total = modules.length;
    const percentage = Math.round((completed / total) * 100);
    document.getElementById('overall-progress').textContent = `${percentage}%`;
}

function resetProgress() {
    if (confirm('¿Estás seguro de que quieres reiniciar tu progreso?')) {
        progress = {};
        localStorage.removeItem('neopy-progress');
        loadModules();
        updateOverallProgress();
    }
}

function scrollToModules() {
    document.getElementById('modules-section').scrollIntoView({ behavior: 'smooth' });
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = '#00ff88';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Inicializar
init();
