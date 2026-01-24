import { login } from "./auth.js";
import { loadLatestVideos } from "./youtube.js";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Video Feed
    loadLatestVideos("featured-shows");

    // 2. Attach Auth Trigger
    const loginBtn = document.querySelector("#btn-login");
    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            login();
        });
    }

    // 3. Portal Switching Logic (Simple restoration)
    window.switchPortal = (portal) => {
        const sections = ["foundation", "radio"];
        sections.forEach(s => {
            const el = document.getElementById("portal-" + s);
            const btn = document.getElementById("btn-" + s);
            if (s === portal) {
                if (el) el.classList.remove("hidden");
                if (btn) btn.classList.add("active");
            } else {
                if (el) el.classList.add("hidden");
                if (btn) btn.classList.remove("active");
            }
        });

        // Background Shift
        document.body.style.backgroundColor = (portal === 'radio') ? '#080808' : '#050505';
    };
});
