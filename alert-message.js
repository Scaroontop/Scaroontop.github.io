(function() {
    const STORAGE_KEY = "verification-status";
    const VERIFICATION_EXPIRY_KEY = "verification-expiry";
    const ALERT_SEEN_KEY = "alert-seen";
    const CURRENT_UTC_TIME = "2025-03-22 09:31:48";
    const CURRENT_USER = "Scaroontop";

    function checkVerificationStatus() {
        const verificationExpiry = localStorage.getItem(VERIFICATION_EXPIRY_KEY);
        const isVerified = localStorage.getItem(STORAGE_KEY) === "verified";
        const now = new Date().getTime();
        const alertSeen = localStorage.getItem(ALERT_SEEN_KEY);
        
        // For testing, always return true
        return true; // This will make the alert always show
        // Return this instead for production:
        // return isVerified && verificationExpiry && parseInt(verificationExpiry) > now && !alertSeen;
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

        // Create the messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.style.cssText = `
            margin: 0 0 20px 0;
            display: flex;
            flex-direction: column;
            gap: 15px;
        `;

        // Add multiple messages
        const messages = [
            "Hello Student!",
            "Please click on Open in About:blank - it will prevent teachers from viewing your screens.",
            "Keep in mind that it can detect about:blank so it may get closed if the teacher is viewing student's screens.",
            "New methods will be coming soon, just wait :)",
            "- From love Scaro/Sap"
        ];

        messages.forEach((text, index) => {
            const message = document.createElement('p');
            message.textContent = text;
            message.style.cssText = `
                margin: 0;
                font-size: ${index === 0 ? '18px' : '14px'};
                color: ${index === 0 ? '#1f2937' : '#4b5563'};
                font-weight: ${index === 0 ? '600' : '400'};
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                ${index === messages.length - 1 ? 'font-style: italic;' : ''}
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

        // Create the buttons
        const buttons = [
            { text: "I understand", primary: true },
            { text: "Changelog", primary: false }
        ];

        buttons.forEach(btnConfig => {
            const button = document.createElement('button');
            button.textContent = btnConfig.text;
            button.style.cssText = `
                background: ${btnConfig.primary ? '#6366f1' : '#e5e7eb'};
                color: ${btnConfig.primary ? 'white' : '#374151'};
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s;
                flex: 1;
                max-width: 150px;
            `;

            button.onmouseover = () => button.style.background = btnConfig.primary ? '#4f46e5' : '#d1d5db';
            button.onmouseout = () => button.style.background = btnConfig.primary ? '#6366f1' : '#e5e7eb';

            button.onclick = () => {
                if (btnConfig.primary) {
                    localStorage.setItem(ALERT_SEEN_KEY, 'true');
                    overlay.remove();
                    alertBox.remove();
                } else {
                    // Handle changelog button click
                    alert("Changelog coming soon!");
                }
            };

            buttonsContainer.appendChild(button);
        });

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

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

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

        // Assemble and add to page
        alertBox.appendChild(messagesContainer);
        alertBox.appendChild(buttonsContainer);
        alertBox.appendChild(timestamp);
        document.body.appendChild(overlay);
        document.body.appendChild(alertBox);
    }

    // Initialize immediately
    createAlertBox();
})();
