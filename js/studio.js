console.log("MODULE: studio.js loaded");

export class Studio {
    constructor() {
        this.container = document.getElementById('dashboard-container');
        // Elements queried dynamically after render
        this.currentUser = null;
    }

    // ... existing methods ...

}

// Global Access
window.studio = new Studio();

init(user) {
    alert("DEBUG: Dashboard Module Initialized for " + user.email);
    console.log("DASHBOARD: Starting Render...");

    try {
        this.currentUser = user;
        this.renderLayout();

        // Force Visibility (Aggressive)
        this.container.classList.remove('hidden');
        this.container.style.display = 'flex';
        this.container.style.zIndex = '9999';

        console.log("DASHBOARD: Layout Rendered. Container Unhidden.");
        this.loadView('executive');
    } catch (e) {
        alert("DASHBOARD CRASHED: " + e.message);
        console.error(e);
    }
}

renderLayout() {
    // Clear existing body content (leaving container)
    // Note: Ideally we toggle visibility, but for "Studio Mode" we overlay
    this.container.innerHTML = `
            <div id="studio-layout">
                <aside id="sidebar">
                    <div class="brand">CMP OS</div>
                    <nav>
                        <button onclick="window.dashboard.loadView('executive')" class="nav-item active">Executive</button>
                        <button onclick="window.dashboard.loadView('radio')" class="nav-item">Radio Ops</button>
                        <button onclick="window.dashboard.loadView('ops')" class="nav-item">Internal Ops</button>
                        <button onclick="window.dashboard.loadView('intelligence')" class="nav-item special">Intelligence</button>
                    </nav>
                    <div class="user-profile">
                        <div class="avatar"></div>
                        <div class="info">
                            <span class="name">${this.currentUser.email}</span>
                            <span class="role">ADMIN</span>
                        </div>
                    </div>
                </aside>
                <main id="stage"></main>
                <div id="intel-panel" class="closed"></div>
            </div>
        `;
}

loadView(viewName) {
    const stage = document.getElementById('stage');
    stage.innerHTML = '<div class="loading">Loading OS Module...</div>';

    // Broadcast event for Intelligence Layer
    const event = new CustomEvent('viewChange', { detail: { view: viewName } });
    document.dispatchEvent(event);

    setTimeout(() => {
        switch (viewName) {
            case 'executive':
                this.renderExecutive(stage);
                break;
            case 'radio':
                this.renderRadio(stage);
                break;
            case 'ops':
                this.renderOps(stage);
                break;
        }
    }, 300); // Simulate processing
}

renderExecutive(target) {
    target.innerHTML = `
            <header class="stage-header">
                <h2>Executive Overview</h2>
                <div class="date">${new Date().toLocaleDateString()}</div>
            </header>
            <div class="dashboard-grid">
                <div class="widget card">
                    <h3>Financial Health</h3>
                    <div class="metric big">$24,500</div>
                    <div class="sub">Monthly Operating Budget</div>
                </div>
                <div class="widget card">
                    <h3>Active Partnerships</h3>
                    <div class="metric">12</div>
                    <div class="list">
                        <li>Widener University</li>
                        <li>Chester Housing Authority</li>
                        <li>Boys & Girls Club</li>
                    </div>
                </div>
                <div class="widget card wide">
                    <h3>Governance Alerts</h3>
                    <div class="alert-box warning">Board Meeting Quorum Check Required (3 Days)</div>
                    <div class="alert-box info">Q1 Grant Report Due</div>
                </div>
            </div>
        `;
}

renderRadio(target) {
    target.innerHTML = `
            <header class="stage-header">
                <h2>Radio Operations</h2>
                <div class="status live">ON AIR</div>
            </header>
            <div class="dashboard-grid">
                <div class="widget card wide">
                    <h3>Program Schedule</h3>
                    <div class="schedule-row">
                        <time>09:00</time> <span>The Morning Wake Up</span> <span class="host">DJ ACE</span>
                    </div>
                    <div class="schedule-row active">
                        <time>12:00</time> <span>Midday Mix</span> <span class="host">LIVE</span>
                    </div>
                    <div class="schedule-row">
                        <time>15:00</time> <span>Community Talk</span> <span class="host">Guest</span>
                    </div>
                </div>
                <div class="widget card">
                    <h3>Stream Status</h3>
                    <div class="metric good">Stable</div>
                    <div class="sub">Bitrate: 320kbps</div>
                </div>
            </div>
        `;
}

renderOps(target) {
    target.innerHTML = `
             <header class="stage-header">
                <h2>Internal Operations</h2>
            </header>
             <div class="dashboard-grid">
                <div class="widget card wide">
                    <h3>Task Queue</h3>
                    <div class="task-item"><input type="checkbox"> Process New Volunteer Orientations</div>
                    <div class="task-item"><input type="checkbox"> Update Website Event Calendar</div>
                </div>
            </div>
        `;
}
}

// Global Access
window.studio = new Studio();
