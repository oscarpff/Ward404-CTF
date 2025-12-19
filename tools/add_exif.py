from PIL import Image
import piexif
import piexif.helper
from pathlib import Path

def main():
    src_png = Path("assets/foto_pasillo.png")
    dst_jpg = Path("assets/foto_pasillo_with_exif.jpg")

    if not src_png.exists():
        print(f"Source image not found: {src_png}")
        return 1

    # Convert PNG -> JPEG
    img = Image.open(src_png)
    rgb = img.convert("RGB")
    rgb.save(dst_jpg, quality=90)

    # Prepare EXIF
    image_description = "FLAG{SOCMINT_EVIDENCE}"
    user_comment = piexif.helper.UserComment.dump(image_description, encoding="unicode")

    zeroth_ifd = {piexif.ImageIFD.ImageDescription: image_description}
    exif_ifd = {piexif.ExifIFD.UserComment: user_comment}
    exif_dict = {"0th": zeroth_ifd, "Exif": exif_ifd}
    exif_bytes = piexif.dump(exif_dict)

    piexif.insert(exif_bytes, str(dst_jpg))

    # Verify
    loaded = piexif.load(str(dst_jpg))
    desc = loaded["0th"].get(piexif.ImageIFD.ImageDescription)
    uc = loaded["Exif"].get(piexif.ExifIFD.UserComment)
    decoded_uc = piexif.helper.UserComment.load(uc) if uc else None

    print("Wrote EXIF to:", dst_jpg)
    print("ImageDescription:", desc)
    print("UserComment:", decoded_uc)
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
