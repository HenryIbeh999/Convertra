import os
import uuid

class FileService:
    ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "txt", "docx", "xlsx"}

    def __init__(self, upload_dir, output_dir):
        self.upload_dir = upload_dir
        self.output_dir = output_dir
        
        # create upload,output for persistence
        os.makedirs(upload_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)
    
    def _get_extension(self, filename):
        return filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
    
    def _validate_extension(self, filename):
        ext = self._get_extension(filename)
        if ext not in self.ALLOWED_EXTENSIONS:
            raise ValueError(f"File type .{ext} is not allowed")
        return ext

    def _validate_empty_file(self, file):
        if file.filename == "":
            raise ValueError("Empty filename")
        
    def _validate_magic_number(self, file, ext):
        file.stream.seek(0)
        header = file.stream.read(8)
        file.stream.seek(0)
        
        MAGIC_NUMBERS = {
            "pdf": [b"%PDF"],
            "png": [b"\x89PNG\r\n\x1a\n"],
            "jpg": [b"\xff\xd8\xff"],
            "jpeg": [b"\xff\xd8\xff"],
            "txt": [],  # no strict magic number
            "docx": [b"PK\x03\x04"],  # ZIP-based format
            "xlsx": [b"PK\x03\x04"]  # ZIP-based format
        }
        
        # If no magic number defined, skip strict validation
        if ext in MAGIC_NUMBERS and MAGIC_NUMBERS[ext]:
            valid_signatures = MAGIC_NUMBERS[ext]

            if not any(header.startswith(sig) for sig in valid_signatures):
                raise ValueError(f"File content does not match .{ext} format")
    
    def save_file(self, file):
        """
        Verifies, saves and returns a file path
        based on what is uploaded
        
        """
        self._validate_empty_file(file)
        
        ext = self._validate_extension(file.filename)
        
        self._validate_magic_number(file, ext)
        
        filename = f"{uuid.uuid4()}.{ext}"
        path = os.path.join(self.upload_dir, filename)
        file.save(path)
        
        return path
