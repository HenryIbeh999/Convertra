import os
from app.converters.pdf_converter import PdfConverter
from app.converters.docx_converter import DocxConverter
from app.converters.image_converter import ImageConverter
from app.converters.excel_converter import ExcelConverter

class ConversionService:
    def __init__(self, output_dir):
        self.output_dir = output_dir
        self.converters = {
            ".pdf": PdfConverter(output_dir),
            ".docx": DocxConverter(output_dir),
            ".png": ImageConverter(output_dir),
            ".jpg": ImageConverter(output_dir),
            ".jpeg": ImageConverter(output_dir),
            ".xlsx": ExcelConverter(output_dir)
        }

    def convert(self, input_path, target_format):
        """
        Method responsible for actual conversion 
        of input files by delegating to specific converters.
        """
        ext = os.path.splitext(input_path)[1].lower()
        
        if ext not in self.converters:
            # Fallback for plain text or unknown formats that might just need renaming (though validation should catch them)
            if ext == ".txt":
                import uuid
                output_filename = f"{uuid.uuid4()}.{target_format}"
                output_path = os.path.join(self.output_dir, output_filename)
                with open(input_path, "rb") as src:
                    with open(output_path, "wb") as dst:
                        dst.write(src.read())
                return output_filename
            
            raise ValueError(f"No converter found for extension: {ext}")

        converter = self.converters[ext]
        return converter.convert(input_path, target_format)