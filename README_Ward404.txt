Ward404 CTF — notas rápidas

This small CTF is intended for classroom use. The exercises are file-based and do not require a server.

Helpful tools:
- A modern browser (Chrome, Firefox)
- A text editor
- PowerShell or a Unix shell for searching files
- `exiftool` (recommended) or Python with `pillow` + `piexif` for reading EXIF metadata from images

Quick EXIF check (PowerShell + Python example):
```powershell
python -c "from PIL import Image; import piexif; d=piexif.load('assets/foto_pasillo_with_exif.jpg'); print(d['0th'].get(270), piexif.helper.UserComment.load(d['Exif'].get(37510)))"
```
