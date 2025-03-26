async function download() {
    let url = document.getElementById("tiktokUrl").value;
    if (!url) {
        alert("⚠️ Please enter a TikTok video URL!");
        return;
    }

    let apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent("https://tik-tok-dl-api.wd-zone.workers.dev/?url=" + url)}`;
    
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        console.log("API Response:", data);  // ✅ Displays response in console

        if (data.play_url) {
            document.getElementById("videoContainer").innerHTML = `
                <h3>${data.title || "TikTok Video"}</h3>
                <p>👤 <strong>Creator:</strong> ${data.author?.nickname || "Unknown"}</p>
                <img src="${data.cover}" alt="Thumbnail" width="200"><br><br>
                <video src="${data.play_url}" controls width="300"></video><br><br>
                <p>📦 <strong>Size:</strong> ${data.size ? (data.size / 1024).toFixed(2) + " KB" : "Unknown"}</p>
                <a href="${data.play_url}" download><button>⬇️ Download Video (No Watermark)</button></a>
                <a href="${data.watermark_play_url || '#'}" download><button>⬇️ Download Video (Watermark)</button></a><br>
                <a href="${data.music?.url || '#'}" download><button>🎵 Download Music</button></a><br><br>
            `;
        } else {
            alert("❌ Video download link not found!");
        }

    } catch (error) {
        console.error("API Fetch Error:", error);
        alert("⚠️ Something went wrong! Please try again.");
    }
}
