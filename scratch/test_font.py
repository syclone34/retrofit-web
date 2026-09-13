from PIL import Image, ImageDraw, ImageFont
import os

print("Available fonts:")
for f in ['arialbd.ttf', 'impact.ttf', 'trebucbd.ttf', 'segoeuib.ttf', 'tahomabd.ttf', 'framd.ttf']:
    path = os.path.join('C:\\Windows\\Fonts', f)
    if os.path.exists(path):
        print(f"  Found {f}")

# Let's check the pixel color of the background around the phone number in Card 1
img1 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg')
# Let's sample colors in Card 1 around x=800..1100, y=630..660
sample_pixels1 = [img1.getpixel((x, 620)) for x in range(700, 1100, 20)]
print("Sample colors Card 1 above phone:", sample_pixels1[:5])

# In Card 2, the bottom banner is navy blue, and phone number is in white or light cream
img2 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg')
sample_pixels2 = [img2.getpixel((x, 740)) for x in range(480, 640, 20)]
print("Sample colors Card 2 around phone:", sample_pixels2[:5])
