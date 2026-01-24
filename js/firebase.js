import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB5zhFsdqM1XWPFNSCealDIttw6qB0Nag",
    authDomain: "cmpos-auth.firebaseapp.com",
    projectId: "cmpos-auth",
    storageBucket: "cmpos-auth.appspot.com",
    messagingSenderId: "301926083924",
    appId: "1:301926083924:web:c30c9278ea41691276acc1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
