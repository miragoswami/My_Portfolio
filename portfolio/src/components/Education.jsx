import React , { useState , useEffect }from "react";
import { API_BASE_URL } from "../config";

const DEFAULT_EDUCATION = {
  course: "BE in Computer Engineering",
  university: "Gujarat Technological University",
  year: "2023 - 2027"
};

function Education() {
  const [education, setEducation] = useState(DEFAULT_EDUCATION);

  useEffect(() => {
    fetch(`${API_BASE_URL}/education`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch education");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.course) {
          setEducation(data);
        }
      })
      .catch((error) => {
        console.warn("Using default education data. Error:", error.message);
      });
  }, []);

  return (
    <section className="education-section">
      <div className="education-heading">
        <p className="education-small-title">MY QUALIFICATION</p>

        <h1>Education</h1>
      </div>

      <div className="education-container">
        <div className="education-card">
          <h2>{education.course}</h2>

          <h4 className="education-university">{education.university}</h4>

          <p className="education-year">{education.year}</p>
        </div>
      </div>
    </section>
  );
}

export default Education;
