(function () {
    const STORAGE_KEY = 'pyneo_perf_mode';
    let currentMode = localStorage.getItem(STORAGE_KEY) || 'auto';
    let isLowSpecActive = false;
    let observerAttached = false;
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
            const gl = canvas.getContext('webgl', { powerPreference: 'low-power' });
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
                    if (/swiftshader|llvmpipe|softpipe|software|mesa|microsoft basic render|intel hd|intel uhd|intel iris|intel graphics|mali|adreno|powervr|radeon vega/i.test(renderer)) {
                        hardwareSpecs.isSoftwareGPU = true;
                    }
                }
                const loseExt = gl.getExtension('WEBGL_lose_context');
                if (loseExt) loseExt.loseContext();
            } else {
                hardwareSpecs.isSoftwareGPU = true;
            }
            canvas.width = 0;
            canvas.height = 0;
        } catch (e) {
            hardwareSpecs.isSoftwareGPU = false;
        }

        const isLowEnd = (
            hardwareSpecs.cores <= 4 ||
            hardwareSpecs.memory <= 4 ||
            hardwareSpecs.isSoftwareGPU ||
            hardwareSpecs.saveData ||
            hardwareSpecs.prefersReducedMotion
        );

        return isLowEnd;
    }

    function injectPerformanceStyles() {
        if (document.getElementById('pyneo-perf-styles')) return;

        const style = document.createElement('style');
        style.id = 'pyneo-perf-styles';
        style.textContent = `
            /* Desactivar animaciones continuas especificas */
            .low-spec-mode .marquee-inner-py,
            .low-spec-mode .animate-pulse,
            .low-spec-mode .animate-bounce,
            .low-spec-mode .animate-flame,
            .low-spec-mode .glitch-text {
                animation: none !important;
            }

            /* Mantener funcionales spinners esenciales */
            .low-spec-mode .animate-spin,
            .low-spec-mode [style*="animation:spin"],
            .low-spec-mode [style*="animation: spin"] {
                animation: spin 1s linear infinite !important;
            }

            /* Desactivar backdrop-filter solo en modales y overlays */
            .low-spec-mode .nav-fixed,
            .low-spec-mode header,
            .low-spec-mode #main-nav,
            .low-spec-mode .modal-card,
            .low-spec-mode [id*="modal"] {
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
            .low-spec-mode .modal-card {
                background: #121216 !important;
                box-shadow: none !important;
                filter: none !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }

            /* Ocultar capas decorativas pesadas, blobs y halo del cursor */
            .low-spec-mode #hero-blobs,
            .low-spec-mode .glow-blob,
            .low-spec-mode .gm-blob,
            .low-spec-mode .gm-blob-1,
            .low-spec-mode .gm-blob-2,
            .low-spec-mode .gm-blob-3,
            .low-spec-mode .glow-mesh,
            .low-spec-mode .cursor-glow,
            .low-spec-mode #cursor-glow,
            .low-spec-mode .ambient-glow {
                display: none !important;
            }

            /* Desactivar animacion de glitch y sus pseudo-elementos */
            .low-spec-mode .glitch-text::before,
            .low-spec-mode .glitch-text::after {
                display: none !important;
            }

            /* Detener desplazamiento de marquesina */
            .low-spec-mode .marquee-inner-py {
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

            /* Blindaje inmutable contra escalado o crecimiento en la palabra Python */
            .text-gradient-anim,
            #hero-section h1 span,
            #hero-section h1,
            .hero-badge {
                transform: none !important;
                max-width: 100% !important;
            }

            .text-gradient-anim {
                font-size: inherit !important;
                display: inline-block !important;
                line-height: 1 !important;
                animation: none !important;
                transition: none !important;
            }

            /* Estilo universal y posicionamiento para el boton de cerrar en modales */
            .login-modal-close {
                position: absolute !important;
                top: 1.25rem !important;
                right: 1.25rem !important;
                width: 32px !important;
                height: 32px !important;
                background: rgba(255, 255, 255, 0.05) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 8px !important;
                color: #94a3b8 !important;
                font-size: 1rem !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                z-index: 50 !important;
            }

            .login-modal-close:hover {
                background: rgba(255, 255, 255, 0.15) !important;
                color: #ffffff !important;
                border-color: rgba(255, 255, 255, 0.25) !important;
            }

            .low-spec-mode body,
            .low-spec-mode html {
                background-color: #09090b !important;
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

        if (typeof window !== 'undefined') {
            if (document.readyState === 'complete') {
                setTimeout(runFrameRateBenchmark, 1500);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(runFrameRateBenchmark, 1500);
                }, { once: true });
            }
        }
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

            if (frameCount < 30) {
                requestAnimationFrame(measureFrame);
            } else {
                const stableDeltas = frameDeltas.slice(5);
                const avgDelta = stableDeltas.reduce((a, b) => a + b, 0) / stableDeltas.length;
                hardwareSpecs.fpsAverage = Math.round(1000 / avgDelta);

                if (avgDelta > 32) {
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

    function optimizeAceEditorIfPresent() {
        if (window.aceEditor && typeof window.aceEditor.setAnimatedScroll === 'function') {
            if (isLowSpecActive) {
                window.aceEditor.setAnimatedScroll(false);
                window.aceEditor.renderer.setAnimateScroll(false);
            }
        }
    }

    function attachToNavbars() {
        optimizeAceEditorIfPresent();
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
                    window.caches.delete(key);
                });
            }).catch(() => {});
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                for (let r of registrations) {
                    r.unregister();
                }
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
