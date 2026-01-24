import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5zhFsdqM1XWPFNSCealDIttw6qB0Nag",
  authDomain: "cmpos-auth.firebaseapp.com",
  projectId: "cmpos-auth",
  storageBucket: "cmpos-auth.firebasestorage.app",
  messagingSenderId: "301926083924",
  appId: "1:301926083924:web:c30c9278ea41691276acc1",
  measurementId: "G-ZDRV14FWTJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
