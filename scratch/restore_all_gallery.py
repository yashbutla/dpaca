import os
import zipfile
import re

zip_path = r"WEBSITE PHOTO-20260707T074612Z-3-001.zip"
dest_root = r"public/images/gallery"

def clean_filename(filename):
    base, ext = os.path.splitext(filename)
    clean_base = "".join([c if c.isalnum() else "_" for c in base]).lower()
    clean_base = "_".join(filter(None, clean_base.split("_")))
    return clean_base + ext.lower()

def clean_dirname(name):
    clean = name.lower()
    clean = re.sub(r'[^a-z0-9]', '_', clean)
    clean = re.sub(r'_+', '_', clean)
    return clean.strip('_')

def get_category_and_sub(rel_path):
    parts = [p.strip() for p in rel_path.split('/') if p.strip()]
    if not parts:
        return "Infrastructure", "General"
        
    p1 = parts[0].upper()
    p2 = parts[1].upper() if len(parts) > 1 else ""
    p3 = parts[2].upper() if len(parts) > 2 else ""

    category = "Infrastructure"
    subcategory = "General"

    if "CLASS ROOM" in p1:
        category = "Education"
        subcategory = "Class Room"
    elif "COMPUTER LAB" in p1:
        category = "Vocational"
        subcategory = "Computer Lab"
    elif "VOCATIONAL" in p1:
        category = "Vocational"
        if "BOYS" in p2:
            subcategory = "Observation Home Boys Activity"
        elif "SCIENCE" in p2:
            subcategory = "Science Summer Camp"
        else:
            subcategory = "Vocational Training"
    elif "ACTICITY" in p1 and "TAILORING" in p2:
        category = "Vocational"
        subcategory = "Tailoring Class"
    elif "ACTICITY" in p1 and "DEFENCE" in p2:
        category = "Vocational"
        subcategory = "Self Defence Training"
    elif "SPORT" in p1:
        category = "Recreation"
        if "NASHIK" in p2:
            subcategory = "Nashik Baal Mahotsav"
        elif "BAAL" in p2:
            subcategory = "Baal Mahotsav Sports"
        elif "THAI" in p2:
            subcategory = "Thai Boxing"
        else:
            subcategory = "Sports & Games"
    elif "TRIP" in p1:
        category = "Recreation"
        if "BHANDAAR" in p2 or "BHANDAAR" in p3:
            subcategory = "Bhandardara Trip"
        elif "BHIMA" in p2:
            subcategory = "Bhimashankar Trip"
        elif "SWEET" in p2:
            subcategory = "Sweet Home Trip"
        else:
            subcategory = "Educational Trips"
    elif "YOGA" in p1:
        category = "Recreation"
        subcategory = "Yoga & Wellness"
    elif "GARDEN" in p1:
        category = "Infrastructure"
        subcategory = "Garden & Organic Farming"
    elif "HEALTH" in p1:
        category = "Infrastructure"
        subcategory = "Health Check Up Camps"
    elif "NEW OFFICE" in p1 or "INOGRATION" in p1:
        category = "Infrastructure"
        subcategory = "Office Inauguration"
    elif "WEDDING" in p1 or "MARRIAGE" in p1:
        category = "Events"
        subcategory = "Alumni Wedding Programme"
    elif "ANNUAL FUNCTION" in p1:
        category = "Events"
        subcategory = "Annual Function"
    elif "ANNUAL MEETING" in p1:
        category = "Events"
        subcategory = "Annual Meeting"
    elif "EVENTS" in p1:
        category = "Events"
        if "BAAL" in p2 or "CHILD" in p2:
            subcategory = "Children's Day (Baal Din)"
        elif "SHIV" in p2:
            subcategory = "Shiv Jayanti"
        else:
            subcategory = "Special Events"
    elif "1 MAY" in p1:
        category = "Events"
        subcategory = "Maharashtra Day (1 May)"
    elif "26 JAN" in p1:
        category = "Events"
        subcategory = "Republic Day (26 Jan)"
    elif "ACTICITY" in p1:
        category = "Recreation"
        if "DASRA" in p2 or "PHUL" in p2:
            subcategory = "Dasara Phul Mala Activity"
        elif "DIWALI" in p2:
            subcategory = "Diwali Activities"
        elif "SUMMER" in p2:
            subcategory = "Summer Camp Activities"
        else:
            subcategory = "Recreational Activities"
    elif "COLLECTOR" in p1 or "VISIT" in p1 or any(ord(c) > 127 for c in p1):
        category = "Events"
        subcategory = "District Collector Visit"
    elif "NEWS" in p1:
        category = "Infrastructure"
        subcategory = "Press Coverage & News"
    elif "PPT" in p1:
        category = "Infrastructure"
        subcategory = "Presentation Slides"

    return category, subcategory

print("Restoring all gallery images to clean unblurred versions from ZIP...")
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    infolist = zip_ref.infolist()
    extracted_total = 0
    
    for info in infolist:
        original_path = info.filename
        
        # Skip directories
        if original_path.endswith('/'):
            continue
            
        # Get relative path inside WEBSITE PHOTO
        if not original_path.startswith("WEBSITE PHOTO/"):
            continue
            
        rel_path = original_path.replace("WEBSITE PHOTO/", "", 1)
        
        # Verify it's an image file
        ext = os.path.splitext(original_path)[1].lower()
        if ext not in ('.jpg', '.jpeg', '.png', '.gif', '.webp'):
            continue
            
        category, subcategory = get_category_and_sub(rel_path)
        
        # Clean names
        clean_cat = clean_dirname(category)
        clean_sub = clean_dirname(subcategory)
        filename = os.path.basename(original_path)
        clean_file = clean_filename(filename)
        
        # Construct target path
        target_dir = os.path.join(dest_root, clean_cat, clean_sub)
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, clean_file)
        
        # Extract and save (overwriting blurred images)
        try:
            with zip_ref.open(info) as source, open(target_path, "wb") as target:
                target.write(source.read())
            
            extracted_total += 1
            if extracted_total % 100 == 0:
                print(f"Restored {extracted_total} images...")
        except Exception as e:
            print(f"Failed to restore {original_path}: {e}")

print(f"\nGallery Restoration Complete! Successfully restored {extracted_total} unblurred images.")
