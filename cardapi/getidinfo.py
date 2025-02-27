import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import errorcode

load_dotenv()

config = {
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}

def connect_to_database():
    global cnx
    cnx = mysql.connector.connect(**config)

def get_user_from_card(cardid):
    connect_to_database()

    result = "User not found"

    if cnx and cnx.is_connected():
        with cnx.cursor() as cursor:
            cursor.execute("SELECT fname, lname FROM student_ids WHERE card_num = %s", (cardid,))
            row = cursor.fetchone()

            if row:
                fname, lname = row
                result = f"{fname} {lname}"

    #cursor.close() <= Commented out because the with cnx.cursor() as cursor block automatically closes the cursor when it's done
    cnx.close()
    return result