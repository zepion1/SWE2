import React, { useEffect, useState  } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AcceptedIcon from "../images/acceptedStatus.svg";
import PendingIcon from "../images/pendingStatus.svg";
import DeniedIcon from "../images/deniedStatus.svg";
import NoneRequestsIcon from "../images/norequestStatus.svg";


// Sample data for class-room assignments
const classRoomAssignments = [
    { class: "Class 1", room: "Room 101" },
    { class: "Class 2", room: "Room 102" },
    { class: "Class 3", room: "Room 103" },
    { class: "Class 4", room: "Room 104" },
    { class: "Class 5", room: "Room 105" },
    { class: "Class 6", room: "Room 106" },
    { class: "Class 7", room: "Room 107" },
];

// Sample data for room change requests
const roomChangeRequests = [
    { id: 1, status: "Accepted"},
    { id: 2, status: "Denied"},
    { id: 3, status: "Pending"},
]

const Home = () => {

    useEffect(() => {
        document.title = "Home | MSU Companion";
    }, []);


    const getStatusIcon = (status) => {
        switch (status) {
            case "Accepted":
                return <img src={AcceptedIcon} alt="Accepted" style={{width: 180, height: 180}}/>;
            case "Denied":
                return <img src={DeniedIcon}  alt="Denied"  style={{width: 180, height: 180}}/>;
            case "Pending":
                return <img src={PendingIcon} alt="Pending" style={{width: 180, height: 180}}/>;
            default:
                return <img src={NoneRequestsIcon} alt="No Requests" style={{width: 180, height: 180}}/>;
        }
    };

    const [currentRequestIndex, setCurrentRequestIndex] = useState(0);

    const handleNextRequest = () => {
        setCurrentRequestIndex((currentRequestIndex + 1) % roomChangeRequests.length);
    };

    return (
        <div className="home">
            <div className="home-header">
                <h1 className="home-title">MSU Companion</h1>
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
                    <h2 className="status-room-change-request-text">Room Change Request (still work in progress)</h2>
                    <div className="room-change-status">
                        {getStatusIcon(roomChangeRequests[currentRequestIndex].status)}
                        <h3>{roomChangeRequests[currentRequestIndex].status}</h3>
                    </div>
                    <button onClick={handleNextRequest}>Next Request(DEMO)</button>
                </div>

                <div className="calendar-box">
                    <h2 className="calendar-text">Calendar(WORK IN PROGRESS)</h2>
                    <Calendar className="react-calendar"/>
                    </div>
            </div>
            
        </div>
    );
}

export default Home;
