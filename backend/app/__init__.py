from flask import Flask
from app.routes.routes import register_routes

def create_app():
    app= Flask(__name__)
    app.config['MAX_CONTENT_LENTH'] = 50 * 1024 * 1024 # Constrict to a 50 MB Limit
    
    register_routes(app)
    
    return app