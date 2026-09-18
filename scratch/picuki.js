const fs = require('fs');
const https = require('https');

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

async function scrape() {
    try {
        const res = await fetch("https://www.picuki.com/profile/spicesalon.mn", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        });
        const html = await res.text();
        
        const profileMatch = html.match(/<img[^>]*class="profile-avatar"[^>]*src="([^"]+)"/);
        if (profileMatch) {
            console.log("Found logo:", profileMatch[1]);
            await downloadImage(profileMatch[1], "C:\\Users\\syclo\\retrofit-web\\spice-salon-mockup\\public\\logo.jpg");
        }
        
        const postMatches = [...html.matchAll(/<img[^>]*class="post-image"[^>]*src="([^"]+)"/g)];
        for (let i = 0; i < Math.min(2, postMatches.length); i++) {
            const url = postMatches[i][1];
            console.log("Found post:", url);
            const name = i === 0 ? "hero.jpg" : "service.jpg";
            await downloadImage(url, `C:\\Users\\syclo\\retrofit-web\\spice-salon-mockup\\public\\${name}`);
        }
        console.log("Done");
    } catch (e) {
        console.error("Error:", e);
    }
}

scrape();
