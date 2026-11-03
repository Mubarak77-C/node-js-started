const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

// Map routes to controller actions
router.get("/", submissionController.getHome);
router.post("/submit", submissionController.createSubmission);
router.get("/submissions", submissionController.getSubmissions);

module.exports = router;
