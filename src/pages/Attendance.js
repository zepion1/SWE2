import React from "react";
import { Link } from "react-router-dom";

const Attendance = () => {
    // Example data for classes (replace with actual data)
    const classes = [
        { name: "Class 1", id: 1 },
        { name: "Class 2", id: 2 },
        { name: "Class 3", id: 3 },
    ];

    return (
        <div className="attendance-page">
            <h1>Attendance</h1>
            <ul className="attendance-list">
                {classes.map((classItem) => (
                    <li key={classItem.id}>
                        <Link to={`/attendance/${classItem.name}`} className="attendance-link">
                            {classItem.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Attendance;