from flask import Flask, request, jsonify
from flask_cors import CORS
from markupsafe import escape
from getidinfo import *

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "<p>Index page</p>"

@app.route("/<name>")
def hello_world(name):
    return f"<p>Hello, {escape(name)}!</p>"

@app.route("/get-user/<cardid>")
def show_user_profile(cardid):
    studentname = get_user_from_card(cardid)
    return f"{studentname} has been marked present"

@app.route("/get-classes/")
def return_class_list():
    classlist = get_all_classes()
    return jsonify(classlist)

@app.route("/get-attendance-info/<classid>")
def fetch_attendance_info(classid):
    attendance = get_attendance_info(classid)
    return jsonify(attendance)

@app.route("/reset-class-attendance/<classid>", methods=['POST'])
def reset_attendance_info(classid):
    classes_reset = set_status_to_zero(classid)
    return jsonify(classes_reset)

@app.route("/swipe-in/", methods=['POST'])
def scan_in_user():
    data = request.form
    if request.method == 'POST':
        cardid = data.get('id')
        classid = data.get('cid')
        message = scan_in_student(cardid, classid)
        return f"{message}"

@app.route("/api/attendance", methods=['POST'])
def get_card_scan():
    data = request.form
    if request.method == 'POST':
        id = data.get("id")
        timestamp = data.get("timestamp")
        print(id)
        print(timestamp)
        return f"{id} swiped at {timestamp}"
        
if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port="5000")