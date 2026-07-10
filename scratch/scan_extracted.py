import os

root_dir = r"extracted_photos/WEBSITE PHOTO"

for root, dirs, files in os.walk(root_dir):
    # Only print directories that actually contain files directly
    image_files = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]
    if image_files:
        rel_path = os.path.relpath(root, root_dir)
        print(f"Folder: {rel_path} | Images: {len(image_files)}")
