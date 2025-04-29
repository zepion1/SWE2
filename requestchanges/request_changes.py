from flask import Flask, request, redirect, jsonify, render_template, session, flash
import os
from datetime import datetime
import mysql.connector
from dotenv import load_dotenv

app = Flask(__name__)

config = {
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}

def connect_to_db():
    global connection
    connection = mysql.connector.connect(**config)

@app.route('/changes/submit-request', methods=['POST'])
def submit_request():
    connect_to_db()
    data = request.form
    if request.method == 'POST':
        teacher_id = data.get('teacher-id')
        current_room = data.get('current-room')
        new_room = data.get('new-room')
        reason = data.get('reason')
        status = data.get('status') # Approved, awaiting, Pending, denied, etc...
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        if connection and connection.is_connected():
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO REQUEST (TeacherID, CurrentRoom, NewRoom, Reason, Status, CreatedAt) VALUES
                            (%s, %s, %s, %s, %s, %s)""", (teacher_id, current_room, new_room, reason, status, timestamp))
        connection.close()
    return f"Request Change has been created!"


@app.route('/changes/status', methods=['GET'])
def get_status():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)

    try:
        query = """SELECT id, Status, CreatedAt AS date, CONCAT('Room change request for ', NewRoom) AS details FROM REQUEST ORDER BY created_at DESC"""
        cursor.execute(query)
        results = cursor.fetchall()
        return jsonify(results)
    except Exception as e:
        print("Database Error:", e)
        return jsonify([]), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/changes/history', methods=['GET'])
def get_history():
    conn = connect_to_db()
    cursor = conn.cursor(dictionary=True)

    try:
        query = """SELECT id, CreatedAt AS date, CONCAT('Submitted request for ', NewRoom) AS action FROM REQUEST ORDER BY created_at DESC"""
        cursor.execute(query)
        results = cursor.fetchall()
        return jsonify(results)
    except Exception as e:
        print("Database Error:", e)
        return jsonify([]), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=5000)