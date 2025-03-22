const extensions = {
    "no-direct-ip": "chrome-extension://hacaeeoapmdgmhifjcgbblcobgnmceff/icons/block.png",
    "Securly (4th ID)": "chrome-extension://lcgajdcbmhepemmlpemkkpgagieehmjp/fonts/Metropolis.css",
    "Securly (3rd ID)": "chrome-extension://ckecmkbnoanpgplccmnoikfmpcdladkc/fonts/Metropolis.css",
    "Securly (2nd ID)": "chrome-extension://joflmkccibkooplaeoinecjbmdebglab/fonts/Metropolis.css",
    "Securly (1st ID)": "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/fonts/Metropolis.css",
    "GoGuardian": "chrome-extension://haldlgldplgnggkjaafhelgiaglafanh/youtube_injection.js",
};

// Configuration
const CONFIG = {
    STORAGE_KEY: "verification-status",
    VERIFICATION_EXPIRY_KEY: "verification-expiry",
    USER_DATA_KEY: "verification-user-data",
    VERIFICATION_PAGE: "/index.html",
    DEFAULT_REDIRECT: "./h.html",
    CURRENT_USER: "Scaroontop",
    CURRENT_UTC_TIME: "2025-03-22 10:41:31",
    REQUIRED_EXTENSIONS: 2 // Number of extensions required for verification
};

// Rest of your existing functions remain the same until checkExtensions

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

// Rest of your code remains the same...
