import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

export async function login() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("CMPOS Auth Success:", user.email);

        // Initializing Dashboard System
        import('./dashboard.js');
        import('./intelligence.js');

        // Wait slightly for modules then launch
        setTimeout(() => {
            if (window.dashboard) {
                document.getElementById('global-nav').classList.add('hidden');
                document.getElementById('portal-foundation').classList.add('hidden');
                document.getElementById('portal-radio').classList.add('hidden');
                document.querySelector('footer').classList.add('hidden');

                // Launch
                window.dashboard.init(user);
            }
        }, 500);

        return user;
    } catch (error) {
        console.error("CMPOS Auth Error:", error.message);
    }
}
