import urllib.request
import re

url = "https://retrofitwebdesign.com"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

css_match = re.search(r'href="([^"]*style\.css[^"]*)"', html)
print("Live CSS link:", css_match.group(1) if css_match else "None")

# Fetch live CSS
if css_match:
    css_url = "https://retrofitwebdesign.com/" + css_match.group(1).lstrip('./')
    css_req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
    css_text = urllib.request.urlopen(css_req).read().decode('utf-8')
    print("Live CSS length:", len(css_text))
    print("Has minmax(0, 1fr) in live CSS:", "minmax(0, 1fr)" in css_text)
    print("Has mobileNavSlideIn in live CSS:", "mobileNavSlideIn" in css_text)
