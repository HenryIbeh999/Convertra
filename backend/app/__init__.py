from flask import Flask
from app.routes.routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENTH'] = 50 * 1024 * 1024 # 50MB limit
    
    register_routes(app)
    return app
    