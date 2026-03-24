import os
import uuid

class ConversionService:
    def __init__(self,output_dir):
        self.output_dir = output_dir
        
    def convert(self,input_path, target_format):
        """
        Method responsible for actual conversion 
        of input files
        
        """
        
        ext = os.path.splitext(input_path)[1].lower()
        output_filename = f"{uuid.uuid4}.{target_format}"
        output_path = os.path.join(self.output_dir, output_filename)
        
        with open(input_path,"rb") as src:
            with open(output_path,"wb") as dst:
                dst.write(src.read())
        
        return output_filename