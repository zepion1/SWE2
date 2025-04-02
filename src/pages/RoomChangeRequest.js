import React, { useEffect, useState } from "react";
import AcceptedIcon from "../images/acceptedStatus.svg";
import PendingIcon from "../images/pendingStatus.svg";
import DeniedIcon from "../images/deniedStatus.svg";

const RoomChangeRequest = () => {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        document.title = "Room Change Request | MSU Companion";
    }, []);

    const statusData = [
        { id: 1, status: "Accepted", date: "03/25/2025", details: "Room change approved for CELS 120." },
        { id: 2, status: "Pending", date: "03/20/2025", details: "Awaiting approval for UNIV 1020." },
        { id: 3, status: "Denied", date: "03/15/2025", details: "Request denied for CCIS 224." },
    ];

    const historyData = [
        { id: 1, date: "03/10/2025", action: "Submitted request for CELS 120." },
        { id: 2, date: "03/12/2025", action: "Request reviewed by admin." },
        { id: 3, date: "03/15/2025", action: "Request denied for CCIS 224." },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case "Accepted":
                return <img src={AcceptedIcon} alt="Accepted" className="status-icon" />;
            case "Pending":
                return <img src={PendingIcon} alt="Pending" className="status-icon" />;
            case "Denied":
                return <img src={DeniedIcon} alt="Denied" className="status-icon" />;
            default:
                return null;
        }
    };

    return (
        <div className="room-change-request">
            <div className="room-change-request-header">
                <h1 className="room-change-request-title">Room Change Request</h1>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs">
                <button className={activeTab === 0 ? "tab active" : "tab"} onClick={() => setActiveTab(0)}>Request Form</button>
                <button className={activeTab === 1 ? "tab active" : "tab"} onClick={() => setActiveTab(1)}>Status</button>
                <button className={activeTab === 2 ? "tab active" : "tab"} onClick={() => setActiveTab(2)}>History</button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 0 && (
                    <div className="room-change-request-form">
                        <h2 className="room-change-request-form-title">Request Form</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="teacher-id">Teacher ID</label>
                                <input type="text" id="teacher-id" name="teacher-id" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="current-room">Current Room</label>
                                <input type="text" id="current-room" name="current-room" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-room">New Room</label>
                                <input type="text" id="new-room" name="new-room" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                <textarea id="reason" name="reason" required></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="room-change-status">
                        <h2>Check Room Change Status</h2>
                        <ul className="status-list">
                            {statusData.map((item) => (
                                <li key={item.id} className="status-item">
                                    {getStatusIcon(item.status)}
                                    <div>
                                        <p className="status-date">{item.date}</p>
                                        <p className="status-details">{item.details}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="room-change-history">
                        <h2>Request History</h2>
                        <ul className="history-list">
                            {historyData.map((item) => (
                                <li key={item.id} className="history-item">
                                    <p className="history-date">{item.date}</p>
                                    <p className="history-action">{item.action}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomChangeRequest;