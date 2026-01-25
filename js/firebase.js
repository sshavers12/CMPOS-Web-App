import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB5zhFsdqM1XWPFNSCealDIttw6qB0Nag",
    authDomain: "cmpos-auth.firebaseapp.com",
    databaseURL: "https://cmpos-auth-default-rtdb.firebaseio.com",
    projectId: "cmpos-auth",
    storageBucket: "cmpos-auth.firebasestorage.app",
    messagingSenderId: "301926083924",
    appId: "1:301926083924:web:c30c9278ea41691276acc1",
    measurementId: "G-ZDRV14FWTJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
