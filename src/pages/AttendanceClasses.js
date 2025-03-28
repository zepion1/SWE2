import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const AttendanceClasses = () => {
    const { className } = useParams();
    console.log("Navigated to attendance page for:", className);

    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/get-attendance-info/${className}`)
        .then(response => response.json())
        .then(data => {
            const formattedAttenData = data.map(item => ({
                sid: item[0],
                fname: item[1],
                lname: item[2],
                status: item[3]
            }));

            setAttendanceData(prevData => ({
                ...prevData,
                [className]: formattedAttenData
            }));
        })
        .catch(error => console.error('Error fetching attendance data:', error));
    }, [className]);

    return (
        <div className="attendance-page">
            <h1>Attendance for {className}</h1>{/*  Need to change this so it shows the class name instead of the id */}
            <ul className="attendance-list">
                {attendanceData[className] ? (
                    attendanceData[className].map((student) => (
                        <li key={student.sid}>
                            <span>{student.fname} {student.lname}</span>
                            <span className={student.status ? 'status present' : 'status absent'}>{student.status ? 'Present' : 'Absent'}</span>
                        </li>
                    ))
                ) : (
                    <p>No attendance data available for this class.</p>
                )}
            </ul>
        </div>
    );
};

export default AttendanceClasses;