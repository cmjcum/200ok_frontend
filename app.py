import boto3
from flask import Flask, render_template, request, jsonify


# html에서 업로드하는 file을 s3에 저장시키는 코드
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('signin_up.html')

@app.route('/fileupload', methods=['POST'])
def file_upload():
    file = request.files['file']
    s3 = boto3.client('s3')
    s3.put_object(
        ACL="public-read",
        Bucket="{버킷이름}",
        Body=file,
        Key=file.filename,
        ContentType=file.content_type)
    return jsonify({'result': 'success'})

if __name__ == '__main__':
    app.run()