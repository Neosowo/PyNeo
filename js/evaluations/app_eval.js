
// Estado de la evaluación actual
let currentEval = null;
let currentQuestionIndex = 0;
let currentScore = 0;
let evalTimer = null;
let timeRemaining = 0;
let timerEnabled = true;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderEvaluations();
});

let currentFilterDifficulty = 'todos';

function filterEvaluations(difficulty) {
    currentFilterDifficulty = difficulty;

    // UI update for filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.innerText.toLowerCase();
        if (btnText === difficulty.toLowerCase()) {
            btn.classList.add('active');
        } else if (difficulty === 'todos' && btnText === 'todos') {
            btn.classList.add('active');
        }
    });

    renderEvaluations();
}

function searchEvaluations() {
    renderEvaluations();
}

function renderEvaluations() {
    const grid = document.getElementById('evaluations-grid');
    if (!grid) return;

    const searchTerm = (document.getElementById('eval-search')?.value || '').toLowerCase();

    grid.innerHTML = '';

    // Filtrar evaluaciones
    const filteredEvals = window.evaluations.filter(evalData => {
        const matchesFilter = currentFilterDifficulty === 'todos' || evalData.difficulty === currentFilterDifficulty;
        const matchesSearch = evalData.title.toLowerCase().includes(searchTerm) ||
            evalData.description.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    // Ordenar evaluaciones por ID
    const sortedEvals = filteredEvals.sort((a, b) => a.id - b.id);

    if (sortedEvals.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center neon-box">
                <i class="fas fa-search mb-4 text-4xl text-gray-700"></i>
                <p class="text-gray-500">No se encontraron ejercicios que coincidan con tu búsqueda.</p>
                <button onclick="resetFilters()" class="mt-4 text-neon-green hover:underline">Ver todos los ejercicios</button>
            </div>
        `;
        return;
    }

    sortedEvals.forEach(evalData => {
        const card = document.createElement('div');
        // ... rest of the card rendering logic remains the same ...
        let colorClass = 'green';
        if (evalData.difficulty === 'intermedio') colorClass = 'yellow';
        if (evalData.difficulty === 'avanzado') colorClass = 'red';
        if (evalData.difficulty === 'experto') colorClass = 'purple';
        if (evalData.difficulty === 'máster') colorClass = 'cyan';

        card.className = `neon-box p-6 transition-all cursor-pointer hover:scale-105 duration-300 relative overflow-hidden group reveal`;
        if (colorClass === 'purple') card.classList.add('hover:border-purple-500');
        else if (colorClass === 'cyan') card.classList.add('hover:border-cyan-500');
        else if (colorClass === 'red') card.classList.add('hover:border-red-500');
        else if (colorClass === 'yellow') card.classList.add('hover:border-yellow-500');
        else card.classList.add('hover:border-green-500');

        card.onclick = () => showEvalOptions(evalData.id);

        card.innerHTML = `
            <div class="absolute inset-0 bg-${colorClass}-500/5 group-hover:bg-${colorClass}-500/10 transition-all"></div>
            <div class="relative z-10">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-gray-800 text-white border border-gray-600 uppercase tracking-wider">${evalData.difficulty}</span>
                    <i class="fas ${evalData.icon} text-2xl text-gray-300 group-hover:text-white transition-colors"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors">${evalData.title}</h3>
                <p class="text-gray-400 text-sm mb-4 h-10 overflow-hidden">
                    ${evalData.description}
                </p>
                <div class="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-3">
                    <span><i class="fas fa-tasks mr-1"></i> ${evalData.questions.length} preguntas</span>
                    <span><i class="fas fa-clock mr-1"></i> ${evalData.timeLimit} min</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Re-activar animaciones de revelado
    setTimeout(() => {
        grid.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('active'), i * 50);
        });
    }, 10);
}

function resetFilters() {
    const searchInput = document.getElementById('eval-search');
    if (searchInput) searchInput.value = '';
    filterEvaluations('todos');
}

function showEvalOptions(id) {
    // Crear modal dinámicamente
    const modalId = 'eval-options-modal';
    let modal = document.getElementById(modalId);

    if (modal) modal.remove();

    const evalData = window.evaluations.find(e => e.id === id);
    if (!evalData) return;

    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in';
    modal.innerHTML = `
        <div class="bg-[#0a0a0a] border border-neon-green/30 rounded-xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(69,252,225,0.1)]">
            <button onclick="this.closest('#${modalId}').remove()" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                <i class="fas fa-times text-xl"></i>
            </button>
            
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas ${evalData.icon} text-3xl text-neon-green"></i>
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">${evalData.title}</h2>
                <p class="text-gray-400 text-sm">Selecciona tu modo de juego</p>
            </div>
            
            <div class="space-y-4">
                <button onclick="startEvaluation(${id}, true)" class="w-full neon-box p-4 hover:bg-neon-green/10 transition-all flex items-center justify-between group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 group-hover:text-red-300">
                            <i class="fas fa-stopwatch"></i>
                        </div>
                        <div class="text-left">
                            <h4 class="font-bold text-white">Modo Reto</h4>
                            <p class="text-xs text-gray-400">Con límite de tiempo (${evalData.timeLimit} min)</p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-600 group-hover:text-white"></i>
                </button>
                
                <button onclick="startEvaluation(${id}, false)" class="w-full neon-box p-4 hover:bg-neon-green/10 transition-all flex items-center justify-between group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-blue-300">
                            <i class="fas fa-infinity"></i>
                        </div>
                        <div class="text-left">
                            <h4 class="font-bold text-white">Modo Práctica</h4>
                            <p class="text-xs text-gray-400">Sin presión de tiempo</p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-600 group-hover:text-white"></i>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function startEvaluation(id, useTimer) {
    const modal = document.getElementById('eval-options-modal');
    if (modal) modal.remove();

    currentEval = window.evaluations.find(e => e.id === id);
    if (!currentEval) return;

    currentQuestionIndex = 0;
    currentScore = 0;
    timerEnabled = useTimer;

    if (timerEnabled) {
        timeRemaining = currentEval.timeLimit * 60;
    } else {
        timeRemaining = 0; // No importa
    }

    // UI Updates
    document.getElementById('exercises-section').classList.add('hidden');
    document.getElementById('hero-section').classList.add('hidden');
    document.getElementById('modules-section').classList.add('hidden');
    document.getElementById('evaluation-content').classList.remove('hidden');

    // Ocultar NAV GLOBAL
    const nav = document.getElementById('main-nav');
    if (nav) nav.style.display = 'none';

    document.getElementById('eval-title').innerText = currentEval.title;
    document.getElementById('current-score').innerText = '0';

    // Configurar Timer Display
    const timerDiv = document.getElementById('eval-timer');
    if (timerEnabled) {
        timerDiv.classList.remove('hidden');
    } else {
        timerDiv.classList.add('hidden');
    }

    loadQuestion();
    startTimer();

    window.scrollTo(0, 0);
}

function closeEvaluation() {
    stopTimer();
    currentEval = null;

    // Restaurar NAV GLOBAL
    const nav = document.getElementById('main-nav');
    if (nav) nav.style.display = 'block'; // O 'flex' dependiendo del diseño original, 'block' suele ser seguro para navs full width.

    document.getElementById('evaluation-content').classList.add('hidden');
    document.getElementById('exercises-section').classList.remove('hidden');
    document.getElementById('hero-section').classList.remove('hidden');
    document.getElementById('modules-section').classList.remove('hidden');
}

function loadQuestion() {
    if (!currentEval) return;

    // Update Progress Bar
    const progress = ((currentQuestionIndex) / currentEval.questions.length) * 100;
    document.getElementById('eval-progress-bar').style.width = `${progress}%`;

    if (currentQuestionIndex >= currentEval.questions.length) {
        finishEvaluation();
        return;
    }

    const question = currentEval.questions[currentQuestionIndex];
    const container = document.getElementById('question-content');

    container.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <span class="text-gray-500 text-sm font-mono">Pregunta ${currentQuestionIndex + 1} / ${currentEval.questions.length}</span>
            <span class="bg-neon-green/20 text-neon-green border border-neon-green/50 text-xs px-3 py-1 rounded font-bold">+${question.points} PTS</span>
        </div>
        <div class="text-lg leading-relaxed">
            ${question.question}
        </div>
    `;

    // Reset output and editor visibility and content
    const editorContainer = document.querySelector('.code-editor');
    const outputContainer = document.getElementById('eval-output');

    editorContainer.classList.remove('hidden');
    outputContainer.classList.remove('hidden');

    document.getElementById('eval-code-editor').value = '';
    outputContainer.innerHTML = '<div class="text-gray-600 italic text-sm text-center py-4">El resultado de tu código aparecerá aquí...</div>';
}

function startTimer() {
    stopTimer();
    if (!timerEnabled) return;

    updateTimerDisplay();

    evalTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            stopTimer();
            // alert("¡Se acabó el tiempo!"); // Intrusivo, mejor modal final directo
            finishEvaluation(true); // true indica timeout
        }
    }, 1000);
}

function stopTimer() {
    if (evalTimer) {
        clearInterval(evalTimer);
        evalTimer = null;
    }
}

function updateTimerDisplay() {
    if (!timerEnabled) return;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const timerElement = document.getElementById('eval-timer').querySelector('span');
    if (timerElement) timerElement.innerText = display;

    if (timeRemaining < 60) {
        document.getElementById('eval-timer').classList.add('text-red-500', 'animate-pulse');
        document.getElementById('eval-timer').classList.remove('text-neon-green');
    } else {
        document.getElementById('eval-timer').classList.remove('text-red-500', 'animate-pulse');
        document.getElementById('eval-timer').classList.add('text-neon-green');
    }
}

function runEvaluation() {
    const code = document.getElementById('eval-code-editor').value;
    const outputElement = document.getElementById('eval-output');

    if (!code.trim()) {
        outputElement.innerHTML = '<p class="text-yellow-400 font-bold"><i class="fas fa-exclamation-triangle mr-2"></i>Escribe código para continuar.</p>';
        return;
    }

    outputElement.innerHTML = '<p class="text-neon-green animate-pulse"><i class="fas fa-terminal mr-2"></i>Ejecutando script...</p>';

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
                const userInput = window.prompt(prompt || "Input:");
                output += (userInput || "") + "\n";
                resolve(userInput || "");
            });
        }
    });

    const runBtn = document.querySelector('button[onclick="runEvaluation()"]');
    if (runBtn) {
        runBtn.disabled = true;
        runBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

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

            outputElement.innerHTML = `
                <div class="flex justify-between items-center mb-2 border-b border-gray-700 pb-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">Terminal Output</span>
                    <span class="text-xs text-gray-600">Python 3.x</span>
                </div>
                <pre class="text-white font-mono text-sm whitespace-pre-wrap">${escapedOutput}</pre>
            `;

            checkAnswer(code, output.trim()); // Trim al output total para evitar saltos de linea finales
        },
        function (err) {
            outputElement.innerHTML = `
                <div class="bg-red-500/10 border border-red-500/50 rounded p-3">
                    <p class="text-red-400 font-bold text-sm"><i class="fas fa-bug mr-2"></i>Error de Ejecución</p>
                    <pre class="text-red-300 mt-2 text-xs font-mono overflow-auto">${err.toString()}</pre>
                </div>
            `;
        }
    ).finally(() => {
        if (runBtn) {
            runBtn.disabled = false;
            runBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
}

function checkAnswer(code, output) {
    const currentQ = currentEval.questions[currentQuestionIndex];
    let isCorrect = false;

    // Normalizar outputs
    // Eliminar espacios al final de cada línea del output esperado y real
    const normalizedOutput = output.split('\n').map(l => l.trimRight()).join('\n');
    const normalizedExpected = currentQ.expectedOutput.split('\n').map(l => l.trimRight()).join('\n');

    // Criterios de Validación
    if (normalizedOutput === normalizedExpected) {
        isCorrect = true;
    } else if (currentQ.expectedOutput.length > 5 && normalizedOutput.includes(normalizedExpected)) {
        // Fallback para outputs parciales complejos
        isCorrect = true;
    }

    const outputElement = document.getElementById('eval-output');

    if (isCorrect) {
        currentScore += currentQ.points;
        const scoreEl = document.getElementById('current-score');

        // Animación de puntos
        scoreEl.classList.add('text-neon-green', 'scale-125');
        setTimeout(() => scoreEl.classList.remove('scale-125'), 300);
        scoreEl.innerText = currentScore;

        outputElement.innerHTML += `
            <div class="mt-4 pt-4 border-t border-gray-700 animate-slide-up">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-lg">
                        <i class="fas fa-check"></i>
                    </div>
                    <div>
                        <p class="text-neon-green font-bold text-lg">¡Correcto!</p>
                        <p class="text-xs text-gray-500">+${currentQ.points} puntos añadidos</p>
                    </div>
                </div>
                <button onclick="nextQuestion()" class="w-full btn-neon py-3 rounded text-white font-bold hover:bg-white hover:text-black transition-all">
                    CONTINUAR <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        `;
    } else {
        outputElement.innerHTML += `
             <div class="mt-4 pt-4 border-t border-gray-700 animate-slide-up">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-lg border border-red-500/50">
                        <i class="fas fa-times"></i>
                    </div>
                    <div>
                        <p class="text-red-400 font-bold text-lg">Respuesta Incorrecta</p>
                        <p class="text-xs text-gray-500">Revisa tu código e inténtalo de nuevo</p>
                    </div>
                </div>
                
                <div class="bg-gray-900/50 p-3 rounded mb-3 border border-gray-700">
                    <p class="text-xs text-gray-400 mb-1">Se esperaba ver:</p>
                    <pre class="text-neon-green font-mono text-xs">${currentQ.expectedOutput}</pre>
                </div>

                <div class="flex gap-2">
                    <button onclick="runEvaluation()" class="flex-1 border border-white/20 hover:border-white text-white py-2 rounded transition-all text-sm">
                        <i class="fas fa-undo mr-2"></i>Reintentar
                    </button>
                    <button onclick="nextQuestion()" class="flex-1 text-gray-500 hover:text-white py-2 transition-all text-sm">
                        Saltar (+0 pts) <i class="fas fa-forward ml-1"></i>
                    </button>
                </div>
            </div>
        `;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();

    // Smooth scroll al top de la pregunta
    const container = document.getElementById('evaluation-content');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth' });
    }
}

function finishEvaluation(timeout = false) {
    stopTimer();
    document.getElementById('eval-progress-bar').style.width = '100%';

    const container = document.getElementById('question-content');
    const maxScore = currentEval.questions.reduce((acc, q) => acc + q.points, 0);
    const percentage = Math.round((currentScore / maxScore) * 100);

    let message = "";
    let color = "";
    let icon = "";

    if (timeout) {
        message = "¡Se acabó el tiempo! Pero buen esfuerzo.";
        color = "text-yellow-400";
        icon = "fa-hourglass-end";
    } else if (percentage >= 90) {
        message = "¡IMPRESIONANTE! Nivel Experto desbloqueado.";
        color = "text-neon-green";
        icon = "fa-trophy";
    } else if (percentage >= 70) {
        message = "¡MUY BIEN! Vas por buen camino.";
        color = "text-blue-400";
        icon = "fa-thumbs-up";
    } else {
        message = "Sigue practicando. ¡No te rindas!";
        color = "text-red-400";
        icon = "fa-dumbbell";
    }

    container.innerHTML = `
        <div class="text-center py-8 animate-fade-in">
            <div class="w-24 h-24 ${color} bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-lg border-2 border-current">
                <i class="fas ${icon}"></i>
            </div>
            
            <h3 class="text-4xl font-black text-white mb-2">Evaluación Finalizada</h3>
            <p class="text-xl text-gray-300 mb-8 max-w-lg mx-auto">${message}</p>
            
            <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
                <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div class="text-3xl font-black text-white mb-1">${percentage}%</div>
                    <div class="text-xs text-gray-500 uppercase">Precisión</div>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div class="text-3xl font-black text-white mb-1">${currentScore}</div>
                    <div class="text-xs text-gray-500 uppercase">Puntos Totales</div>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div class="text-3xl font-black text-white mb-1">
                        ${timerEnabled ? Math.floor((currentEval.timeLimit * 60 - timeRemaining) / 60) + ' min' : '--'}
                    </div>
                    <div class="text-xs text-gray-500 uppercase">Tiempo</div>
                </div>
            </div>
            
            <button onclick="closeEvaluation()" class="btn-neon px-8 py-4 rounded-lg font-bold text-white uppercase tracking-wider text-lg shadow-lg hover:shadow-neon-green/50 transition-all transform hover:-translate-y-1">
                Volver al Menú Principal
            </button>
        </div>
    `;

    // Hide editor and output in final screen
    document.querySelector('.code-editor').classList.add('hidden');
    document.getElementById('eval-output').classList.add('hidden');
}
