from PIL import Image, ImageDraw, ImageFont

# Let's inspect pixel colors in Card 1 around CALL NOW! (555) 123-4567
img1 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-refurbish-rescue.jpg')
w1, h1 = img1.size

# Let's check the area where "(555) 123-4567" is located
# We can save a grid with coordinate markers overlaid on bottom 250px so we know exact pixel coordinates!
overlay1 = img1.crop((0, 550, 1264, 848)).copy()
draw1 = ImageDraw.Draw(overlay1)
for x in range(0, 1264, 100):
    draw1.line([(x, 0), (x, 298)], fill=(255, 0, 0, 128))
    draw1.text((x+2, 5), str(x), fill=(255, 255, 0))
for y in range(0, 298, 20):
    draw1.line([(0, y), (1264, y)], fill=(0, 255, 0, 128))
    draw1.text((5, y+2), str(550+y), fill=(255, 255, 0))

overlay1.save('c:/Users/syclo/retrofit-web/scratch/grid1.png')

overlay2 = Image.open('c:/Users/syclo/retrofit-web/assets/postcards/postcard-new-builds.jpg').crop((0, 550, 1264, 848)).copy()
draw2 = ImageDraw.Draw(overlay2)
for x in range(0, 1264, 100):
    draw2.line([(x, 0), (x, 298)], fill=(255, 0, 0, 128))
    draw2.text((x+2, 5), str(x), fill=(255, 255, 0))
for y in range(0, 298, 20):
    draw2.line([(0, y), (1264, y)], fill=(0, 255, 0, 128))
    draw2.text((5, y+2), str(550+y), fill=(255, 255, 0))

overlay2.save('c:/Users/syclo/retrofit-web/scratch/grid2.png')

print("Grid markers generated.")
