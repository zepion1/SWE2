from flask import Flask, request, redirect, jsonify, render_template, session, flash
import os
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
    
@app.route('/support/create-ticket', methods= ['POST'])
def Create_Ticket():
    connect_to_db()
    data = request.form
    if request.method == 'POST':
        ticket_id = data.get('ticket-id')
        title = data.get('title')
        email = data.get('email')
        hall = data.get('hall')
        room = data.get('classroom-number')
        description = data.get('description')
        if connection and connection.is_connected():
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO tickets (TicketID, Title, Email, Hall, Room, Description, Status) VALUES
                            (%s, %s, %s, %s, %s, %s , 'OPEN' )""", (ticket_id, title, email, hall, room, description,))
        connection.close()
    return f"Ticket ID: {ticket_id} has been created!"
    
@app.route('/support/close-ticket', methods = ['POST'])
def Close_Ticket():
    connect_to_db()
    data = request.form
    if request.method == 'POST':
        ticket_id = data.get('ticket-id')
        status = data.get('status')
        if connection and connection.is_connected():
            with connection.cursor() as cursor:
                cursor.execute(""" UPDATE tickets SET Status = %s WHERE TicketID = %s""", (status, ticket_id,))
        connection.close()
    return f"TicketID: {ticket_id} has been closed!"
    
@app.route('/support/view-ticket', methods=['GET', 'POST'])   
def View_Ticket(): 
    return 
    # WORK IN PROGRESS!
    
if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=9999)