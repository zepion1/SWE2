import React, { useEffect, useState } from "react";
import AttendanceIcon from "../images/attendance.png";
import AssignedRoomsIcon from "../images/assignedroom.png";
import RoomChangeIcon from "../images/roomchange.png";
import CalendarIcon from "../images/calendar.png";
import { Link } from "react-router-dom";



const Home = () => {
    useEffect(() => {
        document.title = "Home | MSU Companion";
    }, []);

    

    return (
        <div className="home">
            <div className="home-header">
                <h1 className="home-title">MSU Companion</h1>
                <p className="home-subtitle">Welcome User to your personalized MSU Companion! Please click on one the boxes below to start navigating!</p>
            </div>

            <div className="quicklinks-grid">
                <Link to="/attendance" className="quicklink-box">
                    <img src={AttendanceIcon} alt="Attendance" className="quicklink-icon" />
                    <h2>Attendance</h2>
                </Link>
                <Link to="/assigned-rooms" className="quicklink-box">
                    <img src={AssignedRoomsIcon} alt="Assigned Rooms" className="quicklink-icon" />
                    <h2>Assigned Rooms</h2>
                </Link>
                <Link to="/room-changes" className="quicklink-box">
                    <img src={RoomChangeIcon} alt="Room Change Request" className="quicklink-icon" />
                    <h2>Room Change Request</h2>
                </Link>
                <Link to="/calendar" className="quicklink-box">
                    <img src={CalendarIcon} alt="Calendar" className="quicklink-icon" />
                    <h2>Calendar</h2>
                </Link>
            </div>
        </div>
    );
};

export default Home;