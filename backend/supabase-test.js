require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

console.log("Testing Supabase connection...");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .limit(1);

    if (error) {
      console.log("Supabase responded with error:");
      console.log(error);
    } else {
      console.log("Connection successful ✅");
      console.log("Data:", data);
    }
  } catch (err) {
    console.log("Connection failed ❌");
    console.log(err);
  }
}

testConnection();