const DAILY_CHALLENGE_KEY = 'PyNeo-daily-challenge';
const DB_USERS_STATS = 'leaderboard';
const STREAK_FREEZE_KEY = 'PyNeo-streak-freeze';
const LAST_AD_VIEW_KEY = 'PyNeo-last-ad-view';
const LAST_SYNC_TIME_KEY = 'PyNeo-last-sync-time';

function initStreak() {
    checkStreakLoss();
    updateDailyChallengeUI();
    
    setTimeout(() => {
        syncDailyChallengeWithFirestore();
    }, 500);
}

function getFreezes() {
    return parseInt(localStorage.getItem(STREAK_FREEZE_KEY) || "0");
}

function addFreeze() {
    let current = getFreezes();
    if (current >= 1) {
        showNotification('Ya tienes el maximo de protectores (1)', 'info');
        return false;
    }
    localStorage.setItem(STREAK_FREEZE_KEY, current + 1);
    showNotification('Has ganado un Protector de Racha.', 'success');
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
            localStorage.setItem(STREAK_FREEZE_KEY, freezes - 1);
            challenge.lastUpdate = yesterdayStr; 
            localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(challenge));
            showNotification('Tu Protector de Racha te ha salvado hoy.', 'info');
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

function handleStreakClick() {
    showStreakModal();
}

function handleDailyChallengeClick() {
    handleStreakClick();
}

function showStreakModal() {
    const modal = document.getElementById('streak-modal') || document.getElementById('ranking-modal');
    if (!modal) return;

    const challenge = getDailyChallenge();
    const countEl = document.getElementById('modal-streak-count');
    if (countEl) countEl.innerText = challenge.count;

    const now = new Date();
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guayaquil' }).format(now);
    const statusEl = document.getElementById('modal-streak-status');

    if (statusEl) {
        if (challenge.lastUpdate === today) {
            statusEl.className = 'p-3.5 rounded-xl border border-neon-green/30 bg-neon-green/5 text-neon-green text-xs font-semibold flex items-center gap-2.5';
            statusEl.innerHTML = '<i class="fas fa-check-circle text-sm"></i><span>Racha de hoy asegurada. Continua con tus lecciones en el curso.</span>';
        } else {
            statusEl.className = 'p-3.5 rounded-xl border border-orange-500/30 bg-orange-500/5 text-orange-300 text-xs font-semibold flex items-center gap-2.5';
            statusEl.innerHTML = '<i class="fas fa-clock text-sm"></i><span>Aun no has practicado hoy. Completa una leccion o ejercicio del curso para sumar tu racha.</span>';
        }
    }

    const freezes = getFreezes();
    const modalFreezeCount = document.getElementById('modal-freeze-count');
    if (modalFreezeCount) modalFreezeCount.innerText = `${freezes}/1`;

    modal.classList.remove('hidden');
}

function closeStreakModal() {
    const modal = document.getElementById('streak-modal') || document.getElementById('ranking-modal');
    if (modal) modal.classList.add('hidden');
}

function closeRanking() {
    closeStreakModal();
}

function showRanking() {
    showStreakModal();
}

function goToCourse() {
    closeStreakModal();
    const moduleContent = document.getElementById('module-content');
    if (moduleContent && !moduleContent.classList.contains('hidden')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const modulesSec = document.getElementById('modules-section');
    if (modulesSec) {
        modulesSec.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateStreak() { 
    const now = new Date();
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Guayaquil'
    }).format(now);

    let challenge = getDailyChallenge();

    if (challenge.lastUpdate === today) return;

    challenge.count++;
    challenge.lastUpdate = today;

    if (challenge.count % 7 === 0) {
        addFreeze();
    }

    localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(challenge));
    updateDailyChallengeUI();
    syncDailyChallengeWithFirestore(true);
    showNotification(`Racha de hoy sumada: ${challenge.count} ${challenge.count === 1 ? 'dia' : 'dias'}. Buen trabajo en el curso.`, 'success');
}

function getStreakColor(count) {
    if (count >= 30) return '#06b6d4'; 
    if (count >= 15) return '#a855f7'; 
    if (count >= 7) return '#ec4899';  
    if (count >= 3) return '#ef4444';  
    return '#f97316'; 
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

        const modalCount = document.getElementById('modal-freeze-count');
        if (modalCount) modalCount.innerText = `${freezes}/1`;

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

async function syncDailyChallengeWithFirestore(isNewCompletion = false, force = false) {
    if (typeof db === 'undefined' || !db) return;

    let currentUser = null;
    let currentUID  = null;
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
        const authUser = firebase.auth().currentUser;
        currentUID  = authUser.uid;
        currentUser = (authUser.displayName || authUser.email || 'Usuario').split(' ')[0];
        localStorage.setItem('pyneo_chat_user', currentUser);
    } else {
        currentUser = localStorage.getItem('pyneo_chat_user');
    }
    if (!currentUser) return;

    const docKey = currentUID || currentUser;

    const challenge = getDailyChallenge();
    const progressEl = document.getElementById('overall-progress');
    const userProgress = progressEl ? progressEl.innerText : '0%';
    const userColor = typeof getUserColor === 'function' ? getUserColor(currentUser) : (localStorage.getItem('PyNeo-user-color') || '#ffffff');

    const lastSync = localStorage.getItem(LAST_SYNC_TIME_KEY);
    const lastSyncedStreak = localStorage.getItem('PyNeo-last-synced-count');
    const now = Date.now();

    if (!force && !isNewCompletion && lastSync && (now - parseInt(lastSync) < 2 * 60 * 1000) && lastSyncedStreak == challenge.count) {
        return;
    }

    const data = {
        user: currentUser,
        uid: currentUID || null,
        streak: challenge.count,
        progress: userProgress,
        lastActive: firebase.firestore.FieldValue.serverTimestamp(),
        color: userColor,
        lastUpdate: challenge.lastUpdate
    };

    if (isNewCompletion) {
        data.streakTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    }

    try {
        await db.collection(DB_USERS_STATS).doc(docKey).set(data, { merge: true });

        localStorage.setItem(LAST_SYNC_TIME_KEY, now.toString());
        localStorage.setItem('PyNeo-last-synced-count', challenge.count.toString());
    } catch (e) {
        console.warn("Firestore sync error:", e);
    }
}

function watchAdForFreeze() {
    const lastView = localStorage.getItem(LAST_AD_VIEW_KEY);
    const now = Date.now();
    const COOLDOWN = 12 * 60 * 60 * 1000;

    if (lastView && (now - lastView < COOLDOWN)) {
        const timeLeft = Math.ceil((COOLDOWN - (now - lastView)) / (60 * 60 * 1000));
        showNotification(`Vuelve en ${timeLeft} horas para otro protector.`, 'info');
        return;
    }

    const adBlockTest = document.createElement('div');
    adBlockTest.innerHTML = '&nbsp;';
    adBlockTest.className = 'adsbox';
    document.body.appendChild(adBlockTest);
    const isAdBlockActive = adBlockTest.offsetHeight === 0;
    adBlockTest.remove();

    if (isAdBlockActive) {
        showNotification('Desactiva el AdBlock para ganar protecciones gratis.', 'error');
        return;
    }

    const modal = document.getElementById('ad-modal');
    const countdownEl = document.getElementById('ad-countdown');
    const closeBtn = document.getElementById('btn-close-ad');

    if (!modal) return;
    modal.classList.remove('hidden');

    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.warn('AdSense no disponible:', e);
    }

    let seconds = 15;
    let isPaused = false;

    const handleVisibilityChange = () => {
        if (document.hidden) {
            isPaused = true;
            if (countdownEl) countdownEl.innerHTML = '<span style="color:#f87171">Pausado</span>';
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
            if (countdownEl) countdownEl.innerHTML = '<span style="color:#4ade80;font-weight:bold">Listo</span>';
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
