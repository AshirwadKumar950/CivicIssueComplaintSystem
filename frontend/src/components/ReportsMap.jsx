// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import { useEffect } from "react";

// // Icons
// const redIcon = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const greenIcon = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// // 🔥 Auto fit map to all markers
// function FitBounds({ reports }) {
//   const map = useMap();

//   useEffect(() => {
//     const validCoords = reports
//       .map((r) => [Number(r.latitude), Number(r.longitude)])
//       .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));

//     if (validCoords.length > 0) {
//       map.fitBounds(validCoords);
//     }
//   }, [reports, map]);

//   return null;
// }

// export default function ReportsMap({ reports }) {
//   if (!reports || reports.length === 0) {
//     return <p className="text-center mt-4">No reports to display on map.</p>;
//   }

//   // Optional: only pending
//   const filteredReports = reports.filter(r => r.status === "Pending");

//   return (
//     <MapContainer
//       center={[20, 78]} // India center (fallback)
//       zoom={5}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />

//       {/* 🔥 Auto adjust map */}
//       <FitBounds reports={filteredReports} />

//       {filteredReports.map((report) => {
//         const lat = Number(report.latitude);
//         const lng = Number(report.longitude);

//         if (isNaN(lat) || isNaN(lng)) return null;

//         return (
//           <Marker
//             key={report.id}
//             position={[lat, lng]}
//             icon={report.status === "Resolved" ? greenIcon : redIcon}
//           >
//             <Popup>
//               <b>{report.title}</b>
//               <br />
//               {report.description}
//               <br />
//               <span>{report.status}</span>
//               <br />
//               <span>Location: {report.location}</span>
//               <br />
//               <span>Category: {report.category}</span>
//             </Popup>
//           </Marker>
//         );
//       })}
//     </MapContainer>
//   );
// }

// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import { useEffect } from "react";

// const redIcon = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const greenIcon = new L.Icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// function FitBounds({ reports }) {
//   const map = useMap();

//   useEffect(() => {
//     const validCoords = reports
//       .map((r) => [Number(r.latitude), Number(r.longitude)])
//       .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));

//     if (validCoords.length > 0) {
//       map.fitBounds(validCoords);
//     }
//   }, [reports, map]);

//   return null;
// }

// export default function ReportsMap({ reports }) {
//   if (!reports || reports.length === 0) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "500px",
//           background: "linear-gradient(135deg, #0a0a0f 0%, #111827 100%)",
//           fontFamily: "'DM Mono', monospace",
//           color: "#4b5563",
//           fontSize: "14px",
//           letterSpacing: "0.1em",
//           textTransform: "uppercase",
//         }}
//       >
//         — No reports to display —
//       </div>
//     );
//   }

//   const filteredReports = reports.filter((r) => r.status === "Pending");

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Map label overlay */}
//       <div
//         style={{
//           position: "absolute",
//           top: "12px",
//           left: "12px",
//           zIndex: 1000,
//           background: "rgba(0,0,0,0.75)",
//           backdropFilter: "blur(12px)",
//           border: "1px solid rgba(239,68,68,0.3)",
//           borderRadius: "6px",
//           padding: "6px 14px",
//           fontFamily: "'DM Mono', monospace",
//           fontSize: "11px",
//           letterSpacing: "0.15em",
//           color: "#ef4444",
//           textTransform: "uppercase",
//           fontWeight: 600,
//         }}
//       >
//         ● Live Reports
//       </div>

//       <MapContainer
//         center={[20, 78]}
//         zoom={5}
//         style={{
//           height: "500px",
//           width: "100%",
//           filter: "saturate(0.6) brightness(0.85)",
//         }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <FitBounds reports={filteredReports} />

//         {filteredReports.map((report) => {
//           const lat = Number(report.latitude);
//           const lng = Number(report.longitude);

//           if (isNaN(lat) || isNaN(lng)) return null;

//           return (
//             <Marker
//               key={report.id}
//               position={[lat, lng]}
//               icon={report.status === "Resolved" ? greenIcon : redIcon}
//             >
//               <Popup>
//                 <div
//                   style={{
//                     fontFamily: "'DM Mono', monospace",
//                     fontSize: "12px",
//                     minWidth: "180px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontWeight: 700,
//                       fontSize: "13px",
//                       marginBottom: "6px",
//                       color: "#111",
//                     }}
//                   >
//                     {report.title}
//                   </div>
//                   <div style={{ color: "#444", marginBottom: "4px" }}>
//                     {report.description}
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       gap: "6px",
//                       flexWrap: "wrap",
//                       marginTop: "8px",
//                     }}
//                   >
//                     <span
//                       style={{
//                         background:
//                           report.status === "Resolved" ? "#16a34a" : "#dc2626",
//                         color: "#fff",
//                         padding: "2px 8px",
//                         borderRadius: "4px",
//                         fontSize: "10px",
//                         fontWeight: 700,
//                         letterSpacing: "0.05em",
//                       }}
//                     >
//                       {report.status}
//                     </span>
//                     <span
//                       style={{
//                         background: "#1d4ed8",
//                         color: "#fff",
//                         padding: "2px 8px",
//                         borderRadius: "4px",
//                         fontSize: "10px",
//                         fontWeight: 700,
//                         letterSpacing: "0.05em",
//                       }}
//                     >
//                       {report.category || "N/A"}
//                     </span>
//                   </div>
//                   <div
//                     style={{ color: "#666", fontSize: "11px", marginTop: "6px" }}
//                   >
//                     📍 {report.location}
//                   </div>
//                 </div>
//               </Popup>
//             </Marker>
//           );
//         })}
//       </MapContainer>
//     </div>
//   );
// }





// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import { useEffect } from "react";
// import "leaflet/dist/leaflet.css";

// // Aesthetic SVG Marker with Pulsing Effect logic
// const createCustomIcon = (color) => {
//   const svgTemplate = `
//     <svg width="30" height="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="50" cy="50" r="20" fill="${color}" stroke="white" stroke-width="4" />
//       <circle cx="50" cy="50" r="35" fill="none" stroke="${color}" stroke-width="2">
//         <animate attributeName="r" from="20" to="45" dur="1.5s" begin="0s" repeatCount="indefinite" />
//         <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
//       </circle>
//     </svg>`;

//   return new L.DivIcon({
//     html: svgTemplate,
//     className: "custom-map-marker",
//     iconSize: [40, 40],
//     iconAnchor: [20, 20],
//   });
// };

// const redIcon = createCustomIcon("#f87171");
// const greenIcon = createCustomIcon("#4ade80");

// function FitBounds({ reports }) {
//   const map = useMap();
//   useEffect(() => {
//     const validCoords = reports
//       .map((r) => [Number(r.latitude), Number(r.longitude)])
//       .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));
//     if (validCoords.length > 0) map.fitBounds(validCoords, { padding: [50, 50] });
//   }, [reports, map]);
//   return null;
// }

// export default function ReportsMap({ reports }) {
//   if (!reports || reports.length === 0) {
//     return (
//       <div className="map-empty-state">
//         — NO ACTIVE INCIDENTS DETECTED —
//       </div>
//     );
//   }

//   // Same logic: filter for map view
//   const filteredReports = reports.filter((r) => r.status === "Pending");

//   return (
//     <div style={{ position: "relative", borderRadius: '12px', overflow: 'hidden' }}>
//       <MapContainer
//         center={[20, 78]}
//         zoom={5}
//         zoomControl={false} // Cleaner look
//         style={{
//           height: "600px",
//           width: "100%",
//           background: "#0c0d18"
//         }}
//       >
//         {/* Aesthetic Dark Tiles */}
//         <TileLayer
//           url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
//           attribution='&copy; <a href="https://carto.com/">CARTO</a>'
//         />

//         <FitBounds reports={filteredReports} />

//         {filteredReports.map((report) => {
//           const lat = Number(report.latitude);
//           const lng = Number(report.longitude);
//           if (isNaN(lat) || isNaN(lng)) return null;

//           return (
//             <Marker
//               key={report.id}
//               position={[lat, lng]}
//               icon={report.status === "Resolved" ? greenIcon : redIcon}
//             >
//               <Popup className="aesthetic-popup">
//                 <div className="popup-inner">
//                   <header>{report.title}</header>
//                   <p>{report.description}</p>
//                   <div className="popup-tags">
//                     <span className={`status-tag ${report.status.toLowerCase()}`}>
//                       {report.status}
//                     </span>
//                     <span className="category-tag">{report.category || "General"}</span>
//                   </div>
//                   <div className="popup-loc">📍 {report.location}</div>
//                 </div>
//               </Popup>
//             </Marker>
//           );
//         })}
//       </MapContainer>
//     </div>
//   );
// }

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dynamic Marker Factory
const createAestheticIcon = (color, type) => {
  const isNeon = type === 'neon';

  const svgTemplate = `
    <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      ${isNeon ? `
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>` : ''}
      <circle cx="50" cy="50" r="18" fill="${color}" stroke="white" stroke-width="3" ${isNeon ? 'filter="url(#glow)"' : ''} />
      <circle cx="50" cy="50" r="35" fill="none" stroke="${color}" stroke-width="2" opacity="0.6">
        <animate attributeName="r" from="18" to="48" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>`;

  return new L.DivIcon({
    html: svgTemplate,
    className: "custom-map-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const MAP_THEMES = {
  dark: {
    name: "Cyber Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    markerStyle: "neon",
  },
  light: {
    name: "Minimal Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    markerStyle: "solid",
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    markerStyle: "neon",
  },
  terrain: {
    name: "Tactical Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    markerStyle: "solid",
  }
};

function FitBounds({ reports }) {
  const map = useMap();
  useEffect(() => {
    const validCoords = reports
      .map((r) => [Number(r.latitude), Number(r.longitude)])
      .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));
    if (validCoords.length > 0) map.fitBounds(validCoords, { padding: [50, 50] });
  }, [reports, map]);
  return null;
}

export default function ReportsMap({ reports }) {
  const [theme, setTheme] = useState("dark");

  if (!reports || reports.length === 0) {
    return <div className="map-empty-state">— NO ACTIVE INCIDENTS —</div>;
  }

  const filteredReports = reports.filter((r) => r.status === "Pending");
  const currentTheme = MAP_THEMES[theme];

  return (
    <div style={{ position: "relative", height: "600px" }}>
      {/* Theme Switcher Overlay */}
      <div style={{
        position: "absolute",
        top: "15px",
        right: "15px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        background: "rgba(12, 13, 24, 0.85)",
        padding: "8px",
        borderRadius: "10px",
        border: "1px solid rgba(99,102,241,0.3)",
        backdropFilter: "blur(10px)"
      }}>
        {Object.keys(MAP_THEMES).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              padding: "6px 12px",
              background: theme === t ? "#6366f1" : "transparent",
              color: theme === t ? "#fff" : "#94a3b8",
              border: "none",
              borderRadius: "4px",
              fontSize: "10px",
              fontFamily: "'DM Mono', monospace",
              cursor: "pointer",
              textAlign: "left",
              transition: "0.2s"
            }}
          >
            {MAP_THEMES[t].name}
          </button>
        ))}
      </div>

      <MapContainer
        center={[20, 78]}
        zoom={5}
        zoomControl={false}
        style={{ height: "100%", width: "100%", background: "#0c0d18" }}
      >
        <TileLayer url={currentTheme.url} />
        <FitBounds reports={filteredReports} />

        {filteredReports.map((report) => {
          const lat = Number(report.latitude);
          const lng = Number(report.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          // Generate icon based on theme marker style
          const icon = createAestheticIcon(
            report.status === "Resolved" ? "#4ade80" : "#f87171",
            currentTheme.markerStyle
          );

          return (
            <Marker key={report.id} position={[lat, lng]} icon={icon}>
              <Popup className="aesthetic-popup">
                <div className="popup-inner">
                  <header>{report.title}</header>
                  <p>{report.description}</p>
                  <div className="popup-tags">
                    <span className={`status-tag pending`}>{report.status}</span>
                    <span className="category-tag">{report.category}</span>
                  </div>
                  <div className="popup-loc">📍 {report.location}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}