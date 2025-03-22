(function() {
    const STORAGE_KEY = "verification-status";
    const VERIFICATION_EXPIRY_KEY = "verification-expiry";
    const ALERT_SEEN_KEY = "alert-seen";
    const CURRENT_UTC_TIME = "2025-03-22 10:07:12";
    const CURRENT_USER = "Scaroontop";

    // Define different message sets
    const INITIAL_MESSAGES = [
        { text: "Test", style: "font-size: 18px; font-weight: 600; color: #1f2937;" }
    ];

    const SCARO_MESSAGES = [
        { text: "Hello Student!", style: "font-size: 18px; font-weight: 600; color: #1f2937;" },
        { text: "Please click on Open in About:blank - it will prevent teachers from viewing your screens.", style: "font-size: 14px; color: #4b5563;" },
        { text: "Keep in mind that it can detect about:blank so it may get closed if the teacher is viewing students screens.", style: "font-size: 14px; color: #4b5563;" },
        { text: "New methods will be coming soon, just wait :)", style: "font-size: 14px; color: #4b5563;" },
        { text: "- From love Scaro/Sap", style: "font-size: 14px; color: #6b7280; font-style: italic;" }
    ];

    const CHANGELOG_MESSAGES = [
        { text: "Changelog", style: "font-size: 20px; font-weight: 600; color: #1f2937;" },
        { text: "Version 1.0.1 (2025-03-22)", style: "font-size: 16px; font-weight: 600; color: #4b5563;" },
        { text: "• Added verification system", style: "font-size: 14px; color: #6b7280;" },
        { text: "• Improved about:blank cloaking", style: "font-size: 14px; color: #6b7280;" },
        { text: "• Added new games section", style: "font-size: 14px; color: #6b7280;" },
        { text: "Version 1.0.0 (2025-03-21)", style: "font-size: 16px; font-weight: 600; color: #4b5563; margin-top: 8px;" },
        { text: "• Initial release", style: "font-size: 14px; color: #6b7280;" },
        { text: "• Basic game functionality", style: "font-size: 14px; color: #6b7280;" }
    ];

    function checkVerificationStatus() {
        const verificationExpiry = localStorage.getItem(VERIFICATION_EXPIRY_KEY);
        const isVerified = localStorage.getItem(STORAGE_KEY) === "verified";
        const now = new Date().getTime();
        
        return isVerified && verificationExpiry && parseInt(verificationExpiry) > now;
    }

    function createMessageBox(messages, isChangelog = false) {
        // Remove any existing alert
        const existingOverlay = document.querySelector('.alert-overlay');
        const existingBox = document.querySelector('.alert-box');
        if (existingOverlay) existingOverlay.remove();
        if (existingBox) existingBox.remove();

        // Create the alert box container
        const alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
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
            animation: fadeIn 0.3s ease-out;
        `;

        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.style.cssText = `
            margin: 0 0 20px 0;
            display: flex;
            flex-direction: column;
            gap: 15px;
        `;

        // Add messages
        messages.forEach(msgConfig => {
            const message = document.createElement('p');
            message.textContent = msgConfig.text;
            message.style.cssText = `
                margin: 0;
                ${msgConfig.style}
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            `;
            messagesContainer.appendChild(message);
        });

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: flex;
            gap: 10px;
            justify-content: center;
        `;

        // Create the buttons based on context
        const buttons = [];
        
        if (isChangelog) {
            buttons.push(
                { text: "I understand", primary: true },
                { text: "Later", primary: true }
            );
        } else {
            buttons.push(
                { text: "Changelogs", primary: true },
                { text: "I understand", primary: true }
            );
        }

        buttons.forEach(btnConfig => {
            const button = document.createElement('button');
            button.textContent = btnConfig.text;
            button.style.cssText = `
                background: #6366f1;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s;
                flex: 1;
                max-width: 200px;
            `;

            button.onmouseover = () => button.style.background = '#4f46e5';
            button.onmouseout = () => button.style.background = '#6366f1';

            button.onclick = () => {
                if (button.textContent === "I understand") {
                    localStorage.setItem(ALERT_SEEN_KEY, 'true');
                    overlay.remove();
                    alertBox.remove();
                } else if (button.textContent === "Later") {
                    overlay.remove();
                    alertBox.remove();
                } else if (button.textContent === "Changelogs") {
                    createMessageBox(CHANGELOG_MESSAGES, true);
                }
            };

            buttonsContainer.appendChild(button);
        });

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
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
        `;
        document.head.appendChild(style);

        // Assemble and add to page
        alertBox.appendChild(messagesContainer);
        alertBox.appendChild(buttonsContainer);
        alertBox.appendChild(timestamp);
        document.body.appendChild(overlay);
        document.body.appendChild(alertBox);
    }

    // Initialize
    function initialize() {
        // Only show messages if user is verified
        if (checkVerificationStatus() && !localStorage.getItem(ALERT_SEEN_KEY)) {
            createMessageBox(INITIAL_MESSAGES, false);
        }
    }

    // Run immediately
    initialize();
})();
