import React, { useEffect, useState } from "react";

// Sample room assignments data
const roomAssignments = [
    { class: "BIOL112_13SP25 Introduction to Biology", room: "CELS 120 (EX#1)" },
    { class: "CSIT379_01SP25 Computer Science Theory", room: "UNIV 1020 (EX#2)" },
    { class: "CSIT415_01SP25 Software Engineering II", room: "CCIS 224 (EX#3)" },
    { class: "CSIT340_02 Computer Networks", room: "CCIS 221 (EX#4)" },
    { class: "CSIT231_02 Systems Programming", room: "RICH 114 (EX#5)" },
    { class: "CSIT460_01 Computer Security", room: "CCIS 249 (EX#6)" },
    { class: "CSIT345_02 Operating Systems", room: "CCIS 152 (EX#7)" },
];

const AssignedRooms = () => {
    useEffect(() => {
            document.title = "Assigned Room | MSU Companion";
        }, []);
    return (
        <div className="assigned-rooms">
            <h1 className="assigned-rooms-title">Assigned Rooms</h1>
            <ul className="room-list">
                {roomAssignments.map((assignment, index) => (
                    <li key={index} className="room-assignment">
                        {assignment.class} - {assignment.room}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignedRooms;