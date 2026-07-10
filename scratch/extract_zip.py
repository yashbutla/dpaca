import zipfile
import os

zip_path = r"WEBSITE PHOTO-20260707T074612Z-3-001.zip"
dest_dir = r"extracted_photos"

# Ensure dest dir exists
os.makedirs(dest_dir, exist_ok=True)

print("Opening zip file...")
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    infolist = zip_ref.infolist()
    print(f"Total entries in zip: {len(infolist)}")
    
    extracted_count = 0
    skipped_count = 0
    
    for info in infolist:
        original_path = info.filename
        
        # Split path by forward slash
        parts = original_path.split('/')
        
        # Clean each part by stripping whitespace
        cleaned_parts = []
        for part in parts:
            cleaned_part = part.strip()
            if cleaned_part:
                cleaned_parts.append(cleaned_part)
        
        if not cleaned_parts:
            continue
            
        # Reconstruct path using os.path.join
        cleaned_path = os.path.join(*cleaned_parts)
        target_path = os.path.join(dest_dir, cleaned_path)
        
        # Check if it is a folder entry
        if original_path.endswith('/'):
            os.makedirs(target_path, exist_ok=True)
            continue
            
        # Ensure parent folder exists
        os.makedirs(os.path.dirname(target_path), exist_ok=True)
        
        # Extract the file contents
        try:
            with zip_ref.open(info) as source, open(target_path, "wb") as target:
                target.write(source.read())
            extracted_count += 1
            if extracted_count % 100 == 0:
                print(f"Extracted {extracted_count} files...")
        except Exception as e:
            print(f"Failed to extract {original_path}: {e}")
            skipped_count += 1

print(f"Extraction completed! Successfully extracted: {extracted_count}, Skipped: {skipped_count}")
