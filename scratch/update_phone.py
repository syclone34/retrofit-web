import sys
from PIL import Image, ImageDraw, ImageFont

# Load both images
img1_path = 'c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg'
img2_path = 'c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg'

img1 = Image.open(img1_path)
img2 = Image.open(img2_path)

print(f"Card 1 (Refurbish) Size: {img1.size}")
print(f"Card 2 (New Builds) Size: {img2.size}")

# Let's crop the footer of Card 1
w1, h1 = img1.size
footer1 = img1.crop((0, int(h1 * 0.7), w1, h1))
footer1.save('c:/Users/syclo/retrofit-web/scratch/footer1.jpg')

# Let's crop the footer of Card 2
w2, h2 = img2.size
footer2 = img2.crop((0, int(h2 * 0.7), w2, h2))
footer2.save('c:/Users/syclo/retrofit-web/scratch/footer2.jpg')

print("Footers saved for inspection.")
