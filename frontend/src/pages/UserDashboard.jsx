// import { useState } from "react";
// import supabase from "../supabaseClient";

// export default function UserDashboard() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     file: null,
//   });

//   const [message, setMessage] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [predictedCategory, setPredictedCategory] = useState(""); // NEW

//   //Handle form field change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   //Capture user location
//   const getLocation = () =>
//     new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error("Geolocation not supported"));
//       } else {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//       }
//     });

//   // Voice Input (Web Speech API)
//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;

//     recognition.start();
//     setIsListening(true);

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setFormData((prev) => ({
//         ...prev,
//         description: prev.description + " " + transcript,
//       }));
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error", event.error);
//       setMessage("Voice input error: " + event.error);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };
//   };


//   const getCityFromCoords = async (lat, lng) => {
//     const res = await fetch(
//       `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${import.meta.env.VITE_GET_CITY_API}`
//     );
//     const data = await res.json();

//     const components = data.results[0].components;

//     return (
//       components.city ||
//       components.town ||
//       components.village ||
//       components.state ||
//       "Unknown"
//     );
//   };

//   const handleSubmit = async (e) => {
//     console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
//     e.preventDefault();

//     try {
//       let imageUrl = "";
//       let latitude = null;
//       let longitude = null;
//       let city = "";
//       // Get location
//       if (formData.location.includes(",")) {
//         const parts = formData.location.split(",");
//         latitude = parseFloat(parts[0]);
//         longitude = parseFloat(parts[1]);

//         city = await getCityFromCoords(latitude, longitude);
//       } else {
//         try {
//           const position = await getLocation();
//           latitude = position.coords.latitude;
//           longitude = position.coords.longitude;
//           city = await getCityFromCoords(latitude, longitude);
//           // console.log("Inside the try block");
//           // console.log("City:", city);
//           // console.log("Lat/Lng:", latitude, longitude);
//         } catch (err) {
//           console.warn("Location not available");
//         }
//       }
//       // Upload image
//       if (formData.file) {
//         const safeName = formData.file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
//         const fileName = `${Date.now()}-${safeName}`;

//         const { error } = await supabase.storage
//           .from("complaint-images")
//           .upload(fileName, formData.file);

//         if (error) throw error;

//         const { data: publicUrl } = supabase.storage
//           .from("complaint-images")
//           .getPublicUrl(fileName);

//         imageUrl = publicUrl.publicUrl;
//       }
//       // Create payload
//       // const payload = {
//       //   title: formData.title,
//       //   description: formData.description,
//       //   location: formData.location,
//       //   latitude: latitude,
//       //   longitude: longitude,
//       //   image_url: imageUrl,
//       // };

//       // Log what you're sending
//       // console.log("Payload being sent:", payload);
//       // Send to backend
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/report`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: formData.title,
//           description: formData.description,
//           location: city, // keep as city name
//           latitude: latitude,
//           longitude: longitude,
//           image_url: imageUrl,
//         }),
//       });
//       // console.log("result being sent is", res.body);
//       const data = await res.json();

//       if (res.ok) {
//         setMessage("Report submitted successfully!");
//         setPredictedCategory(data.report.category);
//         setFormData({ title: "", description: "", location: "", file: null });
//       } else {
//         setMessage("Error: " + data.error);
//       }

//     } catch (err) {
//       setMessage("Upload Error: " + err.message);
//     }
//   };
//   return (
//     <div className="relative h-screen w-screen overflow-hidden font-sans">
//       <img
//         src="./image2.png"
//         alt="background"
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       />
//       <div className="relative flex items-center justify-center h-full">
//         <div className="w-full max-w-xl p-8 rounded-2xl backdrop-blur-lg bg-white/20 shadow-2xl border border-white/30">
//           <h2 className="text-4xl font-extrabold mb-6 text-center text-white">
//             Submit Complaint
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <input
//               type="text"
//               name="title"
//               placeholder="Enter Title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none backdrop-blur-md"
//               required
//             />

//             <div className="flex items-start gap-2">
//               <textarea
//                 name="description"
//                 placeholder="Enter Description or use voice"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="flex-1 p-3 rounded-xl bg-white/30 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none backdrop-blur-md"
//                 rows={3}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={startListening}
//                 className={`px-4 py-3 rounded-xl font-semibold text-white shadow-lg transition ${isListening
//                   ? "bg-red-500 animate-pulse"
//                   : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-600 hover:to-purple-700"
//                   }`}
//               >
//                 {isListening ? " Listening" : " Speak"}
//               </button>
//             </div>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setFormData({ ...formData, file: e.target.files[0] })
//               }
//               className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-gray-200 border border-white/40"
//             />

//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location (auto from GPS)"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="flex-1 p-3 rounded-xl bg-white/30 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-400 focus:outline-none backdrop-blur-md"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={getLocation}
//                 className="px-4 py-3   text-white font-bold rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-600 hover:to-purple-700 transition"
//               >
//                 Auto
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 font-bold text-lg text-white rounded-xl shadow-xl bg-gradient-to-r from-blue-500 to-yellow-600 hover:from-blue-600 hover:to-yellow-700 transition"
//             >
//               Submit Complaint
//             </button>
//           </form>
//           {predictedCategory && (
//             <p className="mt-6 text-center text-green-300 font-semibold bg-black/40 p-2 rounded">
//               Predicted Category:{" "}
//               <span className="capitalize">{predictedCategory}</span>
//             </p>
//           )}

//           {message && (
//             <p className="mt-4 text-center text-white font-medium bg-black/30 p-2 rounded">
//               {message}
//             </p>
//           )}
//           <div className="text-center mt-6">
//             {" "}
//             <a
//               href="/"
//               className="text-blue-300 hover:text-blue-800 font-semibold hover:underline transition"
//             >
//               {" "}
//               ← Back to Home{" "}
//             </a>{" "}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import supabase from "../supabaseClient";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');

  .user-root {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    font-family: 'DM Mono', monospace;
  }

  .user-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  /* Dark overlay with subtle noise-like gradient */
  .user-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(4, 4, 14, 0.82) 0%,
      rgba(10, 8, 30, 0.75) 50%,
      rgba(4, 10, 20, 0.85) 100%
    );
    z-index: 1;
  }

  .user-center {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 40px 16px;
  }

  .form-card {
    width: 100%;
    max-width: 500px;
    background: rgba(8, 9, 22, 0.72);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(99, 102, 241, 0.18);
    border-radius: 16px;
    padding: 40px 36px;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.03),
      0 32px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(99,102,241,0.06);
  }

  .form-header {
    margin-bottom: 32px;
    text-align: center;
  }

  .form-eyebrow {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #6366f1;
    margin-bottom: 10px;
    display: block;
  }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .field-label {
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4b5563;
    margin-bottom: 4px;
    display: block;
  }

  .field-wrap {
    display: flex;
    flex-direction: column;
  }

  .form-input {
    width: 100%;
    padding: 11px 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #e2e8f0;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .form-input::placeholder {
    color: #374151;
  }

  .form-input:focus {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    background: rgba(255,255,255,0.06);
  }

  .form-textarea {
    width: 100%;
    padding: 11px 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #e2e8f0;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    outline: none;
    resize: vertical;
    transition: border-color 0.2s, box-shadow 0.2s;
    flex: 1;
    box-sizing: border-box;
  }

  .form-textarea::placeholder {
    color: #374151;
  }

  .form-textarea:focus {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    background: rgba(255,255,255,0.06);
  }

  .row-group {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  .icon-btn {
    padding: 11px 16px;
    border-radius: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.18s;
    flex-shrink: 0;
  }

  .voice-idle {
    background: rgba(99,102,241,0.15);
    color: #818cf8;
    border-color: rgba(99,102,241,0.3);
  }
  .voice-idle:hover {
    background: rgba(99,102,241,0.25);
    box-shadow: 0 0 14px rgba(99,102,241,0.2);
  }

  .voice-active {
    background: rgba(239,68,68,0.18);
    color: #f87171;
    border-color: rgba(239,68,68,0.35);
    animation: voice-pulse 1.2s ease-in-out infinite;
  }

  @keyframes voice-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.3); }
    50% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
  }

  .auto-btn {
    background: rgba(255,255,255,0.05);
    color: #6b7280;
    border-color: rgba(255,255,255,0.08);
  }
  .auto-btn:hover {
    background: rgba(255,255,255,0.08);
    color: #9ca3af;
  }

  .file-input-wrap {
    position: relative;
  }

  .file-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    background: rgba(255,255,255,0.04);
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 8px;
    color: #4b5563;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.18s;
    letter-spacing: 0.05em;
  }

  .file-label:hover {
    border-color: rgba(99,102,241,0.3);
    color: #6366f1;
    background: rgba(99,102,241,0.05);
  }

  .file-input-hidden {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    margin-top: 6px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.04em;
    border: none;
    border-radius: 9px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 24px rgba(79,70,229,0.3);
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(79,70,229,0.45);
    background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%);
  }

  .submit-btn:active {
    transform: translateY(0);
  }

  .category-toast {
    margin-top: 20px;
    padding: 12px 16px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.22);
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
    letter-spacing: 0.06em;
    color: #4ade80;
  }

  .category-toast strong {
    font-weight: 600;
    text-transform: capitalize;
    color: #86efac;
  }

  .message-toast {
    margin-top: 14px;
    padding: 11px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: #94a3b8;
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 20px 0;
  }

  .back-link {
    display: block;
    text-align: center;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #374151;
    text-decoration: none;
    transition: color 0.15s;
    margin-top: 20px;
  }
  .back-link:hover { color: #6366f1; }

  .file-name-display {
    font-size: 11px;
    color: #6366f1;
    margin-top: 4px;
    padding-left: 2px;
    letter-spacing: 0.04em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default function UserDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    file: null,
  });

  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [predictedCategory, setPredictedCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });

  // The NEW function to connect to the "Auto" button
  const getAutoLocation = async () => {
    setMessage("Detecting coordinates...");
    try {
      const position = await getLocation();
      const { latitude, longitude } = position.coords;

      // This updates the input field text
      setFormData((prev) => ({
        ...prev,
        location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
      }));

      setMessage("Location synchronized.");
    } catch (err) {
      setMessage("Location Error: " + err.message);
    }
  };
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({
        ...prev,
        description: prev.description + " " + transcript,
      }));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setMessage("Voice input error: " + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const getCityFromCoords = async (lat, lng) => {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${import.meta.env.VITE_GET_CITY_API}`
    );
    const data = await res.json();
    const components = data.results[0].components;
    return (
      components.city ||
      components.town ||
      components.village ||
      components.state ||
      "Unknown"
    );
  };

  const handleSubmit = async (e) => {
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
    e.preventDefault();

    try {
      let imageUrl = "";
      let latitude = null;
      let longitude = null;
      let city = "";

      if (formData.location.includes(",")) {
        const parts = formData.location.split(",");
        latitude = parseFloat(parts[0]);
        longitude = parseFloat(parts[1]);
        city = await getCityFromCoords(latitude, longitude);
      } else {
        try {
          const position = await getLocation();
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          city = await getCityFromCoords(latitude, longitude);
        } catch (err) {
          console.warn("Location not available");
        }
      }

      if (formData.file) {
        const safeName = formData.file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${Date.now()}-${safeName}`;

        const { error } = await supabase.storage
          .from("complaint-images")
          .upload(fileName, formData.file);

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
          .from("complaint-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl.publicUrl;
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: city,
          latitude: latitude,
          longitude: longitude,
          image_url: imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Report submitted successfully!");
        setPredictedCategory(data.report.category);
        setFormData({ title: "", description: "", location: "", file: null });
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      setMessage("Upload Error: " + err.message);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="user-root">
        <img src="./image2.png" alt="background" className="user-bg" />
        <div className="user-overlay" />

        <div className="user-center">
          <div className="form-card">
            <div className="form-header">
              <span className="form-eyebrow">Civic Reporting System</span>
              <h2 className="form-title">Submit a Complaint</h2>
            </div>

            <form onSubmit={handleSubmit} className="field-group">
              {/* Title */}
              <div className="field-wrap">
                <label className="field-label">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Brief issue title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Description + Voice */}
              <div className="field-wrap">
                <label className="field-label">Description</label>
                <div className="row-group">
                  <textarea
                    name="description"
                    placeholder="Describe the issue…"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={3}
                    required
                  />
                  <button
                    type="button"
                    onClick={startListening}
                    className={`icon-btn ${isListening ? "voice-active" : "voice-idle"}`}
                  >
                    {isListening ? "● Listening" : "🎤 Speak"}
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="field-wrap">
                <label className="field-label">Photo Evidence</label>
                <div className="file-input-wrap">
                  <div className="file-label">
                    <span>📎</span>
                    <span>{formData.file ? formData.file.name : "Attach image (optional)"}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input-hidden"
                    onChange={(e) =>
                      setFormData({ ...formData, file: e.target.files[0] })
                    }
                  />
                </div>
              </div>

              {/* Location */}
              <div className="field-wrap">
                <label className="field-label">Location</label>
                <div className="row-group">
                  <input
                    type="text"
                    name="location"
                    placeholder="Auto-detected via GPS"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input"
                    required
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={getAutoLocation}
                    className="icon-btn auto-btn"
                  >
                    📍 Auto
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="submit-btn">
                Submit Complaint →
              </button>
            </form>

            {predictedCategory && (
              <div className="category-toast">
                Predicted Category:{" "}
                <strong>{predictedCategory}</strong>
              </div>
            )}

            {message && (
              <div className="message-toast">{message}</div>
            )}

            <div className="divider" />
            <a href="/" className="back-link">← Back to Home</a>
          </div>
        </div>
      </div>
    </>
  );
}