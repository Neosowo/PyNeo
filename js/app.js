// ============================================
// PyNeo - Sistema de Aprendizaje Python
// ============================================

const CONFIG = {
    SUCCESS_IMAGE: "https://i.postimg.cc/59m1Nk0S/feli.gif",
    SUCCESS_TITLE: "¡Misión Cumplida!",
    CONFETTI_DURATION: 3000
};

let currentModule = null;
let currentLesson = 0;
let progress = JSON.parse(localStorage.getItem('neopy-progress')) || {};
let lessonProgress = JSON.parse(localStorage.getItem('neopy-lesson-progress')) || {};

// ============================================
// COMPILADOR PYTHON (SKULPT)
// ============================================
function runPythonCode(code, outputId) {
    const outputElement = document.getElementById(outputId);
    outputElement.innerHTML = '<p class="text-yellow-400 animate-pulse"><i class="fas fa-spinner fa-spin mr-2"></i>Ejecutando...</p>';

    let output = '';

    Sk.configure({
        output: function (text) { output += text; },
        read: function (x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        },
        inputfun: function (prompt) {
            return new Promise((resolve) => {
                const userInput = window.prompt(prompt || "Ingresa un valor:");
                output += (userInput || "") + "\n";
                resolve(userInput || "");
            });
        }
    });

    Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    }).then(
        function (mod) {
            const escapedOutput = output
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            outputElement.innerHTML = '<div class="text-xs font-bold text-gray-500 mb-1">TERMINAL</div><pre class="text-white font-mono text-sm whitespace-pre-wrap">' + escapedOutput + '</pre>';
            checkLessonValidation(code, output);
        },
        function (err) {
            outputElement.innerHTML = `<p class="text-red-400 font-bold"><i class="fas fa-times-circle mr-2"></i>Error:</p><pre class="text-red-300 mt-2 text-xs">${err.toString()}</pre>`;
        }
    );
}

// VALIDACIÓN
// VALIDACIÓN
function checkLessonValidation(code, output) {
    if (!currentModule || currentLesson === null) return;
    const lesson = currentModule.lessons[currentLesson];
    const nextBtn = document.getElementById('next-lesson');

    if (!lesson.validation) {
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            nextBtn.innerHTML = (currentLesson === currentModule.lessons.length - 1) ?
                'FINALIZAR UNIDAD <i class="fas fa-trophy ml-2"></i>' :
                'SIGUIENTE <i class="fas fa-chevron-right ml-2"></i>';
        }
        return;
    }

    const rules = lesson.validation;
    let isValid = true;
    let failureReason = "";

    if (rules.forbidden && rules.forbidden.some(word => code.includes(word))) {
        isValid = false;
        failureReason = rules.hint || "No has cambiado el código de ejemplo.";
    }

    if (rules.expectedOutput) {
        if (rules.matchType === 'exact') {
            if (output.trim() !== rules.expectedOutput.trim()) {
                isValid = false;
                failureReason = `Esperaba ver: "${rules.expectedOutput}"\nPero vi: "${output.trim()}"`;
            }
        } else {
            if (!output.includes(rules.expectedOutput)) {
                isValid = false;
                failureReason = `El resultado debe incluir: "${rules.expectedOutput}"`;
            }
        }
    }

    if (rules.requiredCode && !code.includes(rules.requiredCode)) {
        isValid = false;
        failureReason = rules.hint || "Falta código requerido.";
    }

    const outputId = document.querySelector('.code-output').id;
    const outputElement = document.getElementById(outputId);

    if (isValid) {
        // Exito: Mensaje visual en la terminal, pero NO modal
        outputElement.innerHTML += `
            <div class="mt-3 pt-3 border-t border-white/10">
                <p class="text-neon-green font-bold text-xs"><i class="fas fa-check-circle mr-1"></i>¡Excelente! Reto completado.</p>
            </div>
        `;
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            nextBtn.innerHTML = (currentLesson === currentModule.lessons.length - 1) ?
                'FINALIZAR UNIDAD <i class="fas fa-trophy ml-2"></i>' :
                'SIGUIENTE <i class="fas fa-chevron-right ml-2"></i>';
        }
    } else {
        // Error
        outputElement.innerHTML += `
            <div class="mt-3 pt-3 border-t border-white/10">
                <p class="text-orange-400 font-bold text-xs"><i class="fas fa-exclamation-circle mr-1"></i>Inténtalo de nuevo</p>
                <pre class="text-gray-400 text-xs mt-1 mb-2 font-sans whitespace-pre-wrap">${failureReason}</pre>
            </div>
        `;
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
            nextBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Completa el reto';
        }
    }
}


// ============================================
// MÓDULOS DEL CURSO
// ============================================
// Los módulos ahora se cargan desde js/modules/data.js
// para mantener este archivo limpio y ordenado.

// ============================================
// FUNCIONES DE INTERFAZ Y NAVEGACIÓN
// ============================================
function init() { loadModules(); updateOverallProgress(); }

function loadModules() {
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = '';

    // Verificación de seguridad
    if (typeof modules === 'undefined' || !modules) {
        grid.innerHTML = '<div class="text-red-500 neon-box p-4">Error: No se han cargado los módulos. Revisa js/modules/data.js</div>';
        return;
    }

    modules.forEach((module, index) => {
        // BLOQUEO DESACTIVADO TEMPORALMENTE PARA PRUEBAS
        const isLocked = false; // index > 0 && !progress[modules[index - 1].id];
        const isCompleted = progress[module.id];

        let percent = 0;
        if (isCompleted) {
            percent = 100;
        } else if (lessonProgress[module.id] !== undefined) {
            const totalSteps = (module.intro ? 1 : 0) + module.lessons.length;
            const currentStep = (lessonProgress[module.id] === -1 && module.intro) ? 0 :
                (lessonProgress[module.id] + (module.intro ? 1 : 0));
            if (totalSteps > 0) {
                // Ensure we don't show 100% if not fully completed verified
                percent = Math.min(95, Math.round((currentStep / totalSteps) * 100));
            }
        }

        const card = document.createElement('div');
        card.className = `module-card p-8 ${isLocked ? 'locked pointer-events-none' : 'cursor-pointer'} reveal`;
        // const percent = isCompleted ? 100 : 0; // Removed old logic

        card.innerHTML = `
            <div class="flex items-start justify-between mb-6">
                <div class="relative">
                    <svg class="progress-ring w-20 h-20" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" stroke="rgba(69,0,249,0.2)" stroke-width="4" fill="none"/>
                        <circle class="progress-ring-circle" cx="40" cy="40" r="36" stroke="#4500F9" stroke-width="4" fill="none" stroke-dasharray="${2 * Math.PI * 36}" stroke-dashoffset="${2 * Math.PI * 36 - (percent / 100) * 2 * Math.PI * 36}" stroke-linecap="round"/>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center"><i class="fas ${module.icon} text-3xl text-neon-green"></i></div>
                </div>
                ${isCompleted ? '<div class="badge-neon px-3 py-1 rounded text-xs font-bold flex items-center gap-1"><i class="fas fa-check"></i> LISTO</div>' : ''}
                ${percent > 0 && !isCompleted ? `<div class="bg-blue-900/50 text-blue-300 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 border border-blue-500/30">${percent}%</div>` : ''}
                ${isLocked ? '<div class="neon-box px-3 py-1 rounded text-xs font-bold flex items-center gap-1 text-gray-400"><i class="fas fa-lock"></i> BLOQUEADO</div>' : ''}
            </div>
            <h3 class="text-2xl font-black mb-3 text-white">${module.title}</h3>
            <p class="text-gray-400 mb-4">${module.description}</p>
        `;
        if (!isLocked) {
            card.onclick = () => openModule(module.id);

            // Efecto 3D
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



    setTimeout(() => document.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('active'), i * 100)), 100);
}

function openModule(id) {
    currentModule = modules.find(m => m.id === id);

    // Recuperar progreso de lección
    const savedLesson = lessonProgress[currentModule.id];
    if (savedLesson !== undefined) {
        currentLesson = savedLesson;
    } else {
        currentLesson = currentModule.intro ? -1 : 0;
    }

    document.getElementById('modules-section').classList.add('hidden');
    document.getElementById('module-content').classList.remove('hidden');
    document.getElementById('hero-section').classList.add('hidden');
    document.getElementById('main-nav').style.display = 'none';
    loadLesson();
}

function closeModule() {
    document.getElementById('modules-section').classList.remove('hidden');
    document.getElementById('module-content').classList.add('hidden');
    document.getElementById('hero-section').classList.remove('hidden');
    document.getElementById('main-nav').style.display = 'block';

    if (currentModule) {
        saveLessonProgress();
    }
    currentModule = null;
    loadModules();
}

function saveLessonProgress() {
    if (currentModule && currentModule.id) {
        lessonProgress[currentModule.id] = currentLesson;
        localStorage.setItem('neopy-lesson-progress', JSON.stringify(lessonProgress));
    }
}

function loadLesson() {
    saveLessonProgress();
    const prevBtn = document.getElementById('prev-lesson');
    const nextBtn = document.getElementById('next-lesson');

    // MODO INTRODUCCIÓN
    if (currentLesson === -1) {
        document.getElementById('module-title').textContent = currentModule.title;
        document.getElementById('module-description').textContent = "Introducción";
        document.getElementById('lesson-content').innerHTML = currentModule.intro;

        // Boton Anterior desactivado en la intro
        prevBtn.disabled = true;
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-2"></i>ANTERIOR';

        // Boton Siguiente va a la lección 1
        nextBtn.innerHTML = 'COMENZAR LECCIONES <i class="fas fa-chevron-right ml-2"></i>';
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');

        window.scrollTo(0, 0);
        return;
    }

    // MODO LECCIÓN NORMAL
    const lesson = currentModule.lessons[currentLesson];
    document.getElementById('module-title').textContent = currentModule.title;
    document.getElementById('module-description').textContent = `Lección ${currentLesson + 1}: ${lesson.title}`;
    document.getElementById('lesson-content').innerHTML = lesson.content;

    // Configurar Botón Anterior
    if (currentLesson === 0) {
        if (currentModule.intro) {
            prevBtn.disabled = false;
            prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            prevBtn.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>INTRO';
        } else {
            prevBtn.disabled = true;
            prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-2"></i>ANTERIOR';
        }
    } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left mr-2"></i>ANTERIOR';
    }

    // Configurar Botón Siguiente (validación)
    if (lesson.validation) {
        nextBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Completa el reto';
        nextBtn.disabled = true;
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.innerHTML = currentLesson === currentModule.lessons.length - 1 ?
            'FINALIZAR UNIDAD <i class="fas fa-trophy ml-2"></i>' :
            'SIGUIENTE <i class="fas fa-chevron-right ml-2"></i>';
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    window.scrollTo(0, 0);
}

function nextLesson() {
    if (currentLesson === -1) {
        currentLesson = 0;
        loadLesson();
    } else if (currentLesson < currentModule.lessons.length - 1) {
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
    } else if (currentLesson === 0 && currentModule.intro) {
        currentLesson = -1;
        loadLesson();
    }
}

function completeModule() {
    progress[currentModule.id] = true;
    localStorage.setItem('neopy-progress', JSON.stringify(progress));

    // También actualizamos el progreso de lección al máximo
    lessonProgress[currentModule.id] = currentModule.lessons.length - 1;
    localStorage.setItem('neopy-lesson-progress', JSON.stringify(lessonProgress));

    showSuccessModal(`¡Completaste ${currentModule.title}!`, CONFIG.SUCCESS_IMAGE);
    // No cerramos automáticamente. Esperamos que el usuario haga clic en Continuar.
}

function showSuccessModal(message, imageSrc) {
    const modal = document.getElementById('success-modal');
    const msgEl = document.getElementById('success-message');
    const imgEl = document.getElementById('success-image');
    const iconEl = document.getElementById('success-icon');

    if (msgEl) msgEl.textContent = message;

    if (imageSrc && imgEl) {
        imgEl.src = imageSrc;
        imgEl.classList.remove('hidden');
        if (iconEl) iconEl.classList.add('hidden');
    } else {
        if (imgEl) imgEl.classList.add('hidden');
        if (iconEl) iconEl.classList.remove('hidden');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');

    // Si estamos en medio de una lección validada, no salimos (pero ya no usamos el modal para lecciones)
    // Así que asumimos que si se cierra el modal de exito, es porque terminó el modulo
    // O si el usuario simplemente lo cierra.

    // La logica actual es: Modal solo sale al FINALIZAR UNIDAD.
    // Así que al cerrarlo, debemos volver al menú.
    closeModule();
    loadModules();
    updateOverallProgress();
}

function updateOverallProgress() {
    const completed = Object.keys(progress).length;
    const total = modules ? modules.length : 0;
    document.getElementById('overall-progress').textContent = `${total > 0 ? Math.round((completed / total) * 100) : 0}%`;
}

function resetProgress() {
    if (confirm('¿Estás seguro de que quieres reiniciar tu progreso?')) {
        progress = {};
        lessonProgress = {};
        localStorage.removeItem('neopy-progress');
        localStorage.removeItem('neopy-lesson-progress');
        loadModules();
        updateOverallProgress();
    }
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

init();
