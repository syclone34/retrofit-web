from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Let's inspect card2_banner_after.png
# Let's refine Card 1:
img1 = Image.open('C:/Users/syclo/.gemini/antigravity-ide/brain/cc9dfc72-6594-491c-abac-ce8d63223497/retrofit_refurbish_postcard_1789249337116.jpg')
draw1 = ImageDraw.Draw(img1)

# Exact background color sampled from surrounding area
# In Card 1: The banner background is (8, 26, 47)
draw1.rectangle([(670, 624), (1120, 672)], fill=(8, 26, 47))
font1 = ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 37)
draw1.text((672, 626), "CALL NOW! (612) 516-3145", fill=(255, 255, 255), font=font1)

img1.save('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg', quality=98)


# Let's refine Card 2:
img2 = Image.open('C:/Users/syclo/.gemini/antigravity-ide/brain/cc9dfc72-6594-491c-abac-ce8d63223497/retrofit_new_build_postcard_1789249351996.jpg')
draw2 = ImageDraw.Draw(img2)

# In Card 2:
# Background of the footer banner is (7, 26, 47)
# Text "800-123-4567" is located at x=605..820, y=705..746
draw2.rectangle([(600, 704), (825, 746)], fill=(7, 26, 47))
font2 = ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 32)
draw2.text((605, 707), "(612) 516-3145", fill=(255, 255, 255), font=font2)

img2.save('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg', quality=98)
print("Both original image cards updated with high quality.")
