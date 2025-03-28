import os
from dotenv import load_dotenv
import mysql.connector

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

def get_all_classes():
    connect_to_database()

    if cnx and cnx.is_connected():
        with cnx.cursor() as cursor:
            cursor.execute("SELECT cid, cname FROM classes")

            result = cursor.fetchall()
    else:
        result = []
    
    cnx.close()
    return result

def get_attendance_info(classid):
    connect_to_database()

    if cnx and cnx.is_connected():
        with cnx.cursor() as cursor:
            cursor.execute("SELECT S.sid, S.fname, S.lname, A.present FROM student_ids S, attendance A WHERE S.sid = A.sid AND A.cid = %s", (classid,))

            result = cursor.fetchall()
    else:
        result = []
    
    cnx.close()
    return result

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

def scan_in_student(cardid, classid):
    connect_to_database()

    result = "Student not found"

    if cnx and cnx.is_connected():
        with cnx.cursor() as cursor:
            cursor.execute("SELECT sid FROM student_ids WHERE card_num = %s", (cardid,))
            student = cursor.fetchone()

            if student:
                sid = student[0]
                
                cursor.execute("UPDATE attendance SET present = 1 WHERE sid = %s AND cid = %s", (sid, classid))
                
                if cursor.rowcount == 0:
                    cursor.execute("SELECT fname, lname FROM student_ids WHERE sid = %s", (sid,))
                    studentrow = cursor.fetchone()

                    cursor.execute("SELECT cname FROM classes WHERE cid = %s", (classid,))
                    classrow = cursor.fetchone()

                    fname, lname, = studentrow
                    cname = classrow[0]
                    result = f"Error: {fname} {lname} is not enrolled in {cname}"
                else:
                    cursor.execute("SELECT fname, lname FROM student_ids WHERE sid = %s", (sid,))
                    studentrow = cursor.fetchone()
                    cursor.execute("SELECT cname FROM classes WHERE cid = %s", (classid,))
                    classrow = cursor.fetchone()

                    if studentrow and classrow:
                        fname, lname = studentrow
                        cname = classrow[0]
                        result = f"{fname} {lname} has been marked present in {cname}"

    cnx.commit()
    cnx.close()
    return result