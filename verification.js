const extensions = {
    "no-direct-ip": "chrome-extension://hacaeeoapmdgmhifjcgbblcobgnmceff/icons/block.png",
    "Securly (4th ID)": "chrome-extension://lcgajdcbmhepemmlpemkkpgagieehmjp/fonts/Metropolis.css",
    "Securly (3rd ID)": "chrome-extension://ckecmkbnoanpgplccmnoikfmpcdladkc/fonts/Metropolis.css",
    "Securly (2nd ID)": "chrome-extension://joflmkccibkooplaeoinecjbmdebglab/fonts/Metropolis.css",
    "Securly (1st ID)": "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/fonts/Metropolis.css",
    "GoGuardian": "chrome-extension://haldlgldplgnggkjaafhelgiaglafanh/youtube_injection.js",
    "LANSchool": "chrome-extension://baleiojnjpgeojohhhfbichcodgljmnj/blocked.html",
    "Linewize": "chrome-extension://ddfbkhpmcdbciejenfcolaaiebnjcbfc/background/assets/pages/default-blocked.html",
    "Blocksi": "chrome-extension://ghlpmldmjjhmdgmneoaibbegkjjbonbk/pages/blockPage.html",
    "FortiGuard": "chrome-extension://igbgpehnbmhgdgjbhkkpedommgmfbeao/youtube_injection.js",
    "Cisco Umbrella": "chrome-extension://jcdhmojfecjfmbdpchihbeilohgnbdci/blocked.html",
    "ContentKeeper": "chrome-extension://jdogphakondfdmcanpapfahkdomaicfa/img/ckauth19x.png",
    "CK-Authenticator G3": "chrome-extension://odoanpnonilogofggaohhkdkdgbhdljp/img/ckauth19x.png",
    "Securly Classroom (2nd ID)": "chrome-extension://hkobaiihndnbfhbkmjjfbdimfbdcppdh/notfound.html",
    "Securly Classroom (1st ID)": "chrome-extension://jfbecfmiegcjddenjhlbhlikcbfmnafd/notfound.html",
    "Hapara (2nd ID)": "chrome-extension://kbohafcopfpigkjdimdcdgenlhkmhbnc/blocked.html",
    "Hapara (1st ID)": "chrome-extension://aceopacgaepdcelohobicpffbbejnfac/blocked.html",
    "iboss": "chrome-extension://kmffehbidlalibfeklaefnckpidbodff/restricted.html",
    "Lightspeed Digital Insight Agent": "chrome-extension://njdniclgegijdcdliklgieicanpmcngj/js/wasm_exec.js",
    "Lightspeed Filter Agent": "chrome-extension://adkcpkpghahmbopkjchobieckeoaoeem/icon-128.png",
    "Lightspeed Classroom": "chrome-extension://kkbmdgjggcdajckdlbngdjonpchpaiea/assets/icon-classroom-128.png",
    "InterCLASS Filtering Service": "chrome-extension://jbddgjglgkkneonnineaohdhabjbgopi/pages/message-page.html",
    "InterSafe GatewayConnection Agent": "chrome-extension://ecjoghccnjlodjlmkgmnbnkdcbnjgden/resources/options.js",
    "LoiLo Web Filters": "chrome-extension://pabjlbjcgldndnpjnokjakbdofjgnfia/image/allow_icon/shield_green_128x128.png",
    "Gopher Buddy": "chrome-extension://cgbbbjmgdpnifijconhamggjehlamcif/images/gopher-buddy_128x128_color.png",
    "LanSchool Web Helper": "chrome-extension://honjcnefekfnompampcpmcdadibmjhlk/blocked.html",
    "IMTLazarus": "chrome-extension://cgigopjakkeclhggchgnhmpmhghcbnaf/models/model.json",
    "Impero Backdrop": "chrome-extension://jjpmjccpemllnmgiaojaocgnakpmfgjg/licenses.html",
    "Mobile Guardian": "chrome-extension://fgmafhdohjkdhfaacgbgclmfgkgokgmb/block.html",
    "NetSupport School Student": "chrome-extension://gcjpefhffmcgplgklffgbebganmhffje/_locales/lt/messages.json",
    "classroom.cloud Student": "chrome-extension://mpkdoimpgkhjcicmhmlmgboelebflpla/_locales/lt/messages.json",
    "Lockdown Browser": "chrome-extension://fogjeanjfbiombghnmkmmophfeccjdki/manifest.json",
    "Linewize Filter": "chrome-extension://ifinpabiejbjobcphhaomiifjibpkjlf/background/assets/pages/default-blocked.html",
    "Borderless Classroom Student": "chrome-extension://kdpgkligilplaanoablcpjahjjeghcl/pages/blockPage.html",
    "Borderless Classroom Student (2nd ID)": "chrome-extension://apchgbgnimojffnkddiigiekiooeieno/pages/blockPage.html",
    "LockDown Browser AP Classroom Edition": "chrome-extension://djpknfecbncogekjnjppojlaipeobkmo/assets/images/icon_128.png",
    "Lugus School": "chrome-extension://eoobggamkobbcpiojefejfglbfcacgca/assets/images/icon_128.png",
    "Goguardian license": "chrome-extension://iebjhfinbefifbikdchdnodkdickdghe/background.html",
    "Clever plus": "chrome-extension://dikiaagfielfbnbbopidjjagldjopbpa/manifest.json"
};

// Configuration
const CONFIG = {
    STORAGE_KEY: "verification-status",
    VERIFICATION_EXPIRY_KEY: "verification-expiry",
    USER_DATA_KEY: "verification-user-data",
    VERIFICATION_PAGE: "/index.html",
    DEFAULT_REDIRECT: "./h.html",
    CURRENT_USER: "Scaroontop",
    CURRENT_UTC_TIME: "2025-03-22 17:50:43",
    REQUIRED_EXTENSIONS: 5
};

function saveUserData(verificationStatus) {
    const userData = {
        username: CONFIG.CURRENT_USER,
        verificationDate: CONFIG.CURRENT_UTC_TIME,
        status: verificationStatus,
        lastChecked: CONFIG.CURRENT_UTC_TIME
    };
    localStorage.setItem(CONFIG.USER_DATA_KEY, JSON.stringify(userData));
}

function checkVerificationStatus() {
    const verificationExpiry = localStorage.getItem(CONFIG.VERIFICATION_EXPIRY_KEY);
    const isVerified = localStorage.getItem(CONFIG.STORAGE_KEY) === "verified";
    const now = new Date().getTime();
    
    if (isVerified && verificationExpiry && parseInt(verificationExpiry) > now) {
        return true;
    }
    
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    localStorage.removeItem(CONFIG.VERIFICATION_EXPIRY_KEY);
    return false;
}

function showVerificationMessage() {
    // Remove any existing messages first
    const existingOverlay = document.querySelector('.verification-overlay');
    const existingBox = document.querySelector('.verification-alert');
    if (existingOverlay) existingOverlay.remove();
    if (existingBox) existingBox.remove();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'verification-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 999999;
        animation: fadeIn 0.3s ease-out;
    `;

    // Create the alert box container
    const alertBox = document.createElement('div');
    alertBox.className = 'verification-alert';
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 1000000;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to { 
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    `;
    document.head.appendChild(style);

    const content = document.createElement('div');
    content.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    `;

    // Add icon
    const icon = document.createElement('div');
    icon.innerHTML = `
        <svg viewBox="0 0 24 24" width="40" height="40" style="margin: 0 auto; color: #dc2626;">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
    `;
    icon.style.marginBottom = '16px';

    const messages = [
        { text: "Verification Required", style: "font-size: 20px; font-weight: 600; color: #1f2937;" },
        { text: "You must complete the verification to access this page", style: "font-size: 16px; color: #4b5563;" },
        { text: `User: ${CONFIG.CURRENT_USER}`, style: "font-size: 14px; color: #6b7280;" }
    ];

    messages.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = msg.text;
        p.style.cssText = `margin: 0; ${msg.style}`;
        content.appendChild(p);
    });

    const timestamp = document.createElement('div');
    timestamp.textContent = `Last Updated: ${CONFIG.CURRENT_UTC_TIME}`;
    timestamp.style.cssText = `
        font-size: 11px;
        color: #9ca3af;
        margin-top: 16px;
        font-family: monospace;
    `;

    alertBox.appendChild(icon);
    alertBox.appendChild(content);
    alertBox.appendChild(timestamp);
    document.body.appendChild(overlay);
    document.body.appendChild(alertBox);

    setTimeout(() => {
        const currentPage = window.location.href;
        window.location.href = `${CONFIG.VERIFICATION_PAGE}?returnUrl=${encodeURIComponent(currentPage)}`;
    }, 2000);
}

function redirectToPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('returnUrl');
    window.location.href = returnUrl || CONFIG.DEFAULT_REDIRECT;
}

function checkExtensions() {
    const statusElement = document.getElementById('status');
    const spinner = document.getElementById('spinner');
    const success = document.getElementById('success');
    const failure = document.getElementById('failure');
    const alreadyVerified = document.getElementById('already-verified');
    const progressFill = document.querySelector('.progress-fill');

    if (checkVerificationStatus()) {
        statusElement.textContent = "";
        spinner.classList.add('hidden');
        progressFill.style.width = '100%';
        alreadyVerified.classList.remove('hidden');
        document.getElementById('user-info').textContent = `Verified User: ${CONFIG.CURRENT_USER}`;
        saveUserData("already-verified");
        setTimeout(() => redirectToPage(), 3000);
        return;
    }

    const promises = Object.entries(extensions).map(([name, url]) =>
        fetch(url, { method: 'HEAD' })
            .then(() => name)
            .catch(() => null)
    );

    Promise.all(promises).then(results => {
        const validExtensions = results.filter(name => name !== null);
        spinner.classList.add('hidden');

        // Calculate progress percentage based on found extensions
        const progressPercentage = Math.min((validExtensions.length / CONFIG.REQUIRED_EXTENSIONS) * 100, 100);
        progressFill.style.width = `${progressPercentage}%`;

        if (validExtensions.length >= CONFIG.REQUIRED_EXTENSIONS) {
            const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            localStorage.setItem(CONFIG.STORAGE_KEY, "verified");
            localStorage.setItem(CONFIG.VERIFICATION_EXPIRY_KEY, expiryTime.toString());
            saveUserData("verified");
            
            success.classList.remove('hidden');
            document.getElementById('user-info').textContent = `Verified User: ${CONFIG.CURRENT_USER}`;
            statusElement.textContent = `Verification successful! Redirecting...`;
            setTimeout(() => redirectToPage(), 3000);
        } else {
            failure.classList.remove('hidden');
            const extensionsNeeded = CONFIG.REQUIRED_EXTENSIONS - validExtensions.length;
            statusElement.textContent = `Verification failed. Found ${validExtensions.length}/${CONFIG.REQUIRED_EXTENSIONS} required extensions. Need ${extensionsNeeded} more.`;
            document.getElementById('user-info').textContent = `Unverified User: ${CONFIG.CURRENT_USER}`;
            saveUserData("failed");
        }
    });
}

function addVerificationCheck() {
    if (window.location.pathname === CONFIG.VERIFICATION_PAGE) return;

    if (!checkVerificationStatus()) {
        showVerificationMessage();
        saveUserData("redirect-to-verification");
    } else {
        const userData = JSON.parse(localStorage.getItem(CONFIG.USER_DATA_KEY) || "{}");
        userData.lastChecked = CONFIG.CURRENT_UTC_TIME;
        localStorage.setItem(CONFIG.USER_DATA_KEY, JSON.stringify(userData));
    }
}

(function() {
    if (document.getElementById('status')) {
        checkExtensions();
    } else {
        addVerificationCheck();
    }
})();
