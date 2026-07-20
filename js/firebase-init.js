
const firebaseConfigs = [
  {
    apiKey: "AIzaSyAeGa7XKpH8ZQVWLy3B3GdhtaRNybAWXt0",
    authDomain: "rkpython-2693e.firebaseapp.com",
    projectId: "rkpython-2693e",
    storageBucket: "rkpython-2693e.firebasestorage.app",
    messagingSenderId: "468870185966",
    appId: "1:468870185966:web:97127e5d27cacb6dafc4ff",
    measurementId: "G-XM4B9JB636"
  },
  {
    apiKey: "AIzaSyAnCFuubiw9d8Ed1z3OVDRA-_odiWbdNkw",
    authDomain: "rkpythoncolab1.firebaseapp.com",
    projectId: "rkpythoncolab1",
    storageBucket: "rkpythoncolab1.firebasestorage.app",
    messagingSenderId: "885261661565",
    appId: "1:885261661565:web:45fe80bc2eed7e5549c814",
    measurementId: "G-JHVBQN520G"
  },
  {
    apiKey: "AIzaSyB_STufgKdX5r44H8RuJHM0U8Zg8xIzxN0",
    authDomain: "rkpythoncolab2.firebaseapp.com",
    projectId: "rkpythoncolab2",
    storageBucket: "rkpythoncolab2.firebasestorage.app",
    messagingSenderId: "240965911568",
    appId: "1:240965911568:web:c55f494e01a98be61a3695",
    measurementId: "G-XSCS3JWM49"
  },
  {
    apiKey: "AIzaSyCfKpcb6ISHt5Eq35-hKJqXTZTCqkPPoPI",
    authDomain: "rkpythoncolab3.firebaseapp.com",
    projectId: "rkpythoncolab3",
    storageBucket: "rkpythoncolab3.firebasestorage.app",
    messagingSenderId: "311770127789",
    appId: "1:311770127789:web:bb59f668ed9529e3c1d524",
    measurementId: "G-LRQ1N17870"
  },
  {
    apiKey: "AIzaSyAPfJN_bfOzDs3su3y_ejFMo2VLC2pNwZk",
    authDomain: "rkpythoncolab4.firebaseapp.com",
    projectId: "rkpythoncolab4",
    storageBucket: "rkpythoncolab4.firebasestorage.app",
    messagingSenderId: "718641204256",
    appId: "1:718641204256:web:67aa7f88a2b1a3ab190045",
    measurementId: "G-ZVCSM6Q74E"
  },
  {
    apiKey: "AIzaSyCwgMdhU7mHLrizzob3Uz4DEqEcHbDZYME",
    authDomain: "rkpythoncolab5.firebaseapp.com",
    projectId: "rkpythoncolab5",
    storageBucket: "rkpythoncolab5.firebasestorage.app",
    messagingSenderId: "867304933819",
    appId: "1:867304933819:web:90ccc13a777deaf80e5c9e",
    measurementId: "G-WKGPF45L9C"
  }
];

let db = null;
let currentFirebaseIndex = parseInt(localStorage.getItem('pyneo_firebase_index') || '0', 10);
if (isNaN(currentFirebaseIndex) || currentFirebaseIndex < 0 || currentFirebaseIndex >= firebaseConfigs.length) {
    currentFirebaseIndex = 0;
}

function initFirebase() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK not loaded');
        return;
    }

    try {
        const config = firebaseConfigs[currentFirebaseIndex];
        
        if (firebase.apps.length > 0) {
            firebase.app().delete().then(() => {
                firebase.initializeApp(config);
                db = firebase.firestore();
                verifyAndTestConnection();
            });
            return;
        }

        firebase.initializeApp(config);
        db = firebase.firestore();
        verifyAndTestConnection();
    } catch (e) {
        console.error('[Firebase] Error al inicializar:', e);
        rotateFirebaseApp();
    }
}


function verifyAndTestConnection() {
    if (!db) return;
    
    updateFirebaseSettingsUI();
    
    
    db.collection('codespaces').limit(1).get().then(() => {
        
        sessionStorage.setItem('pyneo_firebase_rotation_count', '0');
    }).catch(err => {
        const msg = (err.message || err.toString()).toLowerCase();
        if (msg.includes("quota") || msg.includes("exhausted") || msg.includes("resource-exhausted") || msg.includes("permission-denied") || msg.includes("permission_denied")) {
            console.warn("[Firebase] Test de conexión falló debido a cuotas excedidas:", err);
            rotateFirebaseApp();
        }
    });
}


function rotateFirebaseApp() {
    let rotationCount = parseInt(sessionStorage.getItem('pyneo_firebase_rotation_count') || '0', 10);
    if (rotationCount >= firebaseConfigs.length) {
        console.error("[Firebase] CRÍTICO: Todos los servidores del pool de Firebase han agotado su cuota.");
        showExhaustedModal();
        return;
    }
    
    rotationCount++;
    sessionStorage.setItem('pyneo_firebase_rotation_count', rotationCount);
    
    currentFirebaseIndex = (currentFirebaseIndex + 1) % firebaseConfigs.length;
    localStorage.setItem('pyneo_firebase_index', currentFirebaseIndex);
    
    window.location.reload();
}


window.handleFirebaseError = function(error) {
    if (!error) return;
    const msg = (error.message || error.toString()).toLowerCase();
    if (msg.includes("quota") || msg.includes("exhausted") || msg.includes("resource-exhausted") || msg.includes("permission-denied") || msg.includes("permission_denied")) {
        console.warn("[Firebase] Alerta en tiempo de ejecución: Cuota diaria alcanzada. Rotando de servidor...", error);
        rotateFirebaseApp();
    }
};

function updateFirebaseSettingsUI() {
    const connectedEl = document.getElementById('firebase-connected-id');
    if (connectedEl) {
        connectedEl.textContent = firebaseConfigs[currentFirebaseIndex].projectId;
    }
}


function showExhaustedModal() {
    if (document.getElementById('firebase-exhausted-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'firebase-exhausted-overlay';
    overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-500 opacity-0';
    
    const theme = localStorage.getItem('pyneo_colab_theme') || 'dracula';
    const isPink = theme === 'cute-pink';
    
    const glowColor = isPink ? 'rgba(244,114,182,0.2)' : 'rgba(99,102,241,0.2)';
    const btnColor = isPink ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-500/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20';
    const accentText = isPink ? 'text-pink-400' : 'text-indigo-400';
    const borderGlow = isPink ? 'border-pink-500/20' : 'border-indigo-500/20';
    
    overlay.innerHTML = `
        <div class="relative max-w-md w-full bg-[#121216]/90 border ${borderGlow} rounded-3xl p-8 text-center shadow-2xl transition-all transform scale-95 duration-500 select-none" style="box-shadow: 0 0 30px ${glowColor}">
            <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 text-3xl shadow-lg animate-pulse">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 class="text-xl font-black text-white mt-8 mb-3 uppercase tracking-wider font-mono">Servidores Saturados</h3>
            <p class="text-xs text-gray-400 leading-relaxed font-sans">
                Todos los servidores de bases de datos PyNeo se encuentran temporalmente saturados al haber alcanzado el límite de operaciones gratuitas de Firebase por hoy.
            </p>
            <div class="my-5 p-3.5 bg-black/40 rounded-2xl border border-white/5 text-left">
                <div class="text-[10px] text-gray-500 font-mono flex justify-between">
                    <span>ESTADO:</span>
                    <span class="text-red-400 font-bold">FUERA DE SERVICIO</span>
                </div>
                <div class="text-[10px] text-gray-500 font-mono flex justify-between mt-1.5">
                    <span>SERVIDORES PROBADOS:</span>
                    <span>6/6 (Agotados)</span>
                </div>
                <div class="text-[10px] text-gray-500 font-mono flex justify-between mt-1.5">
                    <span>ACCIÓN SUGERIDA:</span>
                    <span class="${accentText} font-bold">INTENTAR MÁS TARDE</span>
                </div>
            </div>
            <button onclick="sessionStorage.setItem('pyneo_firebase_rotation_count', '0'); window.location.reload();" class="w-full py-3 ${btnColor} text-white font-bold rounded-2xl text-xs transition-all shadow-lg transform active:scale-95 cursor-pointer">
                <i class="fas fa-redo mr-2"></i> Reintentar Conexión
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        const box = overlay.querySelector('div');
        if (box) {
            box.classList.remove('scale-95');
            box.classList.add('scale-100');
        }
    }, 100);
}


document.addEventListener('DOMContentLoaded', () => {
    updateFirebaseSettingsUI();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebase);
} else {
    initFirebase();
}

function getUserColor(username) {
    const currentUser = localStorage.getItem('pyneo_chat_user');
    
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
