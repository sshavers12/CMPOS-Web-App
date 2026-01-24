import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase.js";

// --- 1. CONFIGURATION ---
// Integrted Apps Script Endpoint
const API_URL = "https://script.google.com/macros/s/AKfycby469tBOVlC0ods6AiLeq8M06EfZ2PGJyk47kfGcdlgUIL7bAWAKmo-vPjsqBUxI-IB/exec";

const provider = new GoogleAuthProvider();

// --- 2. THE HARDCODED USER LIST (NO BACKEND REQUIRED) ---
const AUTHORIZED_USERS = {
    "samshavers@kingdomcommunications.net": { role: "SUPER_ADMIN", key: "## ADMIN-ALPHA-99 ##" },
    "info@cmpradio.net": { role: "SUPER_ADMIN", key: "## ADMIN-ALPHA-99 ##" },
    "sshavers@me.com": { role: "PARTNER", key: "## PARTNER-BRAVO-77 ##" },
    "illadelphia06@gmail.com": { role: "VOLUNTEER", key: "## VOL-CHARLIE-33 ##" }
};

// --- 3. AUTH FUNCTION ---
window.triggerAuth = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const email = result.user.email.toLowerCase();

        console.log("Attempting Login:", email);

        if (AUTHORIZED_USERS[email]) {
            const user = AUTHORIZED_USERS[email];

            // Success: Copy Key & Open AI Studio
            navigator.clipboard.writeText(user.key);

            alert(
                `ACCESS GRANTED: ${user.role}\n\n` +
                `1. Session Key Copied: ${user.key}\n` +
                `2. Click OK to open the OS Console.\n` +
                `3. Paste the key to unlock your dashboard.`
            );

            window.open("https://aistudio.google.com/app/prompts/new_chat", "_blank");

        } else {
            // Failure
            alert(`ACCESS DENIED\nUser: ${email}\n\nYou are not in the authorized list. Contact JP/Admin.`);
            await signOut(auth);
        }
    } catch (error) {
        console.error(error);
        alert("Auth Error: " + error.message);
    }
};

// --- 4. SUBMIT FUNCTION ---
window.realSubmit = async (e, type) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const inputs = e.target.querySelectorAll('input, textarea');

    const originalText = btn.innerText;
    btn.innerText = "CONNECTING...";
    btn.style.opacity = "0.7";

    const data = {
        action: 'submitIntake',
        type: type,
        name: inputs[0].value,
        email: inputs[1].value,
        message: inputs[2] ? inputs[2].value : "N/A"
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        btn.innerText = "SUCCESS";
        btn.style.background = "#4CAF50";
        e.target.reset();

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "#FF6700";
            btn.style.opacity = "1";
        }, 3000);

    } catch (error) {
        console.error("Submission Error", error);
        btn.innerText = "ERROR";
        btn.style.background = "red";
    }
};

// --- 5. PORTAL LOGIC ---
window.switchPortal = (portal) => {
    document.getElementById('btn-foundation').classList.remove('active');
    document.getElementById('btn-radio').classList.remove('active');
    document.getElementById(`btn-${portal}`).classList.add('active');

    if (portal === 'foundation') {
        document.getElementById('portal-foundation').classList.remove('hidden');
        document.getElementById('portal-radio').classList.add('hidden');
        document.body.style.backgroundColor = "#050505";
    } else {
        document.getElementById('portal-radio').classList.remove('hidden');
        document.getElementById('portal-foundation').classList.add('hidden');
        document.body.style.backgroundColor = "#080808";
        window.loadLatestVideo();
    }
    window.scrollTo(0, 0);
};

window.scrollToId = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
};

window.loadLatestVideo = async () => { console.log("Stream Refresh Triggered"); };
window.switchPortal('foundation');
