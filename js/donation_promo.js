const DONATION_HIDE_KEY = 'PyNeo-donation-hide';
const DONATION_SESSION_HIDE = 'PyNeo-donation-session-hide';

function initDonationPromo() {
    const hideStatus = localStorage.getItem(DONATION_HIDE_KEY);
    if (hideStatus === 'permanent') return;

    
    if (sessionStorage.getItem(DONATION_SESSION_HIDE)) return;

    
    const checkDiscord = setInterval(() => {
        if (!document.getElementById('discord-promo')) {
            clearInterval(checkDiscord);
            
            setTimeout(createDonationUI, 2000);
        }
    }, 1000);
}

function createDonationUI() {
    if (document.getElementById('donation-promo')) return;

    const promo = document.createElement('div');
    promo.id = 'donation-promo';
    promo.className = 'fixed bottom-6 left-6 z-[150] max-w-[320px] md:max-w-sm animate-fade-in-up';

    promo.innerHTML = `
        <div class="bg-[#18181b]/95 border border-yellow-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            <!-- Glow Effect -->
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700"></div>
            
            <div class="flex items-start gap-4 relative z-10">
                <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20 shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                    <i class="fas fa-heart text-2xl text-white"></i>
                </div>
                <div>
                    <h4 class="text-white font-black text-lg leading-tight mb-1">¡Apoya a PyNeo! ❤️</h4>
                    <p class="text-gray-400 text-[11px] leading-relaxed mb-4">
                        Tu apoyo me ayuda a mantener el proyecto <span class="text-yellow-400/90 font-bold">libre de anuncios</span> y seguir creando contenido gratuito para todos.
                    </p>
                    
                    <div class="flex flex-col gap-2">
                        <button onclick="handleDonationAction('donate')" 
                           class="bg-yellow-500 hover:bg-yellow-400 text-black text-center py-2.5 rounded-xl font-black text-sm transition-all hover:shadow-lg hover:shadow-yellow-500/30 active:scale-95">
                            Donar ahora
                        </button>
                        <div class="flex gap-2">
                            <button onclick="handleDonationAction('later')" 
                                    class="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg text-[10px] font-bold transition-all border border-white/5 uppercase tracking-wider">
                                Más tarde
                            </button>
                            <button onclick="handleDonationAction('never')" 
                                    class="flex-1 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-red-400 py-2 rounded-lg text-[10px] font-bold transition-all border border-white/5 uppercase tracking-wider">
                                Ya he donado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <button onclick="handleDonationAction('later')" class="absolute top-3 right-3 text-gray-600 hover:text-white transition-colors">
                <i class="fas fa-times text-xs"></i>
            </button>
        </div>
    `;

    document.body.appendChild(promo);
}

function handleDonationAction(action) {
    const promo = document.getElementById('donation-promo');
    if (promo) {
        promo.classList.remove('animate-fade-in-up');
        promo.classList.add('animate-fade-out-down');
    }

    setTimeout(() => {
        if (promo) promo.remove();

        if (action === 'later') {
            sessionStorage.setItem(DONATION_SESSION_HIDE, 'true');
        } else if (action === 'never') {
            localStorage.setItem(DONATION_HIDE_KEY, 'permanent');
        } else if (action === 'donate') {
            if (typeof showDeunaQR === 'function') {
                showDeunaQR();
            } else {
                
                const deunaModal = document.getElementById('deuna-modal');
                if (deunaModal) deunaModal.classList.remove('hidden');
            }
            sessionStorage.setItem(DONATION_SESSION_HIDE, 'true');
        }
    }, 500);
}


if (!document.getElementById('discord-promo-styles') && !document.getElementById('donation-promo-styles')) {
    const style = document.createElement('style');
    style.id = 'donation-promo-styles';
    style.textContent = `
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-out-down {
            from { opacity: 1; transform: translateY(0) scale(1); }
            to { opacity: 0; transform: translateY(30px) scale(0.95); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-out-down { animation: fade-out-down 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards; }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
    
    setTimeout(initDonationPromo, 10000); 
});
