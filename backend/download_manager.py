import os
import requests
from urllib.parse import urlparse
from pathlib import Path

class DownloadManager:
    def __init__(self):
        self.download_dir = os.path.join(os.path.dirname(__file__), 'downloads')
        Path(self.download_dir).mkdir(exist_ok=True)

    def download_file(self, url, filename=None):
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            if not filename:
                filename = os.path.basename(urlparse(url).path)
            
            local_path = os.path.join(self.download_dir, filename)
            
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            
            return local_path
        except Exception as e:
            print(f"Download error: {e}")
            return None
