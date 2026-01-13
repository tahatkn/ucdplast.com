// 1. HTML Banner'ını Sayfaya Ekle
document.addEventListener("DOMContentLoaded", function() {
    const bannerHTML = `
    <div id="cookie-banner" class="cookie-banner">
        <div class="container cookie-content">
            <div class="cookie-text">
                <p id="cookie-msg">We use cookies to analyze our traffic and improve your experience. By clicking "Accept", you agree to our use of cookies.</p>
            </div>
            <div class="cookie-buttons">
                <button id="btn-decline" class="btn-cookie-decline">Decline</button>
                <button id="btn-accept" class="btn-cookie-accept">Accept</button>
            </div>
        </div>
    </div>
    `;
    
    // Body'nin sonuna ekle
    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    // Dil Kontrolü ve Metin Güncelleme
    updateCookieLanguage();

    // Çerez Durumunu Kontrol Et
    checkCookieConsent();
});

// 2. Dil Çevirileri
const cookieTranslations = {
    en: {
        msg: 'We use cookies to analyze our traffic and improve your experience. By clicking "Accept", you agree to our use of cookies.',
        accept: 'Accept',
        decline: 'Decline'
    },
    tr: {
        msg: 'Trafiğimizi analiz etmek ve deneyiminizi geliştirmek için çerezleri kullanıyoruz. "Kabul Et"e tıklayarak çerez kullanımımızı kabul etmiş olursunuz.',
        accept: 'Kabul Et',
        decline: 'Reddet'
    }
};

function updateCookieLanguage() {
    const lang = localStorage.getItem('selectedLang') || 'en';
    const texts = cookieTranslations[lang];

    if(document.getElementById('cookie-msg')) {
        document.getElementById('cookie-msg').innerText = texts.msg;
        document.getElementById('btn-accept').innerText = texts.accept;
        document.getElementById('btn-decline').innerText = texts.decline;
    }
}

// 3. Mantık ve Olay Dinleyicileri
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const banner = document.getElementById('cookie-banner');
    
    // Eğer daha önce bir seçim yapılmamışsa banner'ı göster
    if (!consent) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000); // 1 saniye gecikmeli gelsin
    } else if (consent === 'accepted') {
        // Zaten kabul etmişse Analytics'i başlat
        loadGoogleAnalytics();
    }
    // 'declined' ise hiçbir şey yapma (Analytics çalışmaz)

    // Buton Dinleyicileri
    document.getElementById('btn-accept').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.remove('show');
        loadGoogleAnalytics();
    });

    document.getElementById('btn-decline').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.classList.remove('show');
    });
}

// 4. Google Analytics Yükleme Fonksiyonu
function loadGoogleAnalytics() {
    // Script daha önce eklendiyse tekrar ekleme
    if (document.getElementById('ga-script')) return;

    // Google Tag Manager Scriptini Dinamik Olarak Oluştur
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6Q0N3ZCDYL'; // SİZİN ID'NİZ
    
    document.head.appendChild(script);

    // Gtag konfigürasyonu
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6Q0N3ZCDYL'); // SİZİN ID'NİZ
    
    console.log("Google Analytics Loaded via Consent");
}