import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

export async function login() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("CMPOS Auth Success:", user.email);

        // Initializing Dashboard System
        console.log("Loading Studio Modules...");
        const v = Date.now();
        await import(`./studio.js?v=${v}`);
        await import(`./brain.js?v=${v}`);

        if (window.studio) {
            console.log("Launching Studio...");
            document.getElementById('global-nav').classList.add('hidden');
            document.getElementById('portal-foundation').classList.add('hidden');
            document.getElementById('portal-radio').classList.add('hidden');
            document.querySelector('footer').classList.add('hidden');

            // Launch
            window.studio.init(user);
        } else {
            console.error("Dashboard Module Failed to Load");
            alert("System Error: Dashboard module missing.");
        }

        return user;
    } catch (error) {
        console.error("CMPOS Auth Error:", error.message);
    }
}
