import React, { useEffect } from "react";

const ITSupport = () => {
    useEffect(() => {
        document.title = "IT Support | MSU Companion";
    }, []);

    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "To reset your password, visit the password reset page and follow the instructions provided.",
        },
        {
            question: "How do I connect to the campus Wi-Fi?",
            answer: "You can connect to the campus Wi-Fi by selecting the 'MSU-Secure' network and logging in with your student credentials.",
        },
        {
            question: "Who do I contact for technical issues?",
            answer: "For technical issues, you can contact the IT Help Desk at itservicedesk@montclair.edu or call (973) 655-7971.",
        },
    ];

    const resources = [
        { name: "Password Reset", link: "https://iams-amc.montclair.edu/page-password-reset-initial" },
        { name: "Guide to Password Reset", link: "https://www.montclair.edu/information-technology/activatemanage-netid-password-faculty/" },
        { name: "IT Help Desk", link: "https://www.montclair.edu/information-technology/it-service-desk/" },
    ];

    return (
        <div className="it-support">
            <h1 className="it-support-title">IT Support</h1>
            <p className="it-support-subtitle">Need help? We're here to assist you with your technical issues.</p>

            {/* Contact Form */}
            <div className="it-support-form">
                <h2>Contact IT Support</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="issue">Issue</label>
                        <textarea id="issue" name="issue" placeholder="Describe your issue" required></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {/* FAQs */}
            <div className="it-support-faqs">
                <h2>Frequently Asked Questions</h2>
                <ul>
                    {faqs.map((faq, index) => (
                        <li key={index}>
                            <h3>{faq.question}</h3>
                            <p>{faq.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Resources */}
            <div className="it-support-resources">
                <h2>Helpful Resources</h2>
                <ul>
                    {resources.map((resource, index) => (
                        <li key={index}>
                            <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                {resource.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ITSupport;