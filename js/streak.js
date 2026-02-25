const DAILY_CHALLENGE_KEY = 'PyNeo-daily-challenge';
const DB_USERS_STATS = 'leaderboard';
const STREAK_FREEZE_KEY = 'PyNeo-streak-freeze';
const LAST_AD_VIEW_KEY = 'PyNeo-last-ad-view';

function initStreak() {
    checkStreakLoss();
    updateDailyChallengeUI();
    // Sync periodically if connected
    setTimeout(() => {
        syncDailyChallengeWithFirestore();
    }, 2000);
}

function getFreezes() {
    return parseInt(localStorage.getItem(STREAK_FREEZE_KEY) || "0");
}

function addFreeze() {
    let current = getFreezes();
    if (current >= 2) {
        showNotification('Ya tienes el máximo de protectores (2) ❄️', 'info');
        return false;
    }
    localStorage.setItem(STREAK_FREEZE_KEY, current + 1);
    showNotification('¡Has ganado un Protector de Racha! ❄️', 'success');
    updateDailyChallengeUI();
    return true;
}

function checkStreakLoss() {
    let challenge = getDailyChallenge();
    if (!challenge.lastUpdate || challenge.count === 0) return;

    const now = new Date();
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guayaquil' }).format(now);

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guayaquil' }).format(yesterday);

    if (challenge.lastUpdate !== today && challenge.lastUpdate !== yesterdayStr) {
        let freezes = getFreezes();
        if (freezes > 0) {
            console.log("❄️ Protector usado! Racha salvada.");
            localStorage.setItem(STREAK_FREEZE_KEY, freezes - 1);
            challenge.lastUpdate = yesterdayStr; // Simulate they did it yesterday to keep it alive
            localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(challenge));
            showNotification('¡Tu Protector de Racha te ha salvado hoy! ❄️', 'info');
        } else {
            challenge.count = 0;
            localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(challenge));
        }
    }
}

function getDailyChallenge() {
    const saved = localStorage.getItem(DAILY_CHALLENGE_KEY);
    if (!saved) return { count: 0, lastUpdate: null };
    try {
        return JSON.parse(saved);
    } catch (e) {
        return { count: 0, lastUpdate: null };
    }
}

// Main logic for the challenge button
function handleDailyChallengeClick() {
    const now = new Date();
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Guayaquil'
    }).format(now);

    const challenge = getDailyChallenge();

    if (challenge.lastUpdate === today) {
        showRanking();
        showNotification('¡Ya completaste tu reto de hoy! 🎯', 'info');
        return;
    }

    startRandomDailyExercise();
}

function startRandomDailyExercise() {
    if (typeof window.dailyChallenges === 'undefined' || window.dailyChallenges.length === 0) {
        showNotification('Cargando reto del día...', 'info');
        setTimeout(startRandomDailyExercise, 1000);
        return;
    }

    // Pick exactly one per day based on date (Guayaquil timezone)
    const now = new Date();
    const dateStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Guayaquil'
    }).format(now); // "YYYY-MM-DD"

    // Simple hash from date string to index
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0;
    }

    const index = Math.abs(hash) % window.dailyChallenges.length;
    const todayChallenge = window.dailyChallenges[index];

    // Inject into evaluations if not present so startEvaluation can find it
    if (typeof window.evaluations !== 'undefined') {
        if (!window.evaluations.find(e => e.id === todayChallenge.id)) {
            window.evaluations.push(todayChallenge);
        }
    }

    showNotification(`Reto del día: ${todayChallenge.title} ✨`, 'success');

    if (typeof startEvaluation === 'function') {
        startEvaluation(todayChallenge.id, false); // Sin tiempo
    } else {
        console.error("startEvaluation not found");
    }
}

function updateStreak() { // Compatibility name for app_eval.js and nextLesson()
    const now = new Date();
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Guayaquil'
    }).format(now);

    let challenge = getDailyChallenge();

    if (challenge.lastUpdate === today) return;

    challenge.count++;
    challenge.lastUpdate = today;

    // Duolingo Reward: Gain a freeze every 7 days
    if (challenge.count % 7 === 0) {
        addFreeze();
    }

    localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(challenge));
    updateDailyChallengeUI();
    syncDailyChallengeWithFirestore();

    showNotification('¡Desafío diario completado! 🔥', 'success');
}

function getStreakColor(count) {
    if (count >= 30) return '#06b6d4'; // Cyan/Master
    if (count >= 15) return '#a855f7'; // Purple
    if (count >= 7) return '#ec4899';  // Pink
    if (count >= 3) return '#ef4444';  // Red
    return '#f97316'; // Orange default
}

function updateDailyChallengeUI() {
    const challenge = getDailyChallenge();
    const countEl = document.getElementById('header-streak-count');
    const container = document.getElementById('streak-container');
    const freezes = getFreezes();

    if (countEl) {
        countEl.innerText = challenge.count;
    }

    const now = new Date();
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Guayaquil'
    }).format(now);

    if (container) {
        const icon = container.querySelector('i');
        const color = getStreakColor(challenge.count);

        // Protector Counter removed from header
        const modalCount = document.getElementById('modal-freeze-count');
        if (modalCount) modalCount.innerText = `${freezes}/2`;

        if (challenge.lastUpdate === today) {
            container.classList.remove('opacity-20');
            container.classList.add('opacity-100');
            container.style.borderColor = `${color}40`;
            if (icon) {
                icon.className = 'fas fa-fire text-sm animate-flame order-2';
                icon.style.color = color;
                icon.style.filter = `drop-shadow(0 0 8px ${color}60)`;
            }
            const countEl = document.getElementById('header-streak-count');
            if (countEl) countEl.classList.add('order-1');
        } else {
            container.classList.add('opacity-100');
            container.classList.remove('opacity-20');
            container.style.borderColor = 'rgba(255,255,255,0.1)';
            if (icon) {
                icon.className = 'fas fa-fire text-gray-500 text-sm order-2';
                icon.style.color = '';
                icon.style.filter = '';
            }
            const countEl = document.getElementById('header-streak-count');
            if (countEl) countEl.classList.add('order-1');
        }
    }
}

async function syncDailyChallengeWithFirestore() {
    if (typeof db === 'undefined' || !db) return;
    const currentUser = localStorage.getItem('pyneo_chat_user');
    if (!currentUser) return;

    const challenge = getDailyChallenge();
    const progressEl = document.getElementById('overall-progress');
    const userProgress = progressEl ? progressEl.innerText : '0%';
    const userColor = localStorage.getItem('PyNeo-user-color') || '#ffffff';

    try {
        await db.collection(DB_USERS_STATS).doc(currentUser).set({
            user: currentUser,
            streak: challenge.count, // Mapping count to 'streak' field for ranking
            progress: userProgress,
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
            color: userColor
        }, { merge: true });
    } catch (e) {
        console.warn("Firestore sync wait...");
    }
}

async function showRanking() {
    const modal = document.getElementById('ranking-modal');
    const list = document.getElementById('ranking-list');
    if (!modal || !list) return;

    modal.classList.remove('hidden');
    list.innerHTML = '<div class="flex justify-center p-8"><i class="fas fa-spinner fa-spin text-neon-green text-3xl"></i></div>';

    if (typeof db === 'undefined' || !db) {
        setTimeout(showRanking, 1000);
        return;
    }

    if (window.rankingUnsubscribe) window.rankingUnsubscribe();
    executeRankingRealtime(list);
}

function executeRankingRealtime(list) {
    window.rankingUnsubscribe = db.collection(DB_USERS_STATS)
        .orderBy('streak', 'desc')
        .limit(10)
        .onSnapshot(snapshot => {
            list.innerHTML = '';
            let rank = 1;
            if (snapshot.empty) {
                list.innerHTML = '<p class="text-center text-gray-500 py-8">No hay datos aún.</p>';
                return;
            }
            snapshot.forEach(doc => {
                const data = doc.data();
                const isMe = data.user === localStorage.getItem('pyneo_chat_user');
                const item = document.createElement('div');
                item.className = `flex items-center justify-between p-4 rounded-xl mb-2 border transition-all ${isMe ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-white/5'}`;
                let rankIcon = rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `<span class="text-gray-500 w-8 text-center font-bold">${rank}</span>`;
                const color = typeof getStreakColor === 'function' ? getStreakColor(data.streak || 0) : '#f97316';

                item.innerHTML = `
                    <div class="flex items-center gap-4">
                        <div class="text-xl w-8 flex justify-center">${rankIcon}</div>
                        <div class="flex flex-col">
                            <span class="font-bold text-sm ${data.color === 'glitch-effect' ? 'glitch-text text-white' : ''}" style="${data.color && data.color !== 'glitch-effect' ? 'color:' + data.color : ''}">${data.user || 'Anon'}</span>
                            <div class="flex items-center gap-2">
                                <div class="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div class="h-full bg-neon-green/50" style="width: ${data.progress || '0%'}"></div>
                                </div>
                                <span class="text-[8px] text-gray-600">${data.progress || '0%'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                        <span class="text-sm font-black text-white">${data.streak || 0}</span>
                        <i class="fas fa-fire text-[10px]" style="color: ${color}"></i>
                    </div>
                `;
                list.appendChild(item);
                rank++;
            });
        }, error => {
            console.error(error);
            list.innerHTML = '<p class="text-center text-red-400 py-8">Error al cargar ranking.</p>';
        });
}

function closeRanking() {
    const modal = document.getElementById('ranking-modal');
    if (modal) modal.classList.add('hidden');
}

function watchAdForFreeze() {
    const lastView = localStorage.getItem(LAST_AD_VIEW_KEY);
    const now = Date.now();
    const COOLDOWN = 12 * 60 * 60 * 1000;

    if (lastView && (now - lastView < COOLDOWN)) {
        const timeLeft = Math.ceil((COOLDOWN - (now - lastView)) / (60 * 60 * 1000));
        showNotification(`Vuelve en ${timeLeft} horas para otro protector ❄️`, 'info');
        return;
    }

    // --- DETECCIÓN DE ADBLOCK ---
    const adBlockTest = document.createElement('div');
    adBlockTest.innerHTML = '&nbsp;';
    adBlockTest.className = 'adsbox';
    document.body.appendChild(adBlockTest);
    const isAdBlockActive = adBlockTest.offsetHeight === 0;
    adBlockTest.remove();

    if (isAdBlockActive) {
        showNotification('Desactiva el AdBlock para ganar protecciones gratis 🛡️', 'error');
        return;
    }

    const modal = document.getElementById('ad-modal');
    const countdownEl = document.getElementById('ad-countdown');
    const closeBtn = document.getElementById('btn-close-ad');

    if (!modal) return;
    modal.classList.remove('hidden');

    // Inicializar el anuncio real de AdSense dentro del modal
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.warn('AdSense no disponible:', e);
    }

    let seconds = 15;
    let isPaused = false;

    // Detectar si el usuario cambia de pestaña (Trampa)
    const handleVisibilityChange = () => {
        if (document.hidden) {
            isPaused = true;
            if (countdownEl) countdownEl.innerHTML = '<span style="color:#f87171">⏳ Pausado</span>';
        } else {
            isPaused = false;
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const interval = setInterval(() => {
        if (isPaused) return;

        seconds--;
        if (countdownEl) countdownEl.innerText = `Espera ${seconds}s...`;

        if (seconds <= 0) {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (countdownEl) countdownEl.innerHTML = '<span style="color:#4ade80;font-weight:bold">¡LISTO!</span>';
            if (closeBtn) {
                closeBtn.disabled = false;
                closeBtn.classList.remove('text-gray-700', 'cursor-not-allowed');
                closeBtn.classList.add('text-white', 'cursor-pointer', 'bg-blue-500/30', 'border-blue-400/60');
            }
        }
    }, 1000);
}

function closeAdWithReward() {
    const modal = document.getElementById('ad-modal');
    if (modal) modal.classList.add('hidden');

    addFreeze();
    localStorage.setItem(LAST_AD_VIEW_KEY, Date.now().toString());

    // Reset button state for next time
    const closeBtn = document.getElementById('btn-close-ad');
    if (closeBtn) {
        closeBtn.disabled = true;
        closeBtn.classList.add('text-gray-700', 'cursor-not-allowed');
        closeBtn.classList.remove('text-white', 'hover:text-red-400', 'cursor-pointer');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initStreak();
});
