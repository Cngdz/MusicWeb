import os
from werkzeug.utils import secure_filename

class UploadManager:
    def __init__(self):
        self.upload_dir = os.path.join(os.path.dirname(__file__), 'uploads')
        os.makedirs(self.upload_dir, exist_ok=True)

    def save_file(self, file):
        filename = secure_filename(file.filename)
        file_path = os.path.join(self.upload_dir, filename)
        file.save(file_path)
        return file_path
