export async function loadLatestVideos() {
    const channelId = "UC2d9o8Lg3_Xk9oF3x5x6j4w"; // Placeholder for CMP Radio if exact ID unknown, or derived from handle
    const apiKey = "AIzaSyB5zhFsdqM1XWPFNSCealDIttw6qB0Nag"; // Using Firebase Key (often dual purpose)
    const container = document.getElementById("featured-shows");

    if (!container) return;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3&type=video`
        );

        if (!response.ok) throw new Error("YouTube API Error");

        const data = await response.json();
        container.innerHTML = ""; // Clear loader

        data.items.forEach(item => {
            const card = document.createElement("div");
            card.className = "glass-card";
            card.innerHTML = `
        <img src="${item.snippet.thumbnails.medium.url}" style="width:100%; border-radius:4px; margin-bottom:1rem;">
        <h3>${item.snippet.title}</h3>
        <p>${new Date(item.snippet.publishedAt).toLocaleDateString()}</p>
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" class="btn">WATCH</a>
      `;
            container.appendChild(card);
        });

    } catch (e) {
        console.warn("YouTube Load Failed:", e);
        // Silent fail - leave default or empty
    }
}
