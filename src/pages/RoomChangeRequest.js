import React, { useEffect } from "react";

const RoomChangeRequest = () => {

    useEffect(() => {
            document.title = "Room Change Request | MSU Companion";
        }, []);

    return (
        <div className="room-change-request">
            <h1 className="room-change-request-title">Room Change Request</h1>
            <p className="room-change-request-subtitle">This page is under construction.</p>
        </div>
    );
}

export default RoomChangeRequest;