import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Attendance() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get-classes/')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    cid: item[0],
                    cname: item[1]
                }));

                setClasses(formattedData);
            })
            .catch(error => console.error('Error fetching list of classes:', error));
    }, []);

    return (
        <div className="attendance-page">
            <h1>Attendance</h1>
            <ul className="attendance-list">
                {classes.map((classItem) => (
                    <li key={classItem.cid}>
                        <Link to={`/attendance/${classItem.cid}`} className="attendance-link">
                            {classItem.cname}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Attendance;