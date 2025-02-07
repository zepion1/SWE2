import React, { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Sample data for class-room assignments
const classRoomAssignments = [
    { class: "Class 1", room: "Room 101" },
    { class: "Class 2", room: "Room 102" },
    { class: "Class 3", room: "Room 103" },
    { class: "Class 4", room: "Room 104" },
    { class: "Class 5", room: "Room 105" },
    { class: "Class 6", room: "Room 106" },
    { class: "Class 7", room: "Room 107" },
    { class: "Class 8", room: "Room 108" },
];

const Home = () => {

    useEffect(() => {
        document.title = "Home | MSU Companion";
    }, []);

    return (
        <div className="home">
            <div className="home-header">
                <h1 className="home-title">MSU Companion</h1>
            </div>
            
            <div className="quicklinks">
                <h2 className="quicklink-text">QuickLinks</h2>
                <div className="link-grid">
                    <div className="link"><span>Classes Schedule</span></div>
                    <div className="link"><span>Gmail</span></div>
                    <div className="link"><span>Canvas</span></div>
                </div>
            </div>

            <div className="content-grid">
                <div className="attendance-box">
                    <h2 className="attendance-text">Attendance</h2>
                    <div className="attendance-grid">
                        <div className="attendance"><span>Class 1</span></div>
                        <div className="attendance"><span>Class 2</span></div>
                        <div className="attendance"><span>Class 3</span></div>
                        <div className="attendance"><span>Class 4</span></div>
                        <div className="attendance"><span>Class 5</span></div>
                        <div className="attendance"><span>Class 6</span></div>
                        <div className="attendance"><span>Class 7</span></div>
                        <div className="attendance"><span>Class 8</span></div>
                    </div>
                </div>

                <div className="assigned-rooms-box">
                    <h2 className="assigned-rooms-text">Assigned Rooms</h2>
                    <div className="room-list">  
                        {classRoomAssignments.map((assignment, index) => (
                                <div key={index} className="room-assignment">
                                    <span>{assignment.class} - {assignment.room}</span>
                                </div>
                            ))}   
                    </div>
                </div>

                <div className="status-room-change-request-box">
                    <h2 className="status-room-change-request-text">Room Change Request</h2>
                    <div className="status-room-change-request">
                        <span>Request Status: Pending (WORK IN PROGRESS)</span>
                    </div>
                </div>

                <div className="calendar-box">
                    <h2 className="calendar-text">Calendar(WORK IN PROGRESS)</h2>
                    <Calendar />
                    </div>
            </div>
            
        </div>
    );
}

export default Home;
