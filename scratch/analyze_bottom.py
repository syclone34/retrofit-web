from PIL import Image

img1 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg')
img2 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg')

# Let's crop full bottom 250px of both to analyze exact text positions
img1.crop((0, 598, 1264, 848)).save('c:/Users/syclo/retrofit-web/scratch/full_bottom1.png')
img2.crop((0, 598, 1264, 848)).save('c:/Users/syclo/retrofit-web/scratch/full_bottom2.png')

print("Saved full bottom slices.")
