// This file defines the Express routes for reports.
// It binds specific endpoints to their respective controller functions.
// It is imported and used in app.js.
const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Creates a new report
router.post("/report", reportController.createReport);

// Fetches all reports
router.get("/reports", reportController.getReports);

// Updates a report's status
router.put("/report/:id", reportController.updateReportStatus);

// Deletes a report
router.delete("/report/:id", reportController.deleteReport);

// Tests the database connection
router.get("/test-db", reportController.testDb);

module.exports = router;
