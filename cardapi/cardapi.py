from flask import Flask
from markupsafe import escape
from getidinfo import *

app = Flask(__name__)

@app.route("/")
def index():
    return "<p>Index page</p>"

@app.route("/<name>")
def hello_world(name):
    return f"<p>Hello, {escape(name)}!</p>"

@app.route("/user/<username>")
def show_user_profile(username):
    return f"User {escape(username)}"

@app.route("/swipe-in/<cardid>")
def scan_in_user(cardid):
    studentname = get_user_from_card(cardid)
    return f"{studentname} has been marked present"