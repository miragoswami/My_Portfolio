const education = {
    course : "BE in Computer Engineering",
    university : "Gujarat Technological University",
    year : "2023 - 2027"
 };
const getEducation = (req, res) => { 
    res.json(education);
};

module.exports = { getEducation };
