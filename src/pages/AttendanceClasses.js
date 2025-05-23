import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as SyncIcon } from "../images/sync-svg.svg";
// import WebHid from "../components/WebHid.js";

const AttendanceClasses = () => {
    const { className } = useParams();
    console.log("Navigated to attendance page for:", className);

    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [syncTrigger, setSyncTrigger] = useState(0);

    useEffect(() => {
        setLoading(true);
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
            setLoading(false);
        })

        .catch(error => console.error('Error fetching attendance data:', error));
    }, [className, syncTrigger]);

    const syncAttData = () => {
        setSyncTrigger(prev => prev + 1);
    }

    const handleReset = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://127.0.0.1:5000/reset-class-attendance/${className}`, {
                    method: 'POST'
                });
                if(!response.ok) {
                    throw new Error(`HTTP ERROR: ${response.status}`);
                }

                syncAttData();
         } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

    return (
        <div className="attendance-page">
            <h1>Attendance for {className}</h1>{/*  Need to change this so it shows the class name instead of the id */}
            <button className="sync-button" onClick={syncAttData} disabled={loading}><SyncIcon /> Sync data</button>
            <br/>
            <button className="reset-button" onClick={handleReset} disabled={loading}>Reset attendance (mark all as absent)</button>
            <p class="error-message">{error}</p>
            {/* <WebHid classId={className}/> */}
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