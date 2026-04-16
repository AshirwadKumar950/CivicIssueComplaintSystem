// // This file acts as the database model layer for Reports.
// // It wraps Supabase queries keeping DB logic separated from business logic.
// // It is used by the Report controllers.
const supabase = require("../config/supabaseClient");

// const createReport = async ({ title, description, location, image_url, category }) => {
//   return supabase
//     .from("reports")
//     .insert([
//       { title, description, location, image_url, status: "Pending", category },
//     ])
//     .select();
// };

// const getReports = async () => {
//   return supabase
//     .from("reports")
//     .select("*")
//     .order("created_at", { ascending: false });
// };

// const updateReportStatus = async (id, status) => {
//   return supabase
//     .from("reports")
//     .update({ status })
//     .eq("id", Number(id))
//     .select();
// };

// const deleteReport = async (id) => {
//   return supabase
//     .from("reports")
//     .delete()
//     .eq("id", id)
//     .select();
// };

// const testDbConnection = async () => {
//   return supabase.from("reports").select("*").limit(1);
// };

// module.exports = {
//   createReport,
//   getReports,
//   updateReportStatus,
//   deleteReport,
//   testDbConnection
// };




const createReport = async ({
  title,
  description,
  location,
  latitude,
  longitude,
  image_url,
  category
}) => {
  return supabase
    .from("reports")
    .insert([
      {
        title,
        description,
        location,
        latitude,
        longitude,
        image_url,
        status: "Pending",
        category
      },
    ])
    .select();
};

const getReports = async () => {
  return supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });
};

const updateReportStatus = async (id, status) => {
  return supabase
    .from("reports")
    .update({ status })
    .eq("id", Number(id))
    .select();
};

const deleteReport = async (id) => {
  return supabase
    .from("reports")
    .delete()
    .eq("id", id)
    .select();
};

const testDbConnection = async () => {
  return supabase.from("reports").select("*").limit(1);
};

module.exports = {
  createReport,
  getReports,
  updateReportStatus,
  deleteReport,
  testDbConnection
};