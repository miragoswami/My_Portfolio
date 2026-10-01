import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import API_URL from "../services/api";

const DEFAULT_CONTACT = {
  email: "miragoswami686@gmail.com",
  phone: "+91 9455941410",
};

function Contact() {
  const [contact, setContact] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    fetch(`${API_URL}/api/contact`)
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

    {/* Email */}
    <a
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-card"
    >
        <FaEnvelope className="contact-icon" />
        <span>{contact.email}</span>
    </a>

    {/* Phone */}
    <a
        href={`tel:${contact.phone.replace(/\s/g, "")}`}
        className="contact-card"
    >
        <FaPhone className="contact-icon" />
        <span>{contact.phone}</span>
    </a>

</div>
      </div>
    </section>
  );
}

export default Contact;
