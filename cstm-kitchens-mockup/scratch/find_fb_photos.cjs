const fs = require('fs');

async function scrape() {
  const res = await fetch('https://www.facebook.com/cstmkitchens/photos', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const text = await res.text();
  fs.writeFileSync('scratch/fb.html', text);
  console.log('Saved fb.html, size:', text.length);

  // Search for image URLs
  const regex = /https:\\\/\\\/[^"'\s]*?scontent[^"'\s]*?\.(?:jpg|jpeg|png|webp)[^"'\s]*/gi;
  const urls = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    const cleanUrl = m[0].replace(/\\\//g, '/').replace(/&amp;/g, '&');
    urls.push(cleanUrl);
  }
  console.log('Found escaped scontent URLs:', urls.length);
  const unique = [...new Set(urls)];
  console.log('Unique URLs:', unique.length);
  unique.slice(0, 10).forEach(u => console.log(u));
}

scrape();
