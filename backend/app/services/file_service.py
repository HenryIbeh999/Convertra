import os
import uuid

class FileService:
    def __init__(self,upload_dir,output_dir):
        self.upload_dir = upload_dir
        self.output_dir = output_dir
        
        #create upload,output for persistence
        os.makedirs(upload_dir,exist_ok=True)
        os.makedirs(output_dir,exist_ok=True)
        
    def save(self, file):
        filename = f"{uuid.uuid4()}_{file.filename}"
        path = os.path.join(self.upload_dir,filename)
        file.save(path)
        
        return path