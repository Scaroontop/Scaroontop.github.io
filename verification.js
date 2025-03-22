const extensions = {
    "no-direct-ip": "chrome-extension://hacaeeoapmdgmhifjcgbblcobgnmceff/icons/block.png",
    "Securly (4th ID)": "chrome-extension://lcgajdcbmhepemmlpemkkpgagieehmjp/fonts/Metropolis.css",
    "Securly (3rd ID)": "chrome-extension://ckecmkbnoanpgplccmnoikfmpcdladkc/fonts/Metropolis.css",
    "Securly (2nd ID)": "chrome-extension://joflmkccibkooplaeoinecjbmdebglab/fonts/Metropolis.css",
    "Securly (1st ID)": "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/fonts/Metropolis.css",
    "GoGuardian": "chrome-extension://haldlgldplgnggkjaafhelgiaglafanh/youtube_injection.js",
};

const STORAGE_KEY = "verification-status";
const VERIFICATION_EXPIRY_KEY = "verification-expiry";
const USER_DATA_KEY = "verification-user-data";
const VERIFICATION_PAGE = "/verification.html";
const CURRENT_USER = "Scaroontop";
const CURRENT_UTC_TIME = "2025-03-22 09:45:16";

function saveUserData(verificationStatus) {
    const userData = {
        username: CURRENT_USER,
        verificationDate: CURRENT_UTC_TIME,
        status: verificationStatus,
        lastChecked: CURRENT_UTC_TIME
    };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

function checkVerificationStatus() {
    const verificationExpiry = localStorage.getItem(VERIFICATION_EXPIRY_KEY);
    const isVerified = localStorage.getItem(STORAGE_KEY) === "verified";
    const now = new Date().getTime();
    
    if (isVerified && verificationExpiry && parseInt(verificationExpiry) > now) {
        return true;
    }
    
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VERIFICATION_EXPIRY_KEY);
    return false;
}

function showVerificationMessage() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
    `;

    // Create the alert box container
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 10000;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    `;

    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.style.cssText = `
        margin: 0 0 20px 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    `;

    // Add messages
    const messages = [
        { text: "Verification Required", style: "font-size: 20px; font-weight: 600; color: #1f2937;" },
        { text: "You must complete the verification to access this page", style: "font-size: 16px; color: #4b5563;" },
        { text: `User: ${CURRENT_USER}`, style: "font-size: 14px; color: #6b7280;" }
    ];

    messages.forEach(msgConfig => {
        const message = document.createElement('p');
        message.textContent = msgConfig.text;
        message.style.cssText = `
            margin: 0;
            ${msgConfig.style}
        `;
        messagesContainer.appendChild(message);
    });

    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.textContent = `Last Updated: ${CURRENT_UTC_TIME}`;
    timestamp.style.cssText = `
        font-size: 11px;
        color: #9ca3af;
        margin-top: 16px;
        text-align: center;
        font-family: monospace;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translate(-50%, -40%);
            }
            to { 
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    `;
    document.head.appendChild(style);

    // Assemble and add to page
    alertBox.appendChild(messagesContainer);
    alertBox.appendChild(timestamp);
    document.body.appendChild(overlay);
    document.body.appendChild(alertBox);

    // Redirect after delay
    setTimeout(() => {
        const currentPage = window.location.href;
        window.location.href = `${VERIFICATION_PAGE}?returnUrl=${encodeURIComponent(currentPage)}`;
    }, 2000);
}

// Rest of the code remains the same...
function checkExtensions() {
    // ... (keep existing code)
}

function redirectToPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('returnUrl');
    window.location.href = returnUrl || window.location.origin;
}

function addVerificationCheck() {
    if (window.location.pathname === VERIFICATION_PAGE) return;

    if (!checkVerificationStatus()) {
        showVerificationMessage();
        saveUserData("redirect-to-verification");
    } else {
        const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || "{}");
        userData.lastChecked = CURRENT_UTC_TIME;
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
}

(function() {
    const existingMessage = document.getElementById('verification-message');
    if (existingMessage) existingMessage.remove();

    if (document.getElementById('status')) {
        checkExtensions();
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addVerificationCheck);
        } else {
            addVerificationCheck();
        }
    }
})();
