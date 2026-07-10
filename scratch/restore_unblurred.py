import zipfile
import os

zip_path = r"WEBSITE PHOTO-20260707T074612Z-3-001.zip"
dest_root = r"public/images/gallery"

# List of folders to restore
restore_folders = [
    "ANNUAL MEETING",
    "ANNUAL MEETING ",
    "NEW OFFICE INOGRATION",
    "NEWS",
    "PPT",
    "मा.डॉ.पंकज आशिया साहेब कलेक्टर visit",
    "wedding programme"
]

def clean_filename(filename):
    base, ext = os.path.splitext(filename)
    clean_base = "".join([c if c.isalnum() else "_" for c in base]).lower()
    clean_base = "_".join(filter(None, clean_base.split("_")))
    return clean_base + ext.lower()

def get_category_and_sub(rel_path):
    parts = [p.strip() for p in rel_path.split('/') if p.strip()]
    if not parts:
        return None, None
        
    p1 = parts[0].upper()
    
    if "ANNUAL MEETING" in p1:
        return "events", "annual_meeting"
    elif "NEW OFFICE" in p1 or "INOGRATION" in p1:
        return "infrastructure", "office_inauguration"
    elif "NEWS" in p1:
        return "infrastructure", "press_coverage_news"
    elif "PPT" in p1:
        return "infrastructure", "presentation_slides"
    elif "COLLECTOR" in p1 or "VISIT" in p1 or any(ord(c) > 127 for c in p1):
        return "events", "district_collector_visit"
    elif "WEDDING" in p1 or "MARRIAGE" in p1:
        return "events", "alumni_wedding_programme"
        
    return None, None

print("Opening zip file for restoration...")
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    infolist = zip_ref.infolist()
    restored_count = 0
    
    for info in infolist:
        original_path = info.filename
        
        # Check if the path belongs to one of our restore folders
        should_restore = False
        for folder in restore_folders:
            if original_path.startswith(f"WEBSITE PHOTO/{folder}/"):
                should_restore = True
                break
                
        if not should_restore:
            continue
            
        # Get relative path inside WEBSITE PHOTO
        rel_path = original_path.replace("WEBSITE PHOTO/", "", 1)
        category, subcategory = get_category_and_sub(rel_path)
        
        if not category or not subcategory:
            continue
            
        # If it's a directory entry, skip it
        if original_path.endswith('/'):
            continue
            
        # Get original file name
        parts = original_path.split('/')
        filename = parts[-1]
        
        # Clean filename
        clean_file = clean_filename(filename)
        
        # Construct target destination
        target_dir = os.path.join(dest_root, category, subcategory)
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, clean_file)
        
        # Extract and overwrite the blurred image with the original
        try:
            with zip_ref.open(info) as source, open(target_path, "wb") as target:
                target.write(source.read())
            restored_count += 1
            if restored_count % 100 == 0:
                print(f"Restored {restored_count} images...")
        except Exception as e:
            print(f"Failed to restore {original_path}: {e}")

print(f"Restoration complete! Successfully restored {restored_count} original, unblurred images.")
