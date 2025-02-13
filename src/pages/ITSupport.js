import React, { useEffect } from "react";

const ITSupport = () => {

    useEffect(() => {
        document.title = "IT Support | MSU Companion";
    }, []);

    return (
        <div className="it-support">
            <h1 className="it-support-title">IT Support</h1>
            <p className="it-support-subtitle">This page is under construction.</p>
        </div>
    );
}

export default ITSupport;