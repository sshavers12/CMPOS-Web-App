export async function loadLatestVideos(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Configuration
    const CHANNEL_ID = "UC2d9o8Lg3_Xk9oF3x5x6j4w"; // CMP Radio
    // Note: ideally API key should be restricted, using Firebase key as fallback if enabled for YouTube Data API
    const API_KEY = "AIzaSyB5zhFsdqM1XWPFNSCealDIttw6qB0Nag";

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4&type=video`
        );

        if (!response.ok) throw new Error("YouTube API Error: " + response.status);

        const data = await response.json();

        // Clear loading state
        container.innerHTML = "";

        data.items.forEach(item => {
            const title = item.snippet.title;
            const thumb = item.snippet.thumbnails.medium.url;
            const vidId = item.id.videoId;
            const date = new Date(item.snippet.publishedAt).toLocaleDateString();

            const card = document.createElement('div');
            card.className = "glass-card";
            card.style.padding = "0";
            card.style.overflow = "hidden";

            card.innerHTML = `
            <div style="height:140px; background:url('${thumb}') center/cover no-repeat; position:relative;">
                <a href="https://www.youtube.com/watch?v=${vidId}" target="_blank" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.4); text-decoration:none; color:white; font-size:2rem;">▶</a>
            </div>
            <div style="padding:1rem;">
                <h3 style="font-size:0.9rem; margin-bottom:0.5rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${title}</h3>
                <p style="font-size:0.75rem; color:#888;">${date}</p>
            </div>
        `;
            container.appendChild(card);
        });

    } catch (error) {
        console.warn("YouTube Feed Unreachable:", error);
        container.innerHTML = `<div class="glass-card" style="grid-column:1/-1; text-align:center;">Stream Offline (API Quota or Limit)</div>`;
    }
}
