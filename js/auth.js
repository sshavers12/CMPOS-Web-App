import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

window.osLogin = async function () {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in:", result.user.email);
        alert("LOGIN SUCCESS: " + result.user.email);
    } catch (error) {
        console.error("Login failed:", error);
    }
};
