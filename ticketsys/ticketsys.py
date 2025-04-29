from flask import Flask, request, redirect, jsonify, render_template, session, flash
import os
import mysql.connector
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        name = data.get('name')
        email = data.get('email')
        issue = data.get('issue')
        if connection and connection.is_connected():
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO tickets (name, email, issue, Status) VALUES (%s, %s, 'OPEN' )""", (name, email, issue,))
        connection.close()
    return print("Ticket has been created!")
    
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
    connect_to_db()
    data = request.form
    if request.method == 'GET':
        ticket_id = data.get('ticket-id')
        if connection and connection.is_connected():
            with connection.cursor () as cursor:
                cursor.execute(""" SELECT * FROM tickets WHERE TicketID = %s """, ticket_id,)
                ticket = cursor.fetchone()
                cursor.close()
                connection.close()
    return jsonify(ticket)
    
<<<<<<< HEAD
@app.route('support/dashboard', methods =['GET', 'POST'])
=======
@app.route('/support/dashboard', methods =['GET', 'POST'])
>>>>>>> frontend
def View_IT_Dashboard():
    connect_to_db()
    cursor = connection.cursor(dictionary=True)
    query = """SELECT * FROM Tickets WHERE Status = 'OPEN' """
    if request.method == 'GET':
        cursor.execute(query)
        tickets = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(tickets)
    return f"Loading all Open Tickets"

def search_ticket():
    connect_to_db()
    cursor = connection.cursor(dictionary=True)
    query = """SELECT * FROM Tickets WHERE TicketID LIKE CONCAT('%', %s,'%') 
    or title LIKE CONCAT('%', %s,'%') 
    or email LIKE CONCAT('%', %s,'%') 
    or descript LIKE CONCAT('%', %s,'%')"""
    
    if request.method == 'POST':
        search = request.args.get('search')
        cursor.execute(query, (search, search, search, search,))
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(data)


if __name__ == '__main__':
<<<<<<< HEAD
    app.run(debug=True, host="localhost", port=5000)
=======
    app.run(debug=True, host="127.0.0.1", port=5000)
>>>>>>> frontend
