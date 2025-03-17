from flask import Flask, send_from_directory
from flask_cors import CORS
from routes import api

def create_app():
    app = Flask(__name__, static_folder='../build', static_url_path='')
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    @app.route('/')
    def serve():
        return send_from_directory(app.static_folder, 'index.html') # type: ignore
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
