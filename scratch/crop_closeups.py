from PIL import Image, ImageDraw, ImageFont

img1 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg')
# Crop around the call text in Card 1
# Let's save a close-up crop of (650, 620, 1150, 720)
crop1 = img1.crop((650, 620, 1150, 720))
crop1.save('c:/Users/syclo/retrofit-web/scratch/card1_call_text.png')

# Card 2 close-up crop around the bottom banner
# Bounding box for RetroFitWebDesign.com | 800-123-4567 | CLAIM YOUR FREE STRATEGY CALL TODAY!
crop2 = img2 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg').crop((150, 700, 1150, 800))
crop2.save('c:/Users/syclo/retrofit-web/scratch/card2_banner.png')

print("Close-ups saved.")
