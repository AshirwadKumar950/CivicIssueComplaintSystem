// This file handles the business logic for the Report endpoints.
// It receives the request, calls the appropriate model function, and sends the response.
// It is used by the Report routes.
const ReportModel = require("../models/reportModel");

const createReport = async (req, res) => {
  const { title, description, location, latitude, longitude, image_url } = req.body;
  let category = "Uncategorized";

  // Call the ML Service to auto-categorize the issue
  if (process.env.ML_SERVICE_URL && description) {
    try {
      const mlRes = await fetch(process.env.ML_SERVICE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: description }),
      });
      if (mlRes.ok) {
        const mlData = await mlRes.json();
        category = mlData.category || category;
      } else {
        console.error("ML service returned status:", mlRes.status);
      }
    } catch (err) {
      console.error("ML service fetch error:", err.message);
    }
  }

  const { data, error } = await ReportModel.createReport({ title, description, location, latitude, longitude, image_url, category });

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: "Report created", report: data[0] });
};

const getReports = async (req, res) => {
  const { data, error } = await ReportModel.getReports();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
};

const updateReportStatus = async (req, res) => {
  try {
    const id = req.params.id; // keep as string
    const { status } = req.body;

    console.log("PUT request received for ID:", id, "with status:", status);

    const { data, error } = await ReportModel.updateReportStatus(id, status);

    console.log("Supabase response:", { data, error });
    if (error) throw error;
    if (!data || data.length === 0) {
      console.log(" No report found with ID:", id);
      return res.status(404).json({ error: "Report not found" });
    }

    console.log("Report updated:", data[0]);
    res.status(200).json({ message: "Report updated", report: data[0] });
  } catch (err) {
    console.error("Error updating report:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const id = req.params.id;

    console.log("DELETE request received for ID:", id);

    const { data, error } = await ReportModel.deleteReport(id);

    if (error) throw error;
    if (!data || data.length === 0) {
      console.log("No report found with ID:", id);
      return res.status(404).json({ error: "Report not found" });
    }

    console.log("Report deleted:", data[0]);
    res.status(200).json({ message: "Report deleted", report: data[0] });
  } catch (err) {
    console.error("Error deleting report:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const testDb = async (req, res) => {
  const { data, error } = await ReportModel.testDbConnection();
  res.json({ data, error });
};

module.exports = {
  createReport,
  getReports,
  updateReportStatus,
  deleteReport,
  testDb
};
