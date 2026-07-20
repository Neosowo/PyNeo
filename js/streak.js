const DAILY_CHALLENGE_KEY = 'PyNeo-daily-challenge';
const DB_USERS_STATS = 'leaderboard';
const STREAK_FREEZE_KEY = 'PyNeo-streak-freeze';
const LAST_AD_VIEW_KEY = 'PyNeo-last-ad-view';

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
        showNotification('Ya tienes el máximo de protectores (1) ❄️', 'info');
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
            localStorage.setItem(STREAK_FREEZE_KEY, freezes - 1);
            challenge.lastUpdate = yesterdayStr; 
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


function handleDailyChallengeClick() {
    if (typeof firebase !== 'undefined' && firebase.auth && !firebase.auth().currentUser) {
        if (typeof openLoginModal === 'function') {
            openLoginModal();
            return;
        }
    }

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

    
    const now = new Date();
    const dateStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Guayaquil'
    }).format(now); 

    
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0;
    }

    const index = Math.abs(hash) % window.dailyChallenges.length;
    const todayChallenge = window.dailyChallenges[index];

    
    if (typeof window.evaluations !== 'undefined') {
        if (!window.evaluations.find(e => e.id === todayChallenge.id)) {
            window.evaluations.push(todayChallenge);
        }
    }

    showNotification(`Reto del día: ${todayChallenge.title} ✨`, 'success');

    if (typeof startEvaluation === 'function') {
        startEvaluation(todayChallenge.id, false); 
    } else {
        console.error("startEvaluation not found");
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

    showNotification('¡Desafío diario completado! 🔥', 'success');
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

    // Prefer authenticated Firebase user, fall back to guest name
    let currentUser = null;
    let currentUID  = null;
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
        const authUser = firebase.auth().currentUser;
        currentUID  = authUser.uid;
        currentUser = (authUser.displayName || authUser.email || 'Usuario').split(' ')[0];
        // Keep pyneo_chat_user in sync with the real name
        localStorage.setItem('pyneo_chat_user', currentUser);
    } else {
        currentUser = localStorage.getItem('pyneo_chat_user');
    }
    if (!currentUser) return;

    // Document key: use UID when available (stable), else the chat username
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

        
        sessionStorage.removeItem(RANKING_CACHE_KEY);
    } catch (e) {
        console.warn("Firestore sync error:", e);
    }
}

const LAST_SYNC_TIME_KEY = 'PyNeo-last-sync-time';
const RANKING_CACHE_KEY = 'PyNeo-ranking-cache';
const CACHE_DURATION = 1 * 60 * 1000; 

async function showRanking() {
    
    await syncDailyChallengeWithFirestore(false, true);

    const modal = document.getElementById('ranking-modal');
    const list = document.getElementById('ranking-list');
    if (!modal || !list) return;

    modal.classList.remove('hidden');

    
    const cached = sessionStorage.getItem(RANKING_CACHE_KEY);
    if (cached) {
        const { timestamp, html } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            list.innerHTML = html;
            return;
        }
    }

    list.innerHTML = '<div class="flex justify-center p-8"><i class="fas fa-spinner fa-spin text-neon-green text-3xl"></i></div>';

    if (typeof db === 'undefined' || !db) {
        setTimeout(showRanking, 1000);
        return;
    }

    executeRankingFetch(list);
}

async function executeRankingFetch(list) {
    try {
        
        const now = new Date();
        const today = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Guayaquil'
        }).format(now);
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const yesterdayStr = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Guayaquil'
        }).format(yesterday);

        
        const querySnapshot = await db.collection(DB_USERS_STATS)
            .where('lastUpdate', 'in', [today, yesterdayStr])
            .limit(50)
            .get();

        let users = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            users.push({ id: doc.id, ...data });
        });

        
        users.sort((a, b) => {
            const streakA = parseInt(a.streak || 0);
            const streakB = parseInt(b.streak || 0);

            if (streakA !== streakB) {
                return Math.max(0, streakB) - Math.max(0, streakA); 
            }

            const getMillis = (ts) => {
                if (!ts) return 0;
                if (typeof ts.toDate === 'function') return ts.toDate().getTime();
                if (ts.seconds) return ts.seconds * 1000;
                if (ts instanceof Date) return ts.getTime();
                return 0;
            };
            return getMillis(a.streakTimestamp) - getMillis(b.streakTimestamp);
        });

        const top10 = users.slice(0, 10);

        list.innerHTML = '';
        let rank = 1;
        if (top10.length === 0) {
            list.innerHTML = '<p class="text-center text-gray-500 py-8">No hay datos aún.</p>';
            return;
        }

        top10.forEach(userData => {
            const data = userData;
            const _authUser = (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) ? firebase.auth().currentUser : null;
            const _myName   = localStorage.getItem('pyneo_chat_user');
            const isMe = (data.user === _myName) || (_authUser && data.uid === _authUser.uid);
            const item = document.createElement('div');
            item.className = `flex items-center justify-between p-4 rounded-xl mb-2 border transition-all ${isMe ? 'bg-primary/20 border-primary/50' : 'bg-white/5 border-white/5'}`;

            let isActive = false;
            if (data.lastActive && typeof data.lastActive.toDate === 'function') {
                const lastActiveTime = data.lastActive.toDate().getTime();
                isActive = (Date.now() - lastActiveTime) < 5 * 60 * 1000;
            }

            let rankIcon = rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `<span class="text-gray-500 w-8 text-center font-bold">${rank}</span>`;
            const color = typeof getStreakColor === 'function' ? getStreakColor(data.streak || 0) : '#f97316';

            item.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="text-xl w-8 flex justify-center">${rankIcon}</div>
                    <div class="relative">
                        <div class="flex flex-col">
                            <span class="font-bold text-sm ${data.color === 'glitch-effect' ? 'glitch-text text-white' : ''}" data-text="${data.user}" style="${data.color && data.color !== 'glitch-effect' ? 'color:' + data.color : ''}">${data.user || 'Anon'}</span>
                            <div class="flex items-center gap-2">
                                <div class="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div class="h-full bg-neon-green/50" style="width: ${data.progress || '0%'}"></div>
                                </div>
                                <span class="text-[8px] text-gray-600">${data.progress || '0%'}</span>
                            </div>
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

        
        sessionStorage.setItem(RANKING_CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            html: list.innerHTML
        }));

    } catch (error) {
        console.error("Ranking Error Details:", error);
        list.innerHTML = `
            <div class="text-center py-8">
                <p class="text-red-400 mb-2">Error al cargar ranking.</p>
                <p class="text-[10px] text-gray-600 px-4">${error.message || "Error desconocido"}</p>
                <button onclick="executeRankingFetch(document.getElementById('ranking-list'))" class="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] text-gray-400 uppercase tracking-widest border border-white/10 transition-all">Reintentar</button>
            </div>
        `;
    }
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
