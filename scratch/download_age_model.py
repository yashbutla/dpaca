import os
import urllib.request

proto_url = "https://huggingface.co/AjaySharma/genderDetection/resolve/main/age_deploy.prototxt"
model_url = "https://huggingface.co/AjaySharma/genderDetection/resolve/main/age_net.caffemodel"

proto_path = r"scratch/age_deploy.prototxt"
model_path = r"scratch/age_net.caffemodel"

# Ensure scratch directory exists
os.makedirs("scratch", exist_ok=True)

def download_file(url, path):
    print(f"Downloading {url} to {path}...")
    try:
        # Define a custom User-Agent to prevent Github from rate-limiting
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print("Download successful.")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Always attempt download or verify path
download_file(proto_url, proto_path)
download_file(model_url, model_path)
