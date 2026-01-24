// --- 1. FIREBASE CONFIGURATION & INIT ---
const firebaseConfig = {
    apiKey: "AIzaSyB5zhFsdqM1XWPFNSCealDIttw6qB0Nag",
    authDomain: "cmpos-auth.firebaseapp.com",
    projectId: "cmpos-auth",
    storageBucket: "cmpos-auth.firebasestorage.app",
    messagingSenderId: "301926083924",
    appId: "1:301926083924:web:c30c9278ea41691276acc1",
    measurementId: "G-ZDRV14FWTJ"
};

// Initialize Firebase (Compat)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();
const provider = new firebase.auth.GoogleAuthProvider();

// --- 2. CONFIGURATION ---
const API_URL = "https://script.google.com/macros/s/AKfycby469tBOVlC0ods6AiLeq8M06EfZ2PGJyk47kfGcdlgUIL7bAWAKmo-vPjsqBUxI-IB/exec";

// --- 3. THE HARDCODED USER LIST (NO BACKEND REQUIRED) ---
const AUTHORIZED_USERS = {
    "samshavers@kingdomcommunications.net": { role: "SUPER_ADMIN", key: "## ADMIN-ALPHA-99 ##" },
    "info@cmpradio.net": { role: "SUPER_ADMIN", key: "## ADMIN-ALPHA-99 ##" },
    "sshavers@me.com": { role: "PARTNER", key: "## PARTNER-BRAVO-77 ##" },
    "illadelphia06@gmail.com": { role: "VOLUNTEER", key: "## VOL-CHARLIE-33 ##" }
};

// --- 4. AUTH FUNCTION ---
window.triggerAuth = async () => {
    try {
        const result = await auth.signInWithPopup(provider);
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
            await auth.signOut();
        }
    } catch (error) {
        console.error(error);
        alert("Auth Error: " + error.message);
    }
};

// --- 5. SUBMIT FUNCTION ---
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

// --- 6. PORTAL LOGIC ---
window.switchPortal = (portal) => {
    const btnFoundation = document.getElementById('btn-foundation');
    const btnRadio = document.getElementById('btn-radio');
    const portalFoundation = document.getElementById('portal-foundation');
    const portalRadio = document.getElementById('portal-radio');

    if (!btnFoundation || !btnRadio || !portalFoundation || !portalRadio) return;

    btnFoundation.classList.remove('active');
    btnRadio.classList.remove('active');
    document.getElementById(`btn-${portal}`).classList.add('active');

    if (portal === 'foundation') {
        portalFoundation.classList.remove('hidden');
        portalRadio.classList.add('hidden');
        document.body.style.backgroundColor = "#050505";
    } else {
        portalRadio.classList.remove('hidden');
        portalFoundation.classList.add('hidden');
        document.body.style.backgroundColor = "#080808";
        if (window.loadLatestVideo) window.loadLatestVideo();
    }
    window.scrollTo(0, 0);
};

window.scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.loadLatestVideo = async () => { console.log("Stream Refresh Triggered"); };

// Initialize View
window.addEventListener('load', () => {
    window.switchPortal('foundation');
});
