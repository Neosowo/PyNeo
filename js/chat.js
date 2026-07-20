


const firebaseConfig = {
  apiKey: "AIzaSyAeGa7XKpH8ZQVWLy3B3GdhtaRNybAWXt0",
  authDomain: "rkpython-2693e.firebaseapp.com",
  databaseURL: "https://rkpython-2693e-default-rtdb.firebaseio.com",
  projectId: "rkpython-2693e",
  storageBucket: "rkpython-2693e.firebasestorage.app",
  messagingSenderId: "468870185966",
  appId: "1:468870185966:web:97127e5d27cacb6dafc4ff",
  measurementId: "G-XM4B9JB636"
};

let db = null;
let unsubscribe = null;
let currentUser = null;
let onlineUpdater = null;
let chatInactivityTimer = null;
let isUserBanned = false;



const BASE_COOLDOWN_MS = 5000; 
let currentOnlineCount = 1; 
let lastMessageTime = 0;
let lastMessageText = "";


const BASE_BAD_WORDS = [
    
    "puta", "puto", "mierda", "cabron", "cabrón", "pendejo", "verga", "chinga", "idiota",
    "estupido", "estúpido", "imbecil", "imbécil", "zorra", "mamaguevo", "gilipollas",
    "maricon", "maricón", "huevon", "huevón", "coño", "culero", "culiado", "perra",
    "malparido", "gonorrea", "pelotudo", "boludo", "forro", "chingado", "pinche", "mamon", "mamón",
    "pija", "polla", "concha", "capullo", "vergazos", "carechimba", "lambon", "sapo",
    "tarado", "baboso", "maldito", "asqueroso", "retrasado", "mongol", "simio",
    "caca", "culo", "pis", "bobo", "tonto", "inutil", "basura", "orto", "ojete",
    "joder", "jodido", "cojones", "hostia", "meco", "naco", "ramera", "golfa",
    "tragasables", "soplapollas", "gil", "mogolico", "mogólico", "sudaca", "panchito",
    "veneco", "cornudo", "cagada", "cagar", "chupapija", "chupamedias", "leepa",
    "pene", "vagina", "reflechucha", "malnacido hp", "hp", "sorro", "zorro", "chupalo",
    "chepa", "chucha", "culo", "ctm", "conche tu mare", "conchetumare", "matame",
    "matate", "matate hp", "sentones", "palo", "pajero", "pto", "pito",

    
    "fuck", "shit", "bitch", "asshole", "dick", "pussy", "whore", "slut", "bastard",
    "cunt", "cock", "suck", "fucker", "motherfucker", "faggot", "nigger", "nigga",
    "retard", "idiot", "stupid", "damn", "dammit", "crap", "crappy", "wanker",
    "bollocks", "bugger", "bloody", "tits", "boobs", "penis", "vagina", "clitoris",
    "orgasm", "porn", "xxx", "rape", "incest", "pedophile", "pedo", "nazi", "hitler",
    "suicide", "kys", "dyke", "kike", "chink", "spic", "wetback", "gook"
];

const VARIANTS = [
    "", "s", "es", "azo", "aza", "ito", "ita", "ón", "ona", "ísimo",
    "isimo", "ote", "ota", "ucho", "ucha", "illo", "illa",
    "123", "!", "@", "#", "_", "-", ".", "*"
];

const BAD_WORDS = new Set();

BASE_BAD_WORDS.forEach(word => {
    VARIANTS.forEach(variant => {
        BAD_WORDS.add(word + variant);
        BAD_WORDS.add(variant + word);
        BAD_WORDS.add(word.toUpperCase() + variant);
        
        const cap = word.charAt(0).toUpperCase() + word.slice(1);
        BAD_WORDS.add(cap + variant);
    });
});


const BANNED_FLAG = 'PyNeo-security-lock';

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem(BANNED_FLAG)) {
        isUserBanned = true;
        handleBannedUser();
        return;
    }

    initChatUI();


    checkRealConnectivity().then(hasInternet => {
        if (hasInternet) {
            initFirebase();
        } else {
            window.addEventListener('online', function onFirstOnline() {
                window.removeEventListener('online', onFirstOnline);
                
                setTimeout(() => { if (!_firebaseInitialized) initFirebase(); }, 500);
            });
        }
    });
});




function checkRealConnectivity() {
    if (!navigator.onLine) return Promise.resolve(false);
    
    
    return fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store'
    })
        .then(() => true)   
        .catch(() => false); 
}

let _firebaseInitialized = false;

function initFirebase() {
    if (_firebaseInitialized) return;
    if (!window.firebase) {
        console.error('Firebase SDK not loaded');
        return;
    }

    
    try { firebase.app(); } catch (e) { firebase.initializeApp(firebaseConfig); }

    _firebaseInitialized = true;
    db = firebase.firestore();

    initUser();
    checkUserBan();
    setupPresence();
}

async function checkUserBan() {
    if (!currentUser || !db) return;
    try {
        
        db.collection("blacklist").doc(currentUser).onSnapshot((doc) => {
            if (doc.exists) {
                isUserBanned = true;
                handleBannedUser();
            }
        }, (error) => {
            console.error("❌ Error en el sistema de baneo (posible problema de permisos):", error);
        });
    } catch (e) {
        console.warn("Ban check error:", e);
    }
}

function handleBannedUser() {
    isUserBanned = true;

    
    
    localStorage.setItem(BANNED_FLAG, 'true');

    console.warn("🚫 Cuenta suspendida permanentemente. Iniciando protocolo de expulsión...");

    
    document.body.innerHTML = `
        <div style="background:#09090b; color:white; height:100vh; display:flex; align-items:center; justify-content:center; font-family:sans-serif; text-align:center;">
            <div>
                <h1 style="color:#ef4444; font-size:40px; font-weight: 900; font-family: 'Arial Black', sans-serif;">ACCESO DENEGADO</h1>
                <p style="font-family: 'Arial Black', sans-serif;">Redirigiendo fuera de la plataforma...</p>
            </div>
        </div>
    `;

    
    setTimeout(() => {
        window.location.replace("https://www.google.com/search?q=normas+de+convivencia+en+internet");
    }, 2000);
}

function initUser() {
    currentUser = localStorage.getItem('pyneo_chat_user');
    if (!currentUser) {
        currentUser = 'Dev_' + Math.floor(Math.random() * 1000);
        localStorage.setItem('pyneo_chat_user', currentUser);
    }
}

function initChatUI() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('chat-send-btn');
    const input = document.getElementById('chat-input');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    const codeBtn = document.getElementById('code-btn');
    const codeArea = document.getElementById('code-input-area');
    const codeEditor = document.getElementById('code-editor-input');
    const closeCode = document.getElementById('close-code');
    const contextArea = document.getElementById('chat-context-area');
    const contextText = document.getElementById('context-text');
    const closeContext = document.getElementById('close-context');
    const unreadBadge = document.getElementById('unread-badge');
    const onlineCountEl = document.getElementById('online-count');
    const sound = document.getElementById('msg-sound');


    const codeSuggestion = document.getElementById('code-suggestion');


    const codeModal = document.getElementById('code-modal');
    const codeModalContent = document.getElementById('modal-code-content');
    const copyModalBtn = document.getElementById('copy-modal-code');
    const closeModalBtn = document.getElementById('close-code-modal');
    const copyText = document.getElementById('copy-text');


    let replyTo = null;

    chatToggle.addEventListener('click', () => {
        if (isUserBanned) {
            handleBannedUser();
            return;
        }

        
        if (!navigator.onLine) {
            
            chatToggle.style.animation = 'none';
            chatToggle.offsetHeight; 
            chatToggle.style.animation = 'shake-no 0.4s ease';

            
            if (typeof showNotification === 'function') {
                showNotification('📡 Sin internet — el chat no está disponible', 'error');
            } else {
                
                _showChatTooltip(chatToggle, 'Sin conexión a internet');
            }
            return;
        }

        
        const pyProgress = JSON.parse(localStorage.getItem('PyNeo-progress') || '{}');
        const completedCount = Object.values(pyProgress).filter(v => v === true).length;
        const chatUnlocked = completedCount >= 9;

        if (!chatUnlocked) {
            if (typeof showNotification === 'function') {
                showNotification(`🔒 Chat bloqueado. Completa ${9 - completedCount} unidades más para entrar.`, 'info');
            } else {
                alert(`Chat bloqueado. Completa ${9 - completedCount} unidades más para entrar.`);
            }
            return;
        }

        chatWindow.classList.toggle('hidden');
        chatToggle.classList.toggle('hidden');
        unreadBadge.classList.add('hidden');

        if (!chatWindow.classList.contains('hidden')) {
            scrollToBottom();

            if (!unsubscribe) {
                listenToMessages();
            }
            updateOnlineCount();
            if (onlineUpdater) clearInterval(onlineUpdater);
            onlineUpdater = setInterval(updateOnlineCount, 60000);
            resetChatInactivityTimer();
        }
    });

    
    function _showChatTooltip(btn, text) {
        const old = document.getElementById('chat-no-internet-tip');
        if (old) old.remove();
        const tip = document.createElement('div');
        tip.id = 'chat-no-internet-tip';
        const r = btn.getBoundingClientRect();
        tip.style.cssText = `
            position:fixed;
            bottom:${window.innerHeight - r.top + 8}px;
            right:${window.innerWidth - r.right}px;
            background:rgba(239,68,68,0.15);
            border:1px solid rgba(239,68,68,0.4);
            color:#fca5a5;
            font-size:11px;
            font-weight:700;
            padding:6px 12px;
            border-radius:8px;
            z-index:9999;
            white-space:nowrap;
            backdrop-filter:blur(8px);
            pointer-events:none;
            opacity:0;
            transition:opacity 0.3s;
        `;
        tip.textContent = text;
        document.body.appendChild(tip);
        requestAnimationFrame(() => { requestAnimationFrame(() => { tip.style.opacity = '1'; }); });
        setTimeout(() => {
            tip.style.opacity = '0';
            setTimeout(() => { if (tip.parentNode) tip.remove(); }, 300);
        }, 3000);
    }

    const resetChatInactivityTimer = () => {

        if (chatInactivityTimer) clearTimeout(chatInactivityTimer);
        chatInactivityTimer = setTimeout(() => {
            if (!chatWindow.classList.contains('hidden')) {
                closeChat.click();
                if (typeof showNotification === 'function') {
                    showNotification('Chat cerrado por inactividad ⏰', 'info');
                }
            }
        }, 5 * 60 * 1000); 
    };

    
    input.addEventListener('input', resetChatInactivityTimer);
    input.addEventListener('click', resetChatInactivityTimer);
    emojiBtn.addEventListener('click', resetChatInactivityTimer);
    codeBtn.addEventListener('click', resetChatInactivityTimer);

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatToggle.classList.remove('hidden');

        
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
        if (onlineUpdater) {
            clearInterval(onlineUpdater);
            onlineUpdater = null;
        }
        if (chatInactivityTimer) {
            clearTimeout(chatInactivityTimer);
            chatInactivityTimer = null;
        }
    });


    codeBtn.addEventListener('click', () => {
        codeArea.classList.toggle('hidden');
        if (!codeArea.classList.contains('hidden')) codeEditor.focus();
    });
    closeCode.addEventListener('click', () => codeArea.classList.add('hidden'));


    closeContext.addEventListener('click', () => {
        replyTo = null;
        contextArea.classList.add('hidden');
    });


    let isSending = false;

    const sendMessage = async () => {
        if (isSending) return;
        const text = input.value.trim();
        const code = codeEditor.value.trim();

        if (!text && !code) return;

        if (text.length > 150) {
            showSystemMessage("⚠️ El mensaje es demasiado largo (máx 150 caracteres).");
            return;
        }

        
        const pyProgress = JSON.parse(localStorage.getItem('PyNeo-progress') || '{}');
        const completedCount = Object.values(pyProgress).filter(v => v === true).length;
        if (completedCount < 9) {
            showSystemMessage("🔒 Completa 9 unidades para desbloquear el chat.");
            return;
        }




        let actualCooldown = BASE_COOLDOWN_MS;

        if (currentOnlineCount >= 100) {
            actualCooldown = 30000; 
        } else if (currentOnlineCount >= 80) {
            actualCooldown = 25000; 
        } else if (currentOnlineCount >= 50) {
            actualCooldown = 20000; 
        } else if (currentOnlineCount >= 30) {
            actualCooldown = 15000; 
        } else if (currentOnlineCount > 5) {
            const extraTime = (currentOnlineCount - 5) * 200; 
            actualCooldown = Math.min(15000, BASE_COOLDOWN_MS + extraTime);
        }

        const now = Date.now();
        if (now - lastMessageTime < actualCooldown) {
            const remaining = Math.ceil((actualCooldown - (now - lastMessageTime)) / 1000);
            showSystemMessage(`⏳ Espera ${remaining}s.`);
            return;
        }


        if (text && text === lastMessageText) {
            showSystemMessage("⚠️ No envíes el mismo mensaje dos veces seguidas.");
            return;
        }


        if (text && containsProfanity(text)) {
            showSystemMessage("🚫 Mensaje bloqueado por lenguaje inapropiado.");
            return;
        }

        
        if (text && containsLink(text)) {
            showSystemMessage("🚫 No se permiten enlaces externos (anti-spam).");
            return;
        }



        const progressEl = document.getElementById('overall-progress');
        const progress = progressEl ? progressEl.innerText : '0%';

        const streakData = JSON.parse(localStorage.getItem('PyNeo-daily-challenge') || '{"count": 0}');
        const streak = streakData.count;

        
        if (!navigator.onLine) {
            showSystemMessage("📡 Sin conexión. Espera a reconectarte para enviar mensajes.");
            return;
        }

        isSending = true;

        try {
            await db.collection("messages").add({
                text: text,
                code: code || null,
                replyTo: replyTo || null,
                sender: currentUser,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                color: getUserColor(currentUser),
                progress: progress,
                streak: streak
            });


            lastMessageTime = Date.now();
            lastMessageText = text;
            input.value = '';
            codeEditor.value = '';
            codeArea.classList.add('hidden');


            replyTo = null;
            contextArea.classList.add('hidden');

            emojiPicker.classList.add('hidden');
        } catch (error) {
            console.error("Error sending message: ", error);
            if (!navigator.onLine) {
                showSystemMessage("📡 Sin conexión. El mensaje no fue enviado.");
            } else {
                showSystemMessage("❌ Error al enviar. Verifica tu conexión.");
            }
        } finally {
            isSending = false;
            resetChatInactivityTimer();
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });


    setupEmojiPicker(emojiBtn, emojiPicker, input);


    input.addEventListener('input', () => {
        const text = input.value;

        const pythonKeywords = /(def\s+|import\s+|class\s+|print\(|return\s+|if\s+.*:|for\s+.*:|while\s+.*:|try:|except:)/;
        const hasIndentation = /(\n\s{4}|\n\t)/.test(text);


        if (pythonKeywords.test(text) || (text.length > 50 && (text.includes(';') || text.includes('{') || text.includes('=')) && hasIndentation)) {

            if (codeArea.classList.contains('hidden')) {
                codeSuggestion.classList.remove('hidden');
            }
        } else {
            codeSuggestion.classList.add('hidden');
        }
    });


    codeSuggestion.addEventListener('click', () => {

        codeEditor.value = input.value;
        input.value = '';


        codeArea.classList.remove('hidden');
        codeEditor.focus();


        codeSuggestion.classList.add('hidden');
        emojiPicker.classList.add('hidden');
    });


    closeModalBtn.addEventListener('click', () => {
        codeModal.classList.add('hidden');
    });

    copyModalBtn.addEventListener('click', () => {
        const text = codeModalContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyText.innerText;
            copyText.innerText = "¡Copiado!";
            copyModalBtn.classList.add('text-green-400');
            setTimeout(() => {
                copyText.innerText = originalText;
                copyModalBtn.classList.remove('text-green-400');
            }, 2000);
        });
    });


    window.replyToMessage = (id, sender, text) => {
        replyTo = { id, sender, text: text.substring(0, 50) + (text.length > 50 ? '...' : '') };
        contextText.innerText = `Respondiendo a ${sender}: "${replyTo.text}"`;
        contextArea.classList.remove('hidden');
        input.focus();
    };


    window.viewCode = (id) => {
        const sourceEl = document.getElementById(`code-source-${id}`);
        if (sourceEl) {
            codeModalContent.innerText = sourceEl.innerText;
            codeModal.classList.remove('hidden');
        }
    };
}



function setupEmojiPicker(btn, picker, input) {


    const STICKERS_REVISED = [

        { code: ":pom_hi:", url: "https://i.pinimg.com/originals/25/b0/a1/25b0a1f11fcac7001057e82e26cdf1f9.gif", unlockAt: 0 },
        { code: ":poc_chill:", url: "https://i.pinimg.com/originals/57/2f/bf/572fbf507afa542c48e10b122d0b5cca.gif", unlockAt: 0 },
        { code: ":cin_hy:", url: "https://i.pinimg.com/originals/22/cd/dd/22cddddeca4405f79bfb94713c1fba52.gif", unlockAt: 0 },


        { code: ":poc_si:", url: "https://i.pinimg.com/originals/ff/d3/f3/ffd3f3ccd3eddfe0bfb9ab1ea466e4c3.gif", unlockAt: 10 },
        { code: ":poc_no:", url: "https://i.pinimg.com/originals/a6/f6/68/a6f6681ce2468417426c3312dd72bfa4.gif", unlockAt: 15 },
        { code: ":cat_lol:", url: "https://i.pinimg.com/originals/d4/9b/b1/d49bb1b75758d298d2e80a91d475fcf5.gif", unlockAt: 25 },


        { code: ":cat_dance:", url: "https://i.pinimg.com/originals/d8/d0/63/d8d0630eb503948fc31e79e5b87d0da7.gif", unlockAt: 40 },
        { code: ":pom_sorry:", url: "https://i.pinimg.com/originals/db/94/71/db94710e33585fd9aa42045254e12f0b.gif", unlockAt: 50 },
        { code: ":rab_ven:", url: "https://i.pinimg.com/originals/df/3e/a1/df3ea18e7186b1b6ff6872ebf67724de.gif", unlockAt: 50 },


        { code: ":cin_a:", url: "https://i.pinimg.com/originals/17/d5/8c/17d58cfc9486aacf547d274843404e9f.gif", unlockAt: 60 },
        { code: ":cin_oa:", url: "https://i.pinimg.com/originals/0f/1b/9f/0f1b9f59d93717ef1eddd91099456f6b.gif", unlockAt: 75 },


        { code: ":pin_dance:", url: "https://i.pinimg.com/originals/f1/66/49/f166499f3ca47ba8d0f527241428d2f2.gif", unlockAt: 90 },
        { code: ":dog_yo:", url: "https://i.pinimg.com/736x/1e/23/7b/1e237b799542a8c407cc49b772cd596b.jpg", unlockAt: 100 }
    ];


    const getProgress = () => {
        const pEl = document.getElementById('overall-progress');
        return pEl ? parseInt(pEl.innerText.replace('%', '')) || 0 : 0;
    };

    const renderPicker = () => {
        const userProgress = getProgress();

        picker.innerHTML = '';
        picker.className = "hidden absolute bottom-16 left-4 right-4 bg-[#18181b] border border-white/10 rounded-xl p-3 shadow-2xl z-50 animate-fade-in grid grid-cols-4 gap-2 h-48 overflow-y-auto scrollbar-thin";


        const infoDiv = document.createElement('div');
        infoDiv.className = "col-span-4 text-center text-[10px] text-gray-500 mb-2 border-b border-white/5 pb-1";
        infoDiv.innerHTML = `Tu Progreso: <span class="text-neon-green font-bold">${userProgress}%</span> • Desbloquea más aprendiendo`;
        picker.appendChild(infoDiv);


        STICKERS_REVISED.forEach(sticker => {
            const isUnlocked = userProgress >= sticker.unlockAt;
            const btn = document.createElement('button');

            if (isUnlocked) {
                btn.className = "hover:bg-white/10 rounded-lg p-2 transition-all flex items-center justify-center h-16 w-16 mx-auto group relative cursor-pointer";
                btn.innerHTML = `
                    <img src="${sticker.url}" alt="${sticker.code}" class="h-12 w-12 object-contain pointer-events-none group-hover:scale-110 transition-transform">
                `;
                btn.onclick = () => {
                    const start = input.selectionStart;
                    const end = input.selectionEnd;
                    const text = input.value;
                    const before = text.substring(0, start);
                    const after = text.substring(end, text.length);

                    input.value = before + " " + sticker.code + " " + after;
                    input.focus();
                };
            } else {

                btn.className = "rounded-lg p-2 flex items-center justify-center h-16 w-16 mx-auto group relative opacity-50 cursor-not-allowed";
                btn.innerHTML = `
                    <div class="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg z-10 backdrop-blur-[1px]">
                        <i class="fas fa-lock text-gray-400 text-sm"></i>
                    </div>
                    <img src="${sticker.url}" class="h-12 w-12 object-contain grayscale opacity-30">
                    <span class="absolute -bottom-1 text-[8px] bg-black/80 text-white px-1.5 rounded-full border border-white/10">NVL ${sticker.unlockAt}%</span>
                `;
                btn.onclick = (e) => {
                    e.preventDefault();

                };
            }

            picker.appendChild(btn);
        });
    };


    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (picker.classList.contains('hidden')) {
            renderPicker();
            picker.classList.remove('hidden');
        } else {
            picker.classList.add('hidden');
        }
    });


    document.addEventListener('click', (e) => {
        if (!picker.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
            picker.classList.add('hidden');
        }
    });


    window.parseStickers = (text) => {
        if (!text) return '';
        let parsed = escapeHtml(text);
        STICKERS_REVISED.forEach(sticker => {
            const regex = new RegExp(sticker.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            parsed = parsed.replace(regex, `<img src="${sticker.url}" class="inline-block h-10 w-10 align-middle mx-1 hover:scale-125 transition-transform" title="${sticker.code}">`);
        });
        return parsed;
    };
}


function setupPresence() {
    if (!currentUser || !db) return;

    let lastDayChecked = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Guayaquil',
        year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());

    let lastSyncedProgress = null;

    const updatePresence = (force = false) => {
        const progressEl = document.getElementById('overall-progress');
        const userProgress = progressEl ? progressEl.innerText : '0%';
        const userColor = getUserColor(currentUser);

        
        if (!force && lastSyncedProgress === userProgress) {
            return;
        }

        db.collection("presence").doc(currentUser).set({
            user: currentUser,
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
            progress: userProgress,
            color: userColor
        });

        lastSyncedProgress = userProgress;

        
        const currentDay = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Guayaquil',
            year: 'numeric', month: '2-digit', day: '2-digit'
        }).format(new Date());

        if (currentDay !== lastDayChecked) {
            lastDayChecked = currentDay;
            if (unsubscribe) unsubscribe();
            document.getElementById('chat-messages').innerHTML = `
                <div class="text-center text-xs text-gray-500 mt-2 mb-4">
                    <p>Bienvenido al chat global.</p>
                    <p>Sé amable y respeta a los demás.</p>
                    <p class="text-[10px] text-gray-600 mt-1">Los mensajes se reinician cada día.</p>
                </div>
            `;
            listenToMessages();
        }
    };

    updatePresence(true); 
    setInterval(() => updatePresence(false), 30000); 

    
    window.addEventListener('beforeunload', () => {
        db.collection("presence").doc(currentUser).delete();
    });
}


async function updateOnlineCount() {
    if (!db) return;
    try {
        const snapshot = await db.collection("presence").get();
        const now = Date.now();
        const activeUsers = snapshot.docs.filter(doc => {
            const data = doc.data();
            if (!data.lastActive) return false;
            const lastActive = data.lastActive.toDate().getTime();
            return (now - lastActive) < 5 * 60 * 1000; 
        });

        currentOnlineCount = activeUsers.length;
        const el = document.getElementById('online-count');
        if (el) el.innerText = `${currentOnlineCount} en línea`;
    } catch (e) {
        console.warn("Error fetching presence:", e);
    }
}

function listenToMessages() {
    const messagesContainer = document.getElementById('chat-messages');



    const now = new Date();
    const ecuadorParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Guayaquil',
        year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(now);

    const year = ecuadorParts.find(p => p.type === 'year').value;
    const month = ecuadorParts.find(p => p.type === 'month').value;
    const day = ecuadorParts.find(p => p.type === 'day').value;


    const startOfDay = new Date(`${year}-${month}-${day}T00:00:00-05:00`);


    unsubscribe = db.collection("messages")
        .where("timestamp", ">=", startOfDay)
        .orderBy("timestamp", "asc")
        .limitToLast(50)
        .onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const msg = change.doc.data();
                    const div = document.createElement('div');
                    const isMe = msg.sender === currentUser;
                    const msgId = change.doc.id;

                    div.className = `flex flex-col mb-3 ${isMe ? 'items-end' : 'items-start'} animate-fade-in group`;

                    const time = msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';


                    let replyHtml = '';
                    if (msg.replyTo) {
                        replyHtml = `
                            <div class="text-[10px] text-gray-500 mb-1 border-l-2 border-gray-600 pl-2 bg-white/5 rounded-r p-1">
                                <span class="text-xs font-bold text-gray-400">${escapeHtml(msg.replyTo.sender)}</span>: ${escapeHtml(msg.replyTo.text)}
                            </div>
                        `;
                    }


                    let codeHtml = '';
                    if (msg.code) {
                        codeHtml = `
                            <div class="mt-2">
                                <button onclick="viewCode('${msgId}')" class="text-[10px] flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-neon-green/80 w-full mb-1 group border-dashed">
                                    <i class="fas fa-file-code"></i> 
                                    <span>Ver Código</span>
                                    <i class="fas fa-external-link-alt ml-auto text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </button>
                                <div id="code-source-${msgId}" class="hidden">
${escapeHtml(msg.code)}
                                </div>
                            </div>
                        `;
                    }


                    const replyBtn = `
                        <button onclick="replyToMessage('${msgId}', '${msg.sender}', '${escapeHtml(msg.text.replace(/'/g, "\\'"))}')" 
                                class="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-gray-500 hover:text-white ml-2">
                            <i class="fas fa-reply"></i>
                        </button>
                    `;

                    div.innerHTML = `
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs font-bold ${isMe ? 'text-neon-green' : 'text-primary'} ${msg.color === 'glitch-effect' ? 'glitch-text text-white' : ''}" data-text="${msg.sender}" style="${msg.color && msg.color !== 'glitch-effect' ? 'color:' + msg.color + '!important' : ''}">${msg.sender}</span>
                            ${msg.streak ? (() => {
                            const color = typeof getStreakColor === 'function' ? getStreakColor(msg.streak) : '#f97316';
                            return `<span class="flex items-center gap-0.5 text-[9px] font-bold bg-white/5 px-1.5 py-0.5 rounded border" style="color: ${color}; border-color: ${color}40">
                                    <i class="fas fa-fire text-[8px] ${msg.streak >= 3 ? 'animate-pulse' : ''}" style="color: ${color}"></i> ${msg.streak}
                                </span>`;
                        })() : ''}
                            ${msg.progress ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 border border-white/5" style="${msg.color && msg.color !== 'glitch-effect' ? 'color:' + msg.color + '!important' : ''}; border-color: ${msg.color ? msg.color + '40' : 'rgba(255,255,255,0.1)'}">${msg.progress}</span>` : ''}
                            <span class="text-[10px] text-gray-600">${time}</span>
                            ${!isMe ? replyBtn : ''}
                        </div>
                        <div class="${isMe ? 'bg-primary/20 border-primary/30' : 'bg-gray-800 border-white/5'} border rounded-lg px-3 py-2 max-w-[85%] break-words shadow-sm backdrop-blur-sm relative">
                            ${replyHtml}
                            <p class="text-sm text-gray-200">${msg.text ? (window.parseStickers ? window.parseStickers(msg.text) : escapeHtml(msg.text)) : ''}</p>
                            ${codeHtml}
                        </div>
                    `;

                    messagesContainer.appendChild(div);


                    
                    if (!isMe && document.getElementById('msg-sound')) {
                        
                        const isReplyToMe = msg.replyTo && msg.replyTo.sender === currentUser;

                        
                        
                        if (typeof window.soundSpamCount === 'undefined') {
                            window.soundSpamCount = 0;
                            window.isSoundMuted = false;
                        }

                        if (isReplyToMe && !window.isSoundMuted) {
                            const audio = document.getElementById('msg-sound');
                            audio.volume = 0.5;

                            
                            audio.play().catch(e => {});

                            
                            const chatWindow = document.getElementById('chat-window');
                            if (chatWindow.classList.contains('hidden')) {
                                document.getElementById('unread-badge').classList.remove('hidden');
                            }

                            window.soundSpamCount++;

                            if (!window.soundSpamResetTimer) {
                                window.soundSpamResetTimer = setTimeout(() => {
                                    window.soundSpamCount = 0;
                                    window.soundSpamResetTimer = null;
                                }, 5000);
                            }


                            if (window.soundSpamCount > 5) {
                                window.isSoundMuted = true;
                                console.warn("🚫 Sonido muteado temporalmente por spam.");


                                if (typeof showSystemMessage === 'function') {
                                    showSystemMessage("🔕 Notificaciones silenciadas");
                                }


                                setTimeout(() => {
                                    window.isSoundMuted = false;
                                    window.soundSpamCount = 0;
                                    if (typeof showSystemMessage === 'function') {
                                        showSystemMessage("🔔 Sonido reactivado.");
                                    }
                                }, 60000);
                            }
                        }
                    }
                }
            });
            scrollToBottom();
        });
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getUserColor(username) {
    
    if (username === currentUser) {
        return localStorage.getItem('PyNeo-user-color') || '#ffffff';
    }

    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = ['#f472b6', '#38bdf8', '#c084fc', '#4ade80', '#fbbf24', '#f87171'];
    return colors[Math.abs(hash) % colors.length];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function containsProfanity(text) {
    if (!text) return false;
    
    
    
    const tokens = text.split(/[\s]+/);

    for (const token of tokens) {
        
        if (BAD_WORDS.has(token)) return true;

        
        const clean = token.replace(/^[^\wáéíóúñ]+|[^\wáéíóúñ]+$/gi, '');
        if (BAD_WORDS.has(clean)) return true;
    }
    return false;
}

function containsLink(text) {
    
    const linkPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\/[^\s]*)?)/i;
    
    
    return linkPattern.test(text);
}

function showSystemMessage(msg) {
    const messagesContainer = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = "flex justify-center mb-3 animate-fade-in";
    div.innerHTML = `
        <div class="bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1 backdrop-blur-sm">
            <p class="text-xs text-red-400 font-bold flex items-center gap-1">
                ${msg}
            </p>
        </div>
    `;
    messagesContainer.appendChild(div);
    scrollToBottom();
}
