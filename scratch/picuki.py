import urllib.request
import re
import os

url = "https://www.picuki.com/profile/spicesalon.mn"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find profile picture
    profile_match = re.search(r'<img[^>]*class="profile-avatar"[^>]*src="([^"]+)"', html)
    if profile_match:
        profile_url = profile_match.group(1)
        print("Found logo:", profile_url)
        urllib.request.urlretrieve(profile_url, r"C:\Users\syclo\retrofit-web\spice-salon-mockup\public\logo.jpg")
    
    # Find post images
    post_matches = re.findall(r'<img[^>]*class="post-image"[^>]*src="([^"]+)"', html)
    for i, post_url in enumerate(post_matches[:2]):
        print(f"Found post {i}:", post_url)
        name = "hero.jpg" if i == 0 else "service.jpg"
        urllib.request.urlretrieve(post_url, rf"C:\Users\syclo\retrofit-web\spice-salon-mockup\public\{name}")
        
    print("Done")
except Exception as e:
    print("Error:", e)
