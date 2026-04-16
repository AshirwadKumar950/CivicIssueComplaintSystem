// This file is the main entry point to start the server.
// It requires the Express app from app.js, validates the DB connection if needed, and starts listening on the specified PORT.
require("dotenv").config();
const app = require("./app");
const supabase = require("./src/config/supabaseClient");

console.log("SERVER FILE LOADED");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Test connection on startup (optional but good for tracking DB issues)
  const { error } = await supabase.from("reports").select("*").limit(1);
  if (error) {
    console.error("❌ Supabase connection test failed:", error.message);
  } else {
    console.log("✅ Supabase is connected successfully on Server startup");
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
