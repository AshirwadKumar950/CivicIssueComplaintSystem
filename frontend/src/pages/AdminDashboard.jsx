// import { useState, useEffect } from "react";
// import ReportsMap from "../components/ReportsMap";

// export default function AdminDashboard() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState("All");

//   // Fetch reports
//   const fetchReports = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`);
//       const data = await res.json();
//       if (res.ok) {
//         setReports(data);
//       } else {
//         setError(data.error || "Failed to fetch reports");
//       }
//     } catch (err) {
//       setError("Network Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   // Update report status
//   const updateReport = async (id, newStatus) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/report/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         fetchReports();
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (err) {
//       alert("Network Error: " + err.message);
//     }
//   };

//   // Delete report
//   const deleteReport = async (id) => {
//     if (!confirm("Are you sure you want to delete this report?")) return;
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/report/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         fetchReports();
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (err) {
//       alert("Network Error: " + err.message);
//     }
//   };

//   const filteredReports =
//     filter === "All" ? reports : reports.filter((r) => r.status === filter);
//   return (
//     <div className="min-h-screen bg-black text-white">
//       <nav className="w-full bg-gray-900 shadow-md p-4">
//         <h2 className="text-2xl font-bold tracking-wide">Admin Dashboard</h2>
//       </nav>

//       <div className="max-w-7xl mx-auto p-8">
//         <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
//           <div className="flex gap-3">
//             {["All", "Pending", "Resolved"].map((status) => (
//               <button
//                 key={status}
//                 onClick={() => setFilter(status)}
//                 className={`px-5 py-2 rounded-lg font-medium transition ${
//                   filter === status
//                     ? status === "Pending"
//                       ? "bg-red-500 text-white shadow"
//                       : status === "Resolved"
//                       ? "bg-green-500 text-white shadow"
//                       : "bg-blue-500 text-white shadow"
//                     : "bg-gray-700 text-gray-200 hover:bg-gray-600"
//                 }`}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={fetchReports}
//             className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
//           >
//             Refresh Reports
//           </button>
//         </div>
//         <div className="overflow-x-auto shadow-md rounded-lg bg-gray-900 border border-gray-700">
//           <table className="w-full text-sm text-left text-gray-200 border-collapse">
//             <thead className="bg-gray-800 text-gray-300 sticky top-0 z-10">
//               <tr>
//                 <th className="p-2 border border-gray-700 text-center">ID</th>
//                 <th className="p-2 border border-gray-700">Title</th>
//                 <th className="p-2 border border-gray-700 w-64">Description</th>
//                 <th className="p-2 border border-gray-700 w-48">Location</th>
//                 <th className="p-2 border border-gray-700 text-center">
//                   Category
//                 </th>
//                 <th className="p-2 border border-gray-700 text-center">
//                   Status
//                 </th>
//                 <th className="p-2 border border-gray-700 text-center">
//                   Actions
//                 </th>
//                 <th className="p-2 border border-gray-700 text-center">
//                   Image
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredReports.map((report, idx) => (
//                 <tr
//                   key={report.id}
//                   className={`transition-colors ${
//                     idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
//                   } hover:bg-gray-700`}
//                 >
//                   <td className="p-2 border border-gray-700 text-center">
//                     {report.id}
//                   </td>
//                   <td className="p-2 border border-gray-700 font-medium truncate max-w-[150px]">
//                     {report.title}
//                   </td>
//                   <td className="p-2 border border-gray-700 whitespace-pre-wrap">
//                     {report.description}
//                   </td>
//                   <td className="p-2 border border-gray-700 whitespace-pre-wrap">
//                     {report.location}
//                   </td>
//                   <td className="p-2 border border-gray-700 text-center">
//                     <span
//                       className={`px-2 py-1 rounded text-white text-xs font-semibold ${
//                         report.category === "pothole"
//                           ? "bg-red-500"
//                           : report.category === "garbage"
//                           ? "bg-green-600"
//                           : "bg-blue-500"
//                       }`}
//                     >
//                       {report.category || "N/A"}
//                     </span>
//                   </td>
//                   <td
//                     className={`p-2 border border-gray-700 text-center font-semibold ${
//                       report.status === "Resolved"
//                         ? "text-green-400"
//                         : "text-red-400"
//                     }`}
//                   >
//                     {report.status}
//                   </td>
//                   <td className="p-2 border border-gray-700 text-center space-x-2">
//                     <button
//                       onClick={() => updateReport(report.id, "Resolved")}
//                       className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-xs"
//                     >
//                       Resolve
//                     </button>
//                     <button
//                       onClick={() => deleteReport(report.id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td className="p-2 border border-gray-700 text-center">
//                     {report.image_url && (
//                       <img
//                         src={report.image_url}
//                         alt="Report"
//                         className="h-14 w-14 object-cover rounded border border-gray-600 mx-auto"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-8 rounded-lg overflow-hidden shadow-lg border border-gray-700 bg-gray-900">
//           <ReportsMap reports={filteredReports} />
//         </div>
//         <div className="text-center mt-6">
//           {" "}
//           <a
//             href="/"
//             className="text-blue-300 hover:text-blue-800 font-semibold hover:underline transition"
//           >
//             {" "}
//             ← Back to Home{" "}
//           </a>{" "}
//         </div>
//       </div>
//     </div>
//   );

// }




import { useState, useEffect } from "react";
import ReportsMap from "../components/ReportsMap";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');

  .admin-root {
    min-height: 100vh;
    background: #070810;
    color: #e2e8f0;
    font-family: 'DM Mono', monospace;
  }

  .admin-nav {
    width: 100%;
    background: #0c0d18;
    border-bottom: 1px solid rgba(99,102,241,0.2);
    padding: 18px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
  }

  .admin-nav-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.01em;
  }

  .admin-nav-badge {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #6366f1;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.25);
    padding: 4px 12px;
    border-radius: 4px;
  }

  .admin-content {
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .admin-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    gap: 16px;
  }

  .filter-group {
    display: flex;
    gap: 8px;
  }

  .filter-btn {
    padding: 8px 20px;
    border-radius: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .filter-btn-inactive {
    background: #131424;
    color: #6b7280;
    border-color: #1f2040;
  }

  .filter-btn-inactive:hover {
    background: #1a1b33;
    color: #a5b4fc;
    border-color: #3730a3;
  }

  .filter-btn-all {
    background: rgba(99,102,241,0.15);
    color: #818cf8;
    border-color: rgba(99,102,241,0.4);
  }

  .filter-btn-pending {
    background: rgba(239,68,68,0.12);
    color: #f87171;
    border-color: rgba(239,68,68,0.35);
  }

  .filter-btn-resolved {
    background: rgba(34,197,94,0.12);
    color: #4ade80;
    border-color: rgba(34,197,94,0.35);
  }

  .refresh-btn {
    padding: 9px 20px;
    background: #6366f1;
    color: #fff;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .refresh-btn:hover {
    background: #4f46e5;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99,102,241,0.35);
  }

  .table-wrap {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #1a1b30;
    box-shadow: 0 0 40px rgba(0,0,0,0.5);
  }

  .reports-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
    color: #cbd5e1;
  }

  .reports-table thead {
    background: #0e0f1f;
  }

  .reports-table thead th {
    padding: 13px 12px;
    text-align: left;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4b5563;
    border-bottom: 1px solid #1a1b30;
  }

  .reports-table thead th.center {
    text-align: center;
  }

  .reports-table tbody tr {
    border-bottom: 1px solid #111220;
    transition: background 0.15s;
  }

  .reports-table tbody tr:nth-child(odd) {
    background: #0a0b15;
  }

  .reports-table tbody tr:nth-child(even) {
    background: #0c0d1a;
  }

  .reports-table tbody tr:hover {
    background: #13142a;
  }

  .reports-table td {
    padding: 11px 12px;
    vertical-align: middle;
  }

  .reports-table td.center {
    text-align: center;
  }

  .id-cell {
    color: #4b5563;
    font-size: 11px;
    letter-spacing: 0.06em;
  }

  .title-cell {
    font-weight: 500;
    color: #e2e8f0;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .desc-cell {
    color: #94a3b8;
    white-space: pre-wrap;
    max-width: 220px;
    font-size: 11.5px;
  }

  .loc-cell {
    color: #94a3b8;
    white-space: pre-wrap;
    max-width: 160px;
    font-size: 11.5px;
  }

  .cat-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #fff;
  }

  .cat-pothole { background: rgba(239,68,68,0.25); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
  .cat-garbage { background: rgba(34,197,94,0.2); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); }
  .cat-other   { background: rgba(99,102,241,0.2); color: #a5b4fc; border: 1px solid rgba(99,102,241,0.3); }

  .status-resolved { color: #4ade80; font-weight: 600; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
  .status-pending  { color: #f87171; font-weight: 600; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }

  .action-resolve {
    padding: 5px 12px;
    background: rgba(34,197,94,0.15);
    color: #4ade80;
    border: 1px solid rgba(34,197,94,0.3);
    border-radius: 5px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.15s;
  }
  .action-resolve:hover {
    background: rgba(34,197,94,0.25);
    box-shadow: 0 0 12px rgba(34,197,94,0.2);
  }

  .action-delete {
    padding: 5px 12px;
    background: rgba(239,68,68,0.12);
    color: #f87171;
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 5px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.15s;
    margin-left: 6px;
  }
  .action-delete:hover {
    background: rgba(239,68,68,0.22);
    box-shadow: 0 0 12px rgba(239,68,68,0.2);
  }

  .report-img {
    height: 48px;
    width: 48px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #1e2035;
  }

  .map-section {
    margin-top: 36px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #1a1b30;
    box-shadow: 0 0 40px rgba(0,0,0,0.5);
  }

  .map-label-bar {
    background: #0e0f1f;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #1a1b30;
  }

  .map-label-bar span {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4b5563;
  }

  .map-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 0 8px rgba(239,68,68,0.6);
    animation: pulse-dot 1.8s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .back-link {
    display: inline-block;
    margin-top: 32px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: #6366f1;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.15s;
  }
  .back-link:hover { color: #a5b4fc; }

  .error-msg {
    color: #f87171;
    font-size: 13px;
    margin-bottom: 20px;
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
    padding: 10px 16px;
    border-radius: 6px;
  }

  .empty-row td {
    text-align: center;
    padding: 40px;
    color: #374151;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`);
      const data = await res.json();
      if (res.ok) {
        setReports(data);
      } else {
        setError(data.error || "Failed to fetch reports");
      }
    } catch (err) {
      setError("Network Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateReport = async (id, newStatus) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/report/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        fetchReports();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Network Error: " + err.message);
    }
  };

  const deleteReport = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/report/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        fetchReports();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Network Error: " + err.message);
    }
  };

  const filteredReports =
    filter === "All" ? reports : reports.filter((r) => r.status === filter);

  const getFilterClass = (status) => {
    if (filter !== status) return "filter-btn filter-btn-inactive";
    if (status === "All") return "filter-btn filter-btn-all";
    if (status === "Pending") return "filter-btn filter-btn-pending";
    return "filter-btn filter-btn-resolved";
  };

  const getCatClass = (cat) => {
    if (cat === "pothole") return "cat-badge cat-pothole";
    if (cat === "garbage") return "cat-badge cat-garbage";
    return "cat-badge cat-other";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="admin-root">
        <nav className="admin-nav">
          <span className="admin-nav-title">Admin Dashboard</span>
          <span className="admin-nav-badge">Control Panel</span>
        </nav>

        <div className="admin-content">
          {error && <div className="error-msg">{error}</div>}
          <div className="admin-toolbar">
            <div className="filter-group">
              {["All", "Pending", "Resolved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={getFilterClass(status)}
                >
                  {status}
                </button>
              ))}
            </div>
            <button onClick={fetchReports} className="refresh-btn">
              ↻ Refresh
            </button>
          </div>

          <div className="table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th className="center">ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th className="center">Category</th>
                  <th className="center">Status</th>
                  <th className="center">Actions</th>
                  <th className="center">Image</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="empty-row">
                    <td colSpan={8}>Loading reports…</td>
                  </tr>
                ) : filteredReports.length === 0 ? (
                  <tr className="empty-row">
                    <td colSpan={8}>No reports found</td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr key={report.id}>
                      <td className="center id-cell">{report.id}</td>
                      <td className="title-cell">{report.title}</td>
                      <td className="desc-cell">{report.description}</td>
                      <td className="loc-cell">{report.location}</td>
                      <td className="center">
                        <span className={getCatClass(report.category)}>
                          {report.category || "N/A"}
                        </span>
                      </td>
                      <td className="center">
                        <span
                          className={
                            report.status === "Resolved"
                              ? "status-resolved"
                              : "status-pending"
                          }
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="center">
                        <button
                          onClick={() => updateReport(report.id, "Resolved")}
                          className="action-resolve"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => deleteReport(report.id)}
                          className="action-delete"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="center">
                        {report.image_url && (
                          <img
                            src={report.image_url}
                            alt="Report"
                            className="report-img"
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="map-section">
            <div className="map-label-bar">
              <div className="map-dot" />
              <span>Active incident map</span>
            </div>
            <ReportsMap reports={filteredReports} />
          </div>

          <div style={{ textAlign: "center" }}>
            <a href="/" className="back-link">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

