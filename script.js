// ANGEL is tik tok lovers.

async function download() {
            let url = document.getElementById("tiktokUrl").value;
            if (!url) {
                alert("⚠️ দয়া করে একটি TikTok ভিডিও URL দিন!");
                return;
            }

            let apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent("https://tik-tok-dl-api.wd-zone.workers.dev/?url=" + url)}`;
            
            try {
                let response = await fetch(apiUrl);
                let data = await response.json();

                console.log("API Response:", data);  // ✅ কনসোলে রেসপন্স দেখাবে

                if (data.play_url) {
                    document.getElementById("videoContainer").innerHTML = `
                        <h3>${data.title || "TikTok ভিডিও"}</h3>
                        <p>👤 <strong>Creator:</strong> ${data.author?.nickname || "Unknown"}</p>
                        <img src="${data.cover}" alt="Thumbnail" width="200"><br><br>
                        <video src="${data.play_url}" controls width="300"></video><br><br>
                        <p>📦 <strong>Size:</strong> ${data.size ? (data.size / 1024).toFixed(2) + " KB" : "Unknown"}</p>
                        <a href="${data.play_url}" download><button>⬇️ ভিডিও ডাউনলোড (No Watermark)</button></a>
                        <a href="${data.watermark_play_url || '#'}" download><button>⬇️ ভিডিও ডাউনলোড (Watermark)</button></a><br>
                        <a href="${data.music?.url || '#'}" download><button>🎵 মিউজিক ডাউনলোড</button></a><br><br>
                    `;
                } else {
                    alert("❌ ভিডিও ডাউনলোড লিঙ্ক পাওয়া যায়নি!");
                }

            } catch (error) {
                console.error("API Fetch Error:", error);
                alert("⚠️ কিছু ভুল হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।");
            }
}

// By WOODcraft 
