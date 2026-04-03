import fitz
import os
import uuid
import zipfile
from app.converters.base_converter import BaseConverter

class PdfConverter(BaseConverter):
    def convert(self, input_path, target_format):
        doc = fitz.open(input_path)
        output_filename = f"{uuid.uuid4()}.{target_format}"
        output_path = self.get_output_path(output_filename)

        try:
            if target_format == "txt":
                text = ""
                for page in doc:
                    text += page.get_text()
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(text)

            elif target_format == "png":
                if len(doc) == 1:
                    # Single page PDF
                    page = doc[0]
                    pix = page.get_pixmap()
                    pix.save(output_path)
                else:
                    # Multi-page PDF, create ZIP
                    output_filename = f"{uuid.uuid4()}.zip"
                    output_path = self.get_output_path(output_filename)
                    with zipfile.ZipFile(output_path, 'w') as zipf:
                        for idx, page in enumerate(doc):
                            pix = page.get_pixmap()
                            img_filename = f"page_{idx + 1}.png"
                            img_data = pix.tobytes("png")
                            zipf.writestr(img_filename, img_data)

            elif target_format == "html":
                html_content = ""
                for page in doc:
                    html_content += page.get_text("html")
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(html_content)

            else:
                raise ValueError(f"Unsupported target format for PDF: {target_format}")

            return output_filename

        finally:
            doc.close()
