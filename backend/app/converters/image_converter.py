from PIL import Image
import os
import uuid
from app.converters.base_converter import BaseConverter

class ImageConverter(BaseConverter):
    def convert(self, input_path, target_format):
        img = Image.open(input_path)
        
        # Convert RGBA to RGB for JPEG and PDF
        if target_format.lower() in ['jpg', 'jpeg', 'pdf'] and img.mode == 'RGBA':
            img = img.convert('RGB')
        
        output_filename = f"{uuid.uuid4()}.{target_format}"
        output_path = self.get_output_path(output_filename)
        
        img.save(output_path)
        img.close()
        
        return output_filename
