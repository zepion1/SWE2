-- Active: 1740517144183@@127.0.0.1@3306@project_database
CREATE TABLE IF NOT EXISTS student_ids (
    sid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    card_num VARCHAR(9) NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    cid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cname VARCHAR(255) NOT NULL,
    ccode VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance (
    sid INT NOT NULL,
    cid INT NOT NULL,
    present INT,
    FOREIGN KEY (sid) REFERENCES student_ids(sid),
    FOREIGN KEY (cid) REFERENCES classes(cid)
)

CREATE TABLE IF NOT EXISTS professors (
    pid INT PRIMARY KEY NOT NULL,
    pname VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS classrooms (
    roomid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    building varchar(10) NOT NULL,
    room INT(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS sections (
  sectionID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  section INT(8) NOT NULL,
  #Foreign Elements
  cid INT NOT NULL,
  pid INT NOT NULL,
  roomid INT NOT NULL,
  FOREIGN KEY (cid) REFERENCES classes(cid),
  FOREIGN KEY (pid) REFERENCES professors(pid),
  FOREIGN KEY (roomid) REFERENCES classrooms(roomid)
);

CREATE TABLE IF NOT EXISTS enrolled (
  eid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  #Foreign Elements
  sectionID INT NOT NULL,
  cwid INT(8) NOT NULL,
  FOREIGN KEY (sectionID) REFERENCES sections(sectionID),
  FOREIGN KEY (cwid) REFERENCES students(cwid)
);

CREATE TABLE IF NOT EXISTS tickets (
    TicketID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    email VARCHAR(40) NOT NULL,
    hall VARCHAR(30) NOT NULL,
    roomid INT NOT NULL,
    descript VARCHAR(400),
    FOREIGN KEY (roomid) REFERENCES classrooms (roomid)
);