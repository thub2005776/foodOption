import os
from app import app
from flask import request, send_from_directory
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = os.path.join(app.root_path, 'static\\uploads')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return "uploaded"

@app.route('/images/<path:path>')
def send_image(path):
    full_path = os.path.join(app.config['UPLOAD_FOLDER'], path)
    if not os.path.exists(full_path):
        app.logger.error(f"File not found: {full_path}")
        return "File not found", 404
    return send_from_directory(app.config['UPLOAD_FOLDER'], path, as_attachment=True)