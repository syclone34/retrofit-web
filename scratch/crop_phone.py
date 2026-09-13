from PIL import Image, ImageDraw, ImageFont
import os

img1 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg')
img2 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg')

# Let's crop specific candidate regions around the phone number for Card 1
# Width: 1264, Height: 848
# Card 1: "CALL NOW! (555) 123-4567" is roughly between y=600..660, x=650..1150
crop1 = img1.crop((650, 600, 1150, 680))
crop1.save('c:/Users/syclo/retrofit-web/scratch/phone1_region.png')

# Card 2: "(800) 555-0199" or "800-123-4567" in bottom banner roughly y=680..780, x=580..850
crop2 = img2.crop((550, 680, 880, 770))
crop2.save('c:/Users/syclo/retrofit-web/scratch/phone2_region.png')

print("Regions cropped.")
