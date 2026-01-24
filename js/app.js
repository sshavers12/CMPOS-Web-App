import "./auth.js";
import { loadLatestVideos } from "./youtube.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("CMPOS Bootstrapping...");

    // Initialize YouTube
    loadLatestVideos();

    // Attach Login Trigger
    const loginBtn = document.getElementById("btn-login");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (window.osLogin) window.osLogin();
        });
    }
});
