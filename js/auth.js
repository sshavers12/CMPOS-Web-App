import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

export async function login() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("CMPOS Auth Success:", user.email);

        // Copy token simply to prove action
        const token = await user.getIdToken();
        navigator.clipboard.writeText(token);

        alert(`WELCOME AGENT: ${user.email}\n\nSession Token Copied to Clipboard.`);
        return user;
    } catch (error) {
        console.error("CMPOS Auth Error:", error.message);
        // Silent fail as per requirements (console only logs)
    }
}
