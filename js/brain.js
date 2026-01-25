export class Intelligence {
    constructor() {
        this.panel = null;
        this.active = false;
        this.setupListener();
    }

    setupListener() {
        document.addEventListener('viewChange', (e) => {
            this.analyzeContext(e.detail.view);
        });

        // Inject into Dashboard on init
        setTimeout(() => {
            this.panel = document.getElementById('intel-panel');
            if (this.panel) this.renderUI();
        }, 1000);
    }

    renderUI() {
        this.panel.innerHTML = `
            <div class="intel-header" onclick="window.agent09.toggle()">
                <div class="indicator"></div>
                <span>AGENT 09</span>
            </div>
            <div class="intel-content">
                <div class="chat-log" id="agent-chat">
                    <div class="msg system">System Initialized. Awaiting Context...</div>
                </div>
                <div class="input-area">
                    <input type="text" placeholder="Query Intelligence Layer..." onkeypress="window.agent09.handleInput(event)">
                </div>
            </div>
        `;
    }

    toggle() {
        this.panel.classList.toggle('open');
    }

    analyzeContext(view) {
        let suggestion = "";
        switch (view) {
            case 'executive':
                suggestion = "Analyzing Fiscal Reports. Note: 2 Grant Deadlines approaching next week.";
                break;
            case 'radio':
                suggestion = "FCC Log Verification Recommended. Last check: 48h ago.";
                break;
            case 'ops':
                suggestion = "Volunteer Shift gaps detected for Saturday broadcast.";
                break;
        }

        if (suggestion) {
            this.logMessage(suggestion, 'agent');
            // Auto open if urgent? For now, just notify.
        }
    }

    logMessage(text, type) {
        const chat = document.getElementById('agent-chat');
        if (!chat) return;

        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerText = text;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    handleInput(e) {
        if (e.key === 'Enter') {
            const val = e.target.value;
            this.logMessage(val, 'user');
            e.target.value = '';

            // Sim Response
            setTimeout(() => {
                this.logMessage("Acknowledged. Processing request via CMP Policy Tree...", 'agent');
            }, 800);
        }
    }
}

window.brain = new Intelligence();
