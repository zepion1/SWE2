import React from "react";

const Home = () => {
    return (
        <div className="home">
            <div className="home-header">
                <h1 className="home-title">MSU Companion</h1>
            </div>
            
            <div className="quicklinks">
                <h2 className="quicklink-text">QuickLinks</h2>
                <div className="link-grid">
                    <div className="link"><span>Attendance</span></div>
                    <div className="link"><span>Classroom Reservations</span></div>
                    <div className="link"><span>Classes Schedule</span></div>
                    <div className="link"><span>Gmail</span></div>
                    <div className="link"><span>Canvas</span></div>
                    <div className="link"><span>Navigate</span></div>
                    <div className="link"><span>Financial Wellness</span></div>
                    <div className="link"><span>University Libraries</span></div>
                </div>
            </div>
        </div>
    )
}

export default Home;
