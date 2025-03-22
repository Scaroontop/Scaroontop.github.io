(function() {
    const STORAGE_KEY = "verification-status";
    const VERIFICATION_EXPIRY_KEY = "verification-expiry";
    const ALERT_SEEN_KEY = "alert-seen";
    const CURRENT_UTC_TIME = "2025-03-22 10:20:57";
    const CURRENT_USER = "Scaroontop";

    // Define different message sets
    const INITIAL_MESSAGES = [
        { text: "Test", style: "font-size: 18px; font-weight: 600; color: #1f2937;" },
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
        { text: "• Improved stuff", style: "font-size: 14px; color: #6b7280;" },
        { text: "• Updated Verify and alert 1000 times", style: "font-size: 14px; color: #6b7280;" },
        { text: "Version 1.0.0 (2025-03-21)", style: "font-size: 16px; font-weight: 600; color: #4b5563; margin-top: 8px;" },
        { text: "• Initial release", style: "font-size: 14px; color: #6b7280;" },
        { text: "• Added some games", style: "font-size: 14px; color: #6b7280;" }
    ];

    function createMessageBox(messages, type = 'initial') {
        // Remove existing elements
        const existingOverlay = document.querySelector('.alert-overlay');
        const existingBox = document.querySelector('.alert-box');
        if (existingOverlay) existingOverlay.remove();
        if (existingBox) existingBox.remove();

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

        // Create alert box
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
            animation: slideIn 0.3s ease-out;
        `;

        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.style.cssText = `
            margin: 0 0 20px 0;
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-height: 60vh;
            overflow-y: auto;
            padding-right: 10px;
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

        function createButton(text) {
            const button = document.createElement('button');
            button.textContent = text;
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

            return button;
        }

        // Add appropriate buttons based on type
        if (type === 'initial') {
            const changelogsButton = createButton('Changelogs');
            changelogsButton.onclick = () => {
                createMessageBox(CHANGELOG_MESSAGES, 'changelog');
            };
            buttonsContainer.appendChild(changelogsButton);

            const understandButton = createButton('I understand');
            understandButton.onclick = () => {
                localStorage.setItem(ALERT_SEEN_KEY, 'true');
                overlay.remove();
                alertBox.remove();
            };
            buttonsContainer.appendChild(understandButton);
        } else if (type === 'changelog') {
            const understandButton = createButton('I understand');
            understandButton.onclick = () => {
                localStorage.setItem(ALERT_SEEN_KEY, 'true');
                overlay.remove();
                alertBox.remove();
            };
            buttonsContainer.appendChild(understandButton);

            const laterButton = createButton('Later');
            laterButton.onclick = () => {
                overlay.remove();
                alertBox.remove();
            };
            buttonsContainer.appendChild(laterButton);
        }

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
                    transform: translate(-50%, -60%);
                }
                to { 
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
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

        // Add scrollbar styles
        const scrollbarStyle = document.createElement('style');
        scrollbarStyle.textContent = `
            .alert-box div::-webkit-scrollbar {
                width: 8px;
            }
            .alert-box div::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }
            .alert-box div::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
            }
            .alert-box div::-webkit-scrollbar-thumb:hover {
                background: #666;
            }
        `;
        document.head.appendChild(scrollbarStyle);

        // Assemble and add to page
        alertBox.appendChild(messagesContainer);
        alertBox.appendChild(buttonsContainer);
        alertBox.appendChild(timestamp);
        document.body.appendChild(overlay);
        document.body.appendChild(alertBox);

        return { overlay, alertBox };
    }

    // Initialize
    function initialize() {
        if (!localStorage.getItem(ALERT_SEEN_KEY)) {
            createMessageBox(INITIAL_MESSAGES, 'initial');
        }
    }

    // Run immediately
    initialize();
})();
