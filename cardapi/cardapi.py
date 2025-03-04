from flask import Flask, request
from markupsafe import escape
from getidinfo import *

app = Flask(__name__)

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

@app.route("/swipe-in/<classid>")
def scan_in_user(classid):
    cardid = request.args.get('id')
    message = scan_in_student(cardid, classid)
    return f"{message}"