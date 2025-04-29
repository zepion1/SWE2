import React from "react";
import { useParams } from "react-router-dom";

const RequestDetails = () => {
    const { id } = useParams();
    //Mock data
    const statusData = [
        { id: 1, status: "Accepted", date: "03/25/2025", details: "Room change approved for CELS 120." },
        { id: 2, status: "Pending", date: "03/20/2025", details: "Awaiting approval for UNIV 1020." },
        { id: 3, status: "Denied", date: "03/15/2025", details: "Request denied for CCIS 224." },
    ];

    const request = statusData.find((item) => item.id === parseInt(id));

    if (!request) {
        return <p>Request not found.</p>;
    }

    return (
        <div className="room-change-details">
            <h1>Room Change Request Details</h1>
            <p>ID: {request.id}</p>
            <p>Status: {request.status}</p>
            <p>Date: {request.date}</p>
            <p>Details: {request.details}</p>
        </div> 
    );
};

export default RequestDetails;