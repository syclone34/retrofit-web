import re

def recolor_css(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements for gradients and text highlights
    content = content.replace('#00f2fe 0%, #4facfe 50%, #a100ff 100%', '#e75a32 0%, #f5ab27 50%, #2f8e91 100%')
    content = content.replace('#00f2fe 0%, #4facfe 100%', '#e75a32 0%, #f5ab27 100%')
    content = content.replace('#7928ca 0%, #ec4899 100%', '#2f8e91 0%, #e75a32 100%')
    content = content.replace('#00f2fe', '#e75a32')
    content = content.replace('#00c6ff', '#ff6e42')
    content = content.replace('#4facfe', '#f5ab27')
    content = content.replace('#a100ff', '#2f8e91')
    content = content.replace('#7928ca', '#237073')
    content = content.replace('#9333ea', '#2f8e91')
    content = content.replace('#a855f7', '#3bb1b5')
    content = content.replace('#ec4899', '#e75a32')

    # Replace hardcoded RGBA values
    # Cyan rgba(0, 242, 254, X) -> Orange rgba(231, 90, 50, X)
    content = re.sub(r'rgba\(\s*0\s*,\s*242\s*,\s*254\s*,', 'rgba(231, 90, 50,', content)
    # Cyan variant rgba(0, 198, 255, X) -> Teal rgba(47, 142, 145, X)
    content = re.sub(r'rgba\(\s*0\s*,\s*198\s*,\s*255\s*,', 'rgba(47, 142, 145,', content)
    # Violet rgba(168, 85, 247, X) -> Teal rgba(47, 142, 145, X)
    content = re.sub(r'rgba\(\s*168\s*,\s*85\s*,\s*247\s*,', 'rgba(47, 142, 145,', content)
    # Dark Violet rgba(121, 40, 202, X) -> Teal rgba(47, 142, 145, X)
    content = re.sub(r'rgba\(\s*121\s*,\s*40\s*,\s*202\s*,', 'rgba(47, 142, 145,', content)
    # Pink rgba(236, 72, 153, X) -> Gold rgba(245, 171, 39, X)
    content = re.sub(r'rgba\(\s*236\s*,\s*72\s*,\s*153\s*,', 'rgba(245, 171, 39,', content)

    # Ensure background base is rich warm midnight navy
    content = re.sub(r'--bg-space:\s*#[0-9a-fA-F]+;', '--bg-space: #101624;', content)
    content = re.sub(r'--bg-deep:\s*#[0-9a-fA-F]+;', '--bg-deep: #141c2e;', content)
    content = re.sub(r'--bg-surface:\s*#[0-9a-fA-F]+;', '--bg-surface: #1a253a;', content)
    content = re.sub(r'--bg-surface-elevated:\s*#[0-9a-fA-F]+;', '--bg-surface-elevated: #212e47;', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

recolor_css('c:/Users/syclo/retrofit-web/style.css')
recolor_css('c:/Users/syclo/retrofit-web/v2/style.css')
