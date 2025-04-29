import React, { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
    useEffect(() => {
        document.title = "Calendar | MSU Companion";
    }, []);

    return (
        <div className="calendar-page">
            <h1 className="calendar-title">Calendar</h1>
            <p className="calendar-subtitle">Plan your schedule with ease!</p>
            <Calendar className="react-calendar" locale="en-US" />
        </div>
    );
};

export default CalendarPage;