(function() {
    const STORAGE_KEY = "verification-status";
    const VERIFICATION_EXPIRY_KEY = "verification-expiry";
    const ALERT_SEEN_KEY = "alert-seen";
    const CURRENT_UTC_TIME = "2025-03-22 09:36:56";
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

    function createMessageBox(messages, showChangelogsButton = true) {
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

        // Create the buttons
        const buttons = [
            { text: "I understand", primary: true }
        ];

        if (showChangelogsButton) {
            buttons.unshift({ text: "Message from Scaro/sap", primary: false });
        }

        buttons.forEach(btnConfig => {
            const button = document.createElement('button');
            button.textContent = btnConfig.text;
            button.style.cssText = `
                background: ${btnConfig.primary ? '#6366f1' : '#e5e7eb'};
                color: ${btnConfig.primary ? 'white' : '#374151'};
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

            button.onmouseover = () => button.style.background = btnConfig.primary ? '#4f46e5' : '#d1d5db';
            button.onmouseout = () => button.style.background = btnConfig.primary ? '#6366f1' : '#e5e7eb';

            button.onclick = () => {
                if (btnConfig.primary) {
                    localStorage.setItem(ALERT_SEEN_KEY, 'true');
                    overlay.remove();
                    alertBox.remove();
                } else {
                    // Show Scaro's message
                    alertBox.remove();
                    createMessageBox(SCARO_MESSAGES, false);
                }
            };

            buttonsContainer.appendChild(button);
        });

        // Create overlay (if it doesn't exist)
        let overlay = document.querySelector('.alert-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'alert-overlay';
            overlay. style.cssText = `
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
            document.body.appendChild(overlay);
        }

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
        document.body.appendChild(alertBox);

        return { overlay, alertBox };
    }

    // Initialize
    function initialize() {
        createMessageBox(INITIAL_MESSAGES);
    }

    // Run immediately
    initialize();
})();
