import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { API_BASE_URL } from "../config";

const DEFAULT_CONTACT = {
    email: "miragoswami686@gmail.com",
    phone: "+91 9455941410"
};

function Contact() {
    const [contact, setContact] = useState(DEFAULT_CONTACT);

    useEffect(() => {
        fetch(`${API_BASE_URL}/contact`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch contact");
                }

                return response.json();
            })
            .then((data) => {
                if (data && data.email) {
                    setContact(data);
                }
            })
            .catch((error) => {
                console.warn("Using default contact data. Error:", error.message);
            });
    }, []);

    return (
        <section className="contact-section">

            <div className="contact-heading">
                <h1>Contact</h1>

                <p>
                    Ready to get started on your project?
                    <br />
                    Contact me now for a Free consultation.
                </p>
            </div>

            <div className="contact-container">

                <a
                    href={`mailto:${contact.email}`}
                    className="contact-card"
                >
                    <FaEnvelope className="contact-icon" />
                    <span>{contact.email}</span>
                </a>

                <a
                    href={`tel:${contact.phone}`}
                    className="contact-card"
                >
                    <FaPhone className="contact-icon" />
                    <span>{contact.phone}</span>
                </a>

            </div>

        </section>
    );
}

export default Contact;