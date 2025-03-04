CREATE TABLE IF NOT EXISTS students (
  cwid INT(8) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

INSERT INTO students (name, cwid) VALUES
('John Goblikon', '50011122'),
('Han Solo', '50022233'),
('Captain Underpants', '50034567'),
('Charlie XCX', '50099999'),
('Leonardo DaVinci', '50100001');

CREATE TABLE IF NOT EXISTS sections (
  sectionID INT(8) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  courseName VARCHAR(255) NOT NULL,
  section INT(8) NOT NULL,
  professor VARCHAR(255) NOT NULL
);

INSERT INTO sections (courseName, section, professor) VALUES
('Robotics', '1', 'Dr.Robotnic'),
('Robotics', '2', 'Dr.Robotnic'),
('Programming', '1', 'Ms.Mia'),
('Programming', '2', 'Ms.Mia'),
('Programming', '3', 'Ms.Mia');

CREATE TABLE IF NOT EXISTS enrolled (
  sectionID INT(8) NOT NULL,
  cwid INT(8) NOT NULL,
  FOREIGN KEY (sectionID) REFERENCES sections(sectionID),
  FOREIGN KEY (cwid) REFERENCES students(cwid),
  eid INT PRIMARY KEY NOT NULL AUTO_INCREMENT
);

INSERT INTO enrolled (sectionID, cwid) VALUES
('1','50011122'),
('3','50011122'),
('2','50022233'),
('4','50022233'),
('5','50099999'),
('1','50100001'),
('5','50100001');
