import os
from PIL import Image, ImageDraw, ImageFont

def get_font(font_name, size):
    try:
        return ImageFont.truetype(font_name, size)
    except Exception:
        try:
            return ImageFont.truetype("arial.ttf", size)
        except Exception:
            return ImageFont.load_default()

WIDTH, HEIGHT = 1264, 848

CREAM = "#f8f5f0"
ORANGE = "#de573c"
TEAL = "#3caba3"
NAVY = "#0c1524" # fallback

logo_path = r"C:\Users\syclo\.gemini\antigravity-ide\brain\a7d30634-5444-41a2-a823-442bad804e29\.user_uploaded\media_1789477861841.png"

logo = Image.open(logo_path).convert("RGBA")

# Extract background color from top-left pixel
bg_pixel = logo.getpixel((10, 10))
BG_COLOR = bg_pixel

img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(img)

# Logo side
logo.thumbnail((650, 650), Image.Resampling.LANCZOS)
logo_x = 40
logo_y = (HEIGHT - logo.height) // 2 - 50
img.paste(logo, (logo_x, logo_y), mask=logo)

# Typography
font_headline = get_font("segoeuib.ttf", 52)
font_subhead = get_font("segoeuib.ttf", 46)
font_body = get_font("segoeuib.ttf", 26)
font_btn = get_font("segoeuib.ttf", 24)
font_footer = get_font("segoeui.ttf", 26)
font_footer_bold = get_font("segoeuib.ttf", 28)

text_x = 680
y = 210

draw.text((text_x, y), "MODERN WEB DESIGN", font=font_headline, fill=CREAM)
y += 100

bullets = [
    "Custom Website Design",
    "Responsive & Mobile-Friendly",
    "Fast 48-Hour Turnaround"
]

for b in bullets:
    draw.text((text_x, y), "✔", font=font_body, fill=ORANGE)
    draw.text((text_x + 45, y), b, font=font_body, fill=CREAM)
    y += 55

y += 40
btn_w = 420
btn_h = 65
try:
    draw.rounded_rectangle([text_x, y, text_x + btn_w, y + btn_h], fill=ORANGE, radius=12)
except AttributeError:
    draw.rectangle([text_x, y, text_x + btn_w, y + btn_h], fill=ORANGE)

btn_text = "GET A FREE CONSULTATION"
bbox = font_btn.getbbox(btn_text)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
draw.text((text_x + (btn_w - tw)/2, y + (btn_h - th)/2 - 5), btn_text, font=font_btn, fill=CREAM)

# Bottom Bar
y_bottom = HEIGHT - 140
draw.line([(60, y_bottom), (WIDTH - 60, y_bottom)], fill=ORANGE, width=2)
y_bottom += 40

footer_text_1 = "(612) 516-3145"
footer_text_2 = "RetroFitWebDesign.com"
footer_text_3 = "cole@retrofitwebdesign.com"

w1 = font_footer_bold.getlength(footer_text_1)
w2 = font_footer_bold.getlength(footer_text_2)
w3 = font_footer.getlength(footer_text_3)
total_w = w1 + 30 + w2 + 30 + w3
start_x = (WIDTH - total_w) / 2

draw.text((start_x, y_bottom), footer_text_1, font=font_footer_bold, fill=CREAM)
draw.text((start_x + w1 + 10, y_bottom - 2), "|", font=font_footer, fill=TEAL)
draw.text((start_x + w1 + 30, y_bottom), footer_text_2, font=font_footer_bold, fill=TEAL)
draw.text((start_x + w1 + 30 + w2 + 10, y_bottom - 2), "|", font=font_footer, fill=TEAL)
draw.text((start_x + w1 + 30 + w2 + 30, y_bottom), footer_text_3, font=font_footer, fill=CREAM)

# Save to both paths to cover both campaigns
img.save(r"c:\Users\syclo\retrofit-web\assets\postcards\postcard-new-builds.jpg", "JPEG", quality=95)
img.save(r"c:\Users\syclo\retrofit-web\assets\postcards\postcard-refurbish-rescue.jpg", "JPEG", quality=95)
print("Saved updated postcards successfully.")
