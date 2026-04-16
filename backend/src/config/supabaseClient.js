// This file initializes the Supabase client connection.
// It is used across the application, mainly by the models layer to interact with the database.
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
// console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
