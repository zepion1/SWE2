import React, { useEffect, useState } from "react";

const RoomChangeRequest = () => {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        document.title = "Room Change Request | MSU Companion";
    }, []);

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
                        <p>Your request status will be shown here.</p>
                    </div>
                )}

                {activeTab === 2 && (
                    <div className="room-change-history">
                        <h2>Request History</h2>
                        <p>List of previous room change requests.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomChangeRequest;
