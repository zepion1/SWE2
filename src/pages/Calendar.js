import React, { useEffect, useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
    useEffect(() => {
                document.title = "Calendar | MSU Companion";
            }, []);
    return (
        <div className="calendar-page">
            <h1 className="calendar-title">Calendar (WORK IN PROGRESS)</h1>
            <Calendar className="react-calendar" locale="en-US" />
        </div>
    );
};

export default CalendarPage;
