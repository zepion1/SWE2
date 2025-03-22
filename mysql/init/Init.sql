CREATE TABLE IF NOT EXISTS students (
  cwid INT(8) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  courseID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  courseName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS professors (
  professorID INT(8) PRIMARY KEY NOT NULL,
  professorName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS classrooms (
  classroomID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  building varchar(10) NOT NULL,
  room INT(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS sections (
  sectionID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  section INT(8) NOT NULL,
  #Foreign Elements
  courseID INT NOT NULL,
  professorID INT NOT NULL,
  classroomID INT NOT NULL,
  FOREIGN KEY (courseID) REFERENCES courses(courseID),
  FOREIGN KEY (professorID) REFERENCES professors(professorID),
  FOREIGN KEY (classroomID) REFERENCES classrooms(classroomID)
);

CREATE TABLE IF NOT EXISTS enrolled (
  eid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  #Foreign Elements
  sectionID INT NOT NULL,
  cwid INT(8) NOT NULL,
  FOREIGN KEY (sectionID) REFERENCES sections(sectionID),
  FOREIGN KEY (cwid) REFERENCES students(cwid)
);

