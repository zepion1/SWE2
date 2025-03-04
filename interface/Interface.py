#mysql connector is a requirement
#it can be installed with "pip install mysql-connector-python"
import mysql.connector
   
def validate_enrollment(connection, cwid, sectionID):
    cursor = connection.cursor()
    
    Query = """
    SELECT *
    FROM enrolled e
    WHERE e.cwid = {cwid_} AND e.sectionID = {sectionID_};
    """.format(cwid_ = cwid, sectionID_ = sectionID)
    
    cursor.execute(Query)
    result = cursor.fetchall()
    cursor.close()
    if(len(result) != 0):
        return True
    
    return False
    
if __name__ == "__main__":
    connection = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="rootpass",
        database="project_database",
    )
    #change values to test various enrollements
    print(validate_enrollment(connection, 50011122, 2))
    