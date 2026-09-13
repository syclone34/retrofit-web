from PIL import Image, ImageDraw, ImageFont

# ==========================================
# CARD 1: Refurbish Postcard
# ==========================================
img1 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg')
draw1 = ImageDraw.Draw(img1)

# In Card 1:
# The background behind "CALL NOW! (555) 123-4567" is dark navy (approx rgb: (8, 25, 45) to (12, 33, 58))
# Let's cover "CALL NOW! (555) 123-4567" with the matching background color or subtle gradient
# Coordinates: x from 670 to 1120, y from 626 to 672
bg_color1 = (10, 27, 49) # dark navy matching the banner
draw1.rectangle([(670, 626), (1120, 672)], fill=bg_color1)

# Font for Card 1: Bold sans-serif matching "CALL NOW! (612) 516-3145" in crisp white
font1 = ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 38)
draw1.text((678, 628), "CALL NOW! (612) 516-3145", fill=(255, 255, 255), font=font1)

img1.save('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg', quality=95)
print("Card 1 updated successfully.")


# ==========================================
# CARD 2: New Builds Postcard
# ==========================================
img2 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg')
draw2 = ImageDraw.Draw(img2)

# In Card 2:
# Bottom bar has: [RetroFitWebDesign.com] | [icon] [800-123-4567] | [CLAIM YOUR FREE STRATEGY CALL TODAY!]
# The phone number area is roughly x from 590 to 825, y from 705 to 748
# The background is solid dark navy (rgb: (8, 30, 51))
bg_color2 = (8, 30, 51)
draw2.rectangle([(600, 706), (825, 746)], fill=bg_color2)

# Font for Card 2: Bold sans-serif in crisp white
font2 = ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 32)
draw2.text((605, 710), "(612) 516-3145", fill=(255, 255, 255), font=font2)

img2.save('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg', quality=95)
print("Card 2 updated successfully.")
