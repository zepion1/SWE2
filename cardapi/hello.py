from flask import Flask
from markupsafe import escape

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
