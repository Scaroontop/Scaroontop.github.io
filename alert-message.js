(function() {
    const STORAGE_KEY = "verification-status";
    const VERIFICATION_EXPIRY_KEY = "verification-expiry";
    const ALERT_SEEN_KEY = "alert-seen";
    const CURRENT_UTC_TIME = "2025-03-22 08:49:43";
    const CURRENT_USER = "Scaroontop";

    function checkVerificationStatus() {
        const verificationExpiry = localStorage.getItem(VERIFICATION_EXPIRY_KEY);
        const isVerified = localStorage.getItem(STORAGE_KEY) === "verified";
        const now = new Date().getTime();
        const alertSeen = localStorage.getItem(ALERT_SEEN_KEY);
        
        return isVerified && verificationExpiry && parseInt(verificationExpiry) > now && !alertSeen;
    }

    function createAlertBox() {
        // Create the alert box container
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
            text-align: center;
            animation: fadeIn 0.3s ease-out;
        `;

        // Create the message
        const message = document.createElement('p');
        message.textContent = "Hello Student Please click on Open in About:blank it will prevent teachers from viewing your screens also keep in mind that it can detect about:blank so it may get closed if the the teacher is viewing students screens. New methods will be soon just wait :) - From love Scaro/Sap";
        message.style.cssText = `
            margin: 0 0 20px 0;
            font-size: 16px;
            color: #1f2937;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        `;

        // Create the button
        const button = document.createElement('button');
        button.textContent = "I understand";
        button.style.cssText = `
            background: #6366f1;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
        `;

        // Add hover effect
        button.onmouseover = () => button.style.background = '#4f46e5';
        button.onmouseout = () => button.style.background = '#6366f1';

        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            animation: fadeIn 0.3s ease-out;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Add click handler
        button.onclick = () => {
            localStorage.setItem(ALERT_SEEN_KEY, 'true');
            overlay.remove();
            alertBox.remove();
        };

        // Assemble and add to page
        alertBox.appendChild(message);
        alertBox.appendChild(button);
        document.body.appendChild(overlay);
        document.body.appendChild(alertBox);
    }

    // Initialize
    function initialize() {
        if (checkVerificationStatus()) {
            createAlertBox();
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
