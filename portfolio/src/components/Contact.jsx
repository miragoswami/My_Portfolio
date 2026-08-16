import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function Contact(props) {
  return (
    <section className="contact-section">

      {/* CONTACT HEADING */}
      <div className="contact-heading">

        <h1>Contact</h1>

        <p>
          Ready to get started on your project?
          <br />
          Contact me now for a Free consultation.
        </p>

      </div>


      {/* CONTACT CARDS */}
      <div className="contact-container">

        {/* EMAIL */}
        <a
          href="mailto:miragoswami686@gmail.com"
          className="contact-card"
        >

          <FaEnvelope className="contact-icon" />

          <span>
            miragoswami686@gmail.com
          </span>

        </a>


        {/* PHONE */}
        <a
          href="tel:+919455941410"
          className="contact-card"
        >

          <FaPhone className="contact-icon" />

          <span>
            +91 9455941410
          </span>

        </a>

      </div>

    </section>
  );
}

export default Contact;