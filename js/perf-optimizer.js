(function () {
    const STORAGE_KEY = 'pyneo_perf_mode';
    let currentMode = localStorage.getItem(STORAGE_KEY) || 'auto';
    let isLowSpecActive = false;
    let hardwareSpecs = {
        cores: navigator.hardwareConcurrency || 4,
        memory: navigator.deviceMemory || 8,
        isSoftwareGPU: false,
        prefersReducedMotion: false,
        saveData: false,
        fpsAverage: 60
    };

    function probeHardware() {
        hardwareSpecs.prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        hardwareSpecs.saveData = !!(navigator.connection && navigator.connection.saveData);

        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
                    if (/swiftshader|llvmpipe|softpipe|software|mesa|microsoft basic render|intel hd graphics 2|intel hd graphics 3|intel hd graphics 400|intel hd graphics 500|intel hd graphics 600|mali-400|mali-450|adreno 300/i.test(renderer)) {
                        hardwareSpecs.isSoftwareGPU = true;
                    }
                }
            } else {
                hardwareSpecs.isSoftwareGPU = true;
            }
        } catch (e) {
            hardwareSpecs.isSoftwareGPU = false;
        }

        const isLowEnd = (
            hardwareSpecs.cores <= 4 ||
            hardwareSpecs.memory <= 4 ||
            hardwareSpecs.isSoftwareGPU ||
            hardwareSpecs.prefersReducedMotion ||
            hardwareSpecs.saveData
        );

        return isLowEnd;
    }

    function injectPerformanceStyles() {
        if (document.getElementById('pyneo-perf-styles')) return;

        const style = document.createElement('style');
        style.id = 'pyneo-perf-styles';
        style.textContent = `
            /* Reglas globales de ultra bajo consumo */
            .low-spec-mode *,
            .low-spec-mode *::before,
            .low-spec-mode *::after {
                animation-duration: 0.001ms !important;
                animation-iteration-count: 1 !important;
            }

            /* Mantener funcionales indicadores esenciales de carga */
            .low-spec-mode .animate-spin,
            .low-spec-mode [style*="animation:spin"],
            .low-spec-mode [style*="animation: spin"] {
                animation: spin 1s linear infinite !important;
            }

            /* Desactivar backdrop-filter (blur) costoso en GPU integrada */
            .low-spec-mode * {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            /* Fondos solidos y limpios */
            .low-spec-mode .nav-fixed,
            .low-spec-mode .nav-fixed.scrolled,
            .low-spec-mode header,
            .low-spec-mode #main-nav {
                background: #09090b !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            }

            .low-spec-mode .neon-box,
            .low-spec-mode .stat-pill,
            .low-spec-mode .code-terminal,
            .low-spec-mode .modal-card,
            .low-spec-mode .bg-black\\/80,
            .low-spec-mode .bg-black\\/90,
            .low-spec-mode [class*="bg-black/"] {
                background: #121216 !important;
                box-shadow: none !important;
                filter: none !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }

            /* Ocultar capas decorativas pesadas y gradientes radiales continuos */
            .low-spec-mode #hero-blobs,
            .low-spec-mode .glow-blob,
            .low-spec-mode .blob-1,
            .low-spec-mode .blob-2,
            .low-spec-mode .blob-3,
            .low-spec-mode [class*="blob-drift"],
            .low-spec-mode .ambient-glow {
                display: none !important;
            }

            /* Desactivar animacion de glitch y sus pseudo-elementos */
            .low-spec-mode .glitch-text::before,
            .low-spec-mode .glitch-text::after {
                display: none !important;
            }

            .low-spec-mode .glitch-text {
                animation: none !important;
                text-shadow: none !important;
            }

            /* Detener desplazamiento de marquesina */
            .low-spec-mode .marquee-inner-py {
                animation: none !important;
                transform: none !important;
                white-space: normal !important;
            }

            /* Eliminar sombras difusas y filtros de texto */
            .low-spec-mode .text-gradient-anim,
            .low-spec-mode h1,
            .low-spec-mode h2,
            .low-spec-mode h3 {
                filter: none !important;
                text-shadow: none !important;
            }

            /* Transiciones inmediatas para eliminar retraso visual */
            .low-spec-mode * {
                transition-duration: 0.05s !important;
            }

            /* Boton selector de rendimiento en navbar */
            .perf-toggle-btn {
                font-family: inherit;
                font-size: 11px;
                letter-spacing: 0.05em;
                font-weight: 700;
                padding: 6px 12px;
                border-radius: 9999px;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid rgba(255, 255, 255, 0.12);
                background: rgba(255, 255, 255, 0.04);
                color: #94a3b8;
                user-select: none;
            }

            .perf-toggle-btn:hover {
                background: rgba(255, 255, 255, 0.08);
                color: #e2e8f0;
                border-color: rgba(255, 255, 255, 0.25);
            }

            .perf-toggle-btn.active-low {
                background: rgba(99, 102, 241, 0.15);
                color: #a5b4fc;
                border-color: rgba(99, 102, 241, 0.4);
            }

            .perf-toggle-btn .perf-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #64748b;
                display: inline-block;
            }

            .perf-toggle-btn.active-low .perf-dot {
                background: #818cf8;
            }

            /* Neutralizacion definitiva contra cualquier remanente del modo cinematico */
            .cinematic-mode,
            body.cinematic-mode {
                background: #09090b !important;
            }

            body.cinematic-mode #main-nav,
            body.cinematic-mode .hero-badge,
            body.cinematic-mode #hero-p-left,
            body.cinematic-mode #hero-cta-wrap,
            body.cinematic-mode #hero-stats,
            body.cinematic-mode #hero-marquee-band,
            body.cinematic-mode .hide-on-idle,
            .hide-on-idle {
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: none !important;
                visibility: visible !important;
                display: inline-block !important;
            }

            body.cinematic-mode .text-gradient-anim {
                font-size: inherit !important;
                transform: none !important;
                filter: none !important;
                white-space: normal !important;
                line-height: inherit !important;
            }

            body.cinematic-mode #hero-section {
                padding-top: 100px !important;
                padding-bottom: 2rem !important;
                display: flex !important;
            }
        `;
        document.head.appendChild(style);
    }

    function applyState(shouldBeLowSpec) {
        isLowSpecActive = shouldBeLowSpec;
        injectPerformanceStyles();

        if (shouldBeLowSpec) {
            document.documentElement.classList.add('low-spec-mode');
            if (document.body) document.body.classList.add('low-spec-mode');
        } else {
            document.documentElement.classList.remove('low-spec-mode');
            if (document.body) document.body.classList.remove('low-spec-mode');
        }

        if (window.gsap && window.gsap.ticker) {
            if (shouldBeLowSpec) {
                window.gsap.ticker.fps(30);
            } else {
                window.gsap.ticker.fps(60);
            }
        }

        updateButtonsUI();
    }

    function evaluateAndApply() {
        if (currentMode === 'low') {
            applyState(true);
            return;
        }

        if (currentMode === 'high') {
            applyState(false);
            return;
        }

        const isLowEnd = probeHardware();
        applyState(isLowEnd);

        runFrameRateBenchmark();
    }

    function runFrameRateBenchmark() {
        if (currentMode !== 'auto') return;

        let frameCount = 0;
        let lastTime = performance.now();
        const frameDeltas = [];

        function measureFrame(now) {
            const delta = now - lastTime;
            lastTime = now;
            frameDeltas.push(delta);
            frameCount++;

            if (frameCount < 15) {
                requestAnimationFrame(measureFrame);
            } else {
                const avgDelta = frameDeltas.slice(1).reduce((a, b) => a + b, 0) / (frameDeltas.length - 1);
                hardwareSpecs.fpsAverage = Math.round(1000 / avgDelta);

                if (avgDelta > 28) {
                    applyState(true);
                }
            }
        }

        requestAnimationFrame(measureFrame);
    }

    function setMode(mode) {
        if (mode !== 'auto' && mode !== 'low' && mode !== 'high') return;
        currentMode = mode;
        localStorage.setItem(STORAGE_KEY, mode);
        evaluateAndApply();

        const message = mode === 'low'
            ? 'Modo de bajo consumo activado'
            : (mode === 'high' ? 'Modo de alto rendimiento activado' : 'Modo automatico por capacidad activado');

        if (window.showNotification) {
            window.showNotification(message, 'info');
        }
    }

    function toggleMode() {
        if (currentMode === 'auto') {
            setMode(isLowSpecActive ? 'high' : 'low');
        } else if (currentMode === 'low') {
            setMode('high');
        } else {
            setMode('auto');
        }
    }

    function updateButtonsUI() {
        const buttons = document.querySelectorAll('.perf-toggle-btn');
        buttons.forEach(btn => {
            const textEl = btn.querySelector('.perf-label');
            if (isLowSpecActive) {
                btn.classList.add('active-low');
                if (textEl) {
                    textEl.textContent = currentMode === 'low' ? 'Bajo Consumo: Forzado' : 'Bajo Consumo: Auto';
                }
                btn.title = 'Modo de ultra bajo consumo activado para maximizar fluidez. Clic para cambiar.';
            } else {
                btn.classList.remove('active-low');
                if (textEl) {
                    textEl.textContent = currentMode === 'high' ? 'Rendimiento: Alto' : 'Rendimiento: Estandar';
                }
                btn.title = 'Modo estandar. Clic para alternar a modo de bajo consumo.';
            }
        });
    }

    function createNavbarButton() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'perf-toggle-btn';
        btn.innerHTML = '<span class="perf-dot"></span><span class="perf-label">Rendimiento</span>';
        btn.onclick = toggleMode;
        return btn;
    }

    function optimizeAceEditorIfPresent() {
        if (window.aceEditor && typeof window.aceEditor.setAnimatedScroll === 'function') {
            if (isLowSpecActive) {
                window.aceEditor.setAnimatedScroll(false);
                window.aceEditor.renderer.setAnimateScroll(false);
            }
        }
    }

    function attachToNavbars() {
        updateButtonsUI();

        const selectors = [
            '#main-nav .container > div > div:last-child',
            '#main-nav div.flex.items-center.justify-between > div.flex.items-center:last-child',
            '#main-nav > div.flex.items-center.gap-4',
            'header .flex.items-center:last-child'
        ];

        selectors.forEach(sel => {
            const target = document.querySelector(sel);
            if (target && !target.querySelector('.perf-toggle-btn')) {
                const btn = createNavbarButton();
                target.insertBefore(btn, target.firstChild);
            }
        });

        optimizeAceEditorIfPresent();
        updateButtonsUI();
    }

    function neutralizeIdleRemnants() {
        if (document.body) {
            document.body.classList.remove('cinematic-mode');
        }
        if (typeof window.idleTimer !== 'undefined' && window.idleTimer) {
            clearTimeout(window.idleTimer);
            window.idleTimer = null;
        }
        window.enterCinematicMode = function () {
            if (document.body) document.body.classList.remove('cinematic-mode');
        };
        window.startIdleTimer = function () {};
        window.stopIdleTimer = function () {};

        if (typeof window !== 'undefined' && 'caches' in window) {
            window.caches.keys().then(keys => {
                keys.forEach(key => {
                    if (key !== 'pyneo-v3') {
                        window.caches.delete(key);
                    }
                });
            }).catch(() => {});
        }
    }

    neutralizeIdleRemnants();
    evaluateAndApply();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            neutralizeIdleRemnants();
            injectPerformanceStyles();
            attachToNavbars();
        });
    } else {
        neutralizeIdleRemnants();
        injectPerformanceStyles();
        attachToNavbars();
    }

    window.addEventListener('load', neutralizeIdleRemnants);

    window.PyNeoPerf = {
        isLowSpec: () => isLowSpecActive,
        getMode: () => currentMode,
        setMode: setMode,
        toggle: toggleMode,
        getHardwareSpecs: () => ({ ...hardwareSpecs }),
        refreshUI: attachToNavbars
    };
})();
