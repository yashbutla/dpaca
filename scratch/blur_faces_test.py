import os
import cv2
import numpy as np

# Path to the gallery images
gallery_dir = r"public/images/gallery_test"

# Paths to models
frontal_cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
profile_cascade_path = cv2.data.haarcascades + 'haarcascade_profileface.xml'
age_proto_path = r"scratch/age_deploy.prototxt"
age_model_path = r"scratch/age_net.caffemodel"

# Load models
frontal_cascade = cv2.CascadeClassifier(frontal_cascade_path)
profile_cascade = cv2.CascadeClassifier(profile_cascade_path)
age_net = cv2.dnn.readNetFromCaffe(age_proto_path, age_model_path)

if frontal_cascade.empty() or profile_cascade.empty() or age_net.empty():
    print("Error: Could not load classifiers or deep learning models.")
    exit(1)

print("Face detection and age estimation models loaded successfully.")

# Age classes
age_list = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)

# Child age brackets that we want to BLUR
CHILD_BRACKETS = ['(0-2)', '(4-6)', '(8-12)', '(15-20)']

image_extensions = ('.jpg', '.jpeg', '.png', '.webp')

# Directories to skip entirely (adult-only folders, to optimize performance and prevent false positives)
EXCLUDE_FOLDERS = [
    "events/annual_meeting",
    "events/district_collector_visit",
    "events/alumni_wedding_programme",
    "infrastructure/office_inauguration",
    "infrastructure/press_coverage_news",
    "infrastructure/presentation_slides",
    "infrastructure/general"
]

def estimate_age(face_roi):
    try:
        # Preprocess the face ROI
        blob = cv2.dnn.blobFromImage(
            face_roi, 
            scalefactor=1.0, 
            size=(227, 227), 
            mean=MODEL_MEAN_VALUES, 
            swapRB=False
        )
        age_net.setInput(blob)
        age_preds = age_net.forward()
        age_index = age_preds[0].argmax()
        age = age_list[age_index]
        confidence = age_preds[0][age_index]
        return age, confidence
    except Exception as e:
        print(f"Error estimating age: {e}")
        return None, 0.0

def process_image(image_path, rel_path):
    img = cv2.imread(image_path)
    if img is None:
        return 0, 0
    
    height, width = img.shape[:2]
    
    # Scale down very large images to max 1600px
    max_dim = 1600
    if max(height, width) > max_dim:
        scale = max_dim / max(height, width)
        new_w = int(width * scale)
        new_h = int(height * scale)
        img = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)
        height, width = new_h, new_w

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Detect frontal faces
    frontal_faces = frontal_cascade.detectMultiScale(
        gray, 
        scaleFactor=1.08, 
        minNeighbors=3, 
        minSize=(20, 20)
    )
    
    # Detect profile faces
    profile_faces = profile_cascade.detectMultiScale(
        gray, 
        scaleFactor=1.08, 
        minNeighbors=3, 
        minSize=(20, 20)
    )
    
    # Combine detections
    all_faces = list(frontal_faces) + list(profile_faces)
    
    if len(all_faces) == 0:
        return 0, 0
        
    faces_detected = len(all_faces)
    faces_blurred = 0
    
    for (x, y, w, h) in all_faces:
        # Pad bounding box
        pad_x = int(w * 0.15)
        pad_y = int(h * 0.15)
        
        x1 = max(0, x - pad_x)
        y1 = max(0, y - pad_y)
        x2 = min(width, x + w + pad_x)
        y2 = min(height, y + h + pad_y)
        
        face_roi = img[y1:y2, x1:x2]
        if face_roi.size == 0:
            continue
            
        # Estimate age
        age, conf = estimate_age(face_roi)
        
        if age in CHILD_BRACKETS:
            # Determine blur kernel size
            ksize = int(max(w, h) / 1.2)
            if ksize % 2 == 0:
                ksize += 1
            ksize = max(51, min(ksize, 199))
            
            # Apply blur
            blurred_roi = cv2.GaussianBlur(face_roi, (ksize, ksize), 0)
            img[y1:y2, x1:x2] = blurred_roi
            faces_blurred += 1
            print(f"   [BLUR] Face at [{x},{y},{w},{h}] predicted as child: {age} (conf: {conf:.2f})")
        else:
            print(f"   [SKIP] Face at [{x},{y},{w},{h}] predicted as adult: {age} (conf: {conf:.2f})")
            
    if faces_blurred > 0:
        cv2.imwrite(image_path, img)
        
    return faces_detected, faces_blurred

def process_gallery():
    total_images = 0
    total_skipped = 0
    total_faces_detected = 0
    total_faces_blurred = 0
    
    print("\nScanning gallery_test directories...")
    for root, dirs, files in os.walk(gallery_dir):
        rel_dir = os.path.relpath(root, gallery_dir).replace('\\', '/')
        
        # Check exclusion list
        should_skip = False
        for exclude in EXCLUDE_FOLDERS:
            if rel_dir == exclude or rel_dir.startswith(exclude + "/"):
                should_skip = True
                break
                
        if should_skip:
            image_files = [f for f in files if f.lower().endswith(image_extensions)]
            if image_files:
                total_skipped += len(image_files)
                print(f"Skipping adult directory: {rel_dir} ({len(image_files)} images)")
            continue
            
        for file in files:
            if file.lower().endswith(image_extensions):
                image_path = os.path.join(root, file)
                rel_path = os.path.relpath(image_path, gallery_dir).replace('\\', '/')
                total_images += 1
                
                print(f"Processing: {rel_path}")
                det, blr = process_image(image_path, rel_path)
                total_faces_detected += det
                total_faces_blurred += blr
                
    print(f"\nProcessing Complete!")
    print(f"Total images scanned & processed: {total_images}")
    print(f"Total images skipped (adult/office folders): {total_skipped}")
    print(f"Total faces detected in child folders: {total_faces_detected}")
    print(f"Total faces blurred (children/teens): {total_faces_blurred}")
    print(f"Total faces skipped (teachers/portraits): {total_faces_detected - total_faces_blurred}")

if __name__ == "__main__":
    process_gallery()
