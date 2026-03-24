from flask import Blueprint, request, jsonify, send_from_directory
from app.services.conversion_service import ConversionService
from app.services.file_service import FileService

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"


convert_bp = Blueprint("convert",__name__)

@convert_bp.route("/api/convert", methods=['POST'])
def convert_file():
    
    # Extract user input(file)
    file = request.files.get('file')
    target_format = request.form.get('target_format')
    
    if not file or not target_format:
        return jsonify({"error": "file and target_format required"}), 400
    
    file_service = FileService(upload_dir=UPLOAD_DIR,output_dir=OUTPUT_DIR)
    conversion_service = ConversionService(OUTPUT_DIR)
    
    try:
        input_path = file_service.save(file)
        output_filename = conversion_service.convert(input_path,target_format)
        
        return jsonify({
            "message":"success",
            "download_url": f"/api/download/{output_filename}"
        })
        
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@convert_bp.route("/api/download/<filename>", methods=['GET'])
def download_file(filename):
    return send_from_directory(OUTPUT_DIR,filename, as_attachment=True)