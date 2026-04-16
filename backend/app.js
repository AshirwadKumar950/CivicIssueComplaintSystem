// This file initializes the Express application.
// It configures global middleware (like CORS and JSON parsing), binds the routes, and provides a root endpoint.
// It does NOT start the server itself; that is handled by server.js.
const express = require("express");
const cors = require("cors");
const loggerMiddleware = require("./src/middlewares/loggerMiddleware");
const reportRoutes = require("./src/routes/reportRoutes");

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware); // Demonstrates custom middleware
app.use(express.urlencoded({ extended: true })); // if you want to send from x-www-form-encoded from postman else use json simply

// Home Route
app.get("/", (req, res) => {
  res.send("CoreSamadhan backend is running! (Modular structure)");
});

// Import API routes
app.use("/", reportRoutes); // using base path '/' to keep compatibility with old index.js

module.exports = app;
