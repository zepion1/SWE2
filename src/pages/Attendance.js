import React from "react";
import { useParams } from "react-router-dom";


const Attendance = () => {
    const { className } = useParams();
    console.log("Navigated to attendance page for:", className);

    // Example for demo purposes (will replace with actual data)
    const attendanceData = {
        "Class 1": [{ name: "Student 1", status: "Present" }, { name: "Student 2", status: "Absent" }, { name: "Student 3", status: "Present" }],
        "Class 2": [{ name: "Student 1", status: "Absent" }, { name: "Student 2", status: "Present" }, { name: "Student 3", status: "Present" }],
    };

    return (
        <div className="attendance-page">
            <h1>Attendance for {className}</h1>
            <ul className="attendance-list">
                {attendanceData[className] ? (
                    attendanceData[className].map((student, index) => (
                        <li key={index}>
                            <span>{student.name}</span>
                            <span className={`status ${student.status.toLowerCase()}`}>{student.status}</span>
                        </li>
                    ))
                ) : (
                    <p>No attendance data available for this class.</p>
                )}
            </ul>
        </div>
    );
};

export default Attendance;