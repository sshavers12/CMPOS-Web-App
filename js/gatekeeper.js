import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// Static Imports (No 404s allowed)
import "./studio.js";
import "./brain.js";

const provider = new GoogleAuthProvider();

export async function login() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("CMPOS Auth Success:", user.email);

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
