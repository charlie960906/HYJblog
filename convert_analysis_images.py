from pathlib import Path
from PIL import Image

root = Path(r"c:\Users\charl\Desktop\HYJdevelop專案\個人部落格NEW\public\images\Analysis_Advanced_Packaging_Industry")

for src in sorted(root.glob("*.png")):
    dst = src.with_suffix(".webp")
    if dst.exists():
        continue
    with Image.open(src) as im:
        rgb = im.convert("RGB") if im.mode not in ("RGB", "RGBA", "LA") else im
        rgb.save(dst, "WEBP", quality=90, method=6)
    print(f"converted {src.name} -> {dst.name}")

print(f"total_webp={len(list(root.glob('*.webp')))}")
