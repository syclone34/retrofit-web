from PIL import Image

img1 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg')
img1.crop((650, 610, 1150, 710)).save('c:/Users/syclo/retrofit-web/scratch/card1_call_text_after.png')

img2 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg')
img2.crop((180, 690, 880, 760)).save('c:/Users/syclo/retrofit-web/scratch/card2_banner_after.png')

print("Cropped updated regions for verification.")
