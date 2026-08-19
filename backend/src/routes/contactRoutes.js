const express = require("express");

const { getContact } = require("../controllers/contactController");

const router = express.Router();

router.get("/", getContact);

module.exports = router;


// A route tells Express which URL should do what.