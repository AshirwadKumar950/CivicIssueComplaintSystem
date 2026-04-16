// import React from "react";
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Syne:wght@800&display=swap');

//   .font-syne { font-family: 'Syne', sans-serif; }
//   .font-space { font-family: 'Space Grotesk', sans-serif; }

//   .bg-grid {
//     background-size: 50px 50px;
//     background-image: 
//       linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
//       linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
//   }

//   .glass-card {
//     background: rgba(15, 17, 26, 0.7);
//     backdrop-filter: blur(16px);
//     border: 1px solid rgba(255, 255, 255, 0.08);
//   }

//   .glow-text {
//     text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
//   }
// `;

// export default function App() {
//   return (
//     <div className="relative h-screen w-screen overflow-hidden bg-[#05060b] font-space selection:bg-indigo-500/30">
//       <style>{styles}</style>
//       <img
//         src="./image1.png"
//         alt="background"
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       />
//       {/* Dynamic Background Elements */}
//       <div className="absolute inset-0 bg-grid"></div>
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full"></div>

//       {/* Refined Navigation */}
//       <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-6 z-50">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-indigo-500 rounded-lg rotate-45 flex items-center justify-center">
//             <div className="w-4 h-4 bg-white rounded-sm -rotate-45"></div>
//           </div>
//           <h1 className="text-xl font-bold text-white tracking-tighter">CIVIC_EYE</h1>
//         </div>

//         <ul className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
//           <li><a href="/" className="hover:text-indigo-400 transition-colors">Network</a></li>
//           <li><a href="#about" className="hover:text-indigo-400 transition-colors">Protocol</a></li>
//           <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Support</a></li>
//         </ul>

//         <div className="text-xs font-mono text-indigo-400/60 border border-indigo-500/20 px-3 py-1 rounded">
//           SYSTEM_v3.0.4_ACTIVE
//         </div>
//       </nav>

//       {/* Main Hero Content */}
//       <main className="relative z-10 flex flex-col items-center justify-center h-full px-6">
//         <div className="mb-4 px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
//           Community Infrastructure Interface
//         </div>

//         <h1 className="text-7xl md:text-9xl font-syne font-extrabold text-white mb-6 tracking-tighter glow-text leading-none">
//           CivicEye
//         </h1>

//         <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center mb-12 leading-relaxed">
//           The next-generation <span className="text-white">Citizen Response Protocol</span>.
//           Bridging the gap between public reports and rapid administrative resolution with precision.
//         </p>

//         {/* Dynamic Action Grid */}
//         <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
//           <a
//             href="/user"
//             className="flex-1 group relative overflow-hidden px-8 py-5 glass-card rounded-2xl text-white font-bold transition-all hover:border-indigo-500/50"
//           >
//             <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors"></div>
//             <div className="relative flex flex-col items-center gap-1">
//               <span className="text-xs uppercase tracking-widest text-indigo-400 mb-1">Citizen Portal</span>
//               <span className="text-lg">FILE REPORT →</span>
//             </div>
//           </a>

//           <a
//             href="/admin"
//             className="flex-1 group relative overflow-hidden px-8 py-5 glass-card rounded-2xl text-white font-bold transition-all hover:border-emerald-500/50"
//           >
//             <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors"></div>
//             <div className="relative flex flex-col items-center gap-1">
//               <span className="text-xs uppercase tracking-widest text-emerald-400 mb-1">Admin Access</span>
//               <span className="text-lg">CONTROL PANEL</span>
//             </div>
//           </a>
//         </div>

//         {/* Footer Stats Decor */}
//         <div className="absolute bottom-12 flex gap-12 text-[10px] font-mono text-gray-600 tracking-[0.2em] uppercase">
//           <div className="flex flex-col">
//             <span className="text-gray-400">Response_Rate</span>
//             <span>98.4%</span>
//           </div>
//           <div className="flex flex-col border-l border-gray-800 pl-12">
//             <span className="text-gray-400">Active_Nodes</span>
//             <span>1,240 Global</span>
//           </div>
//           <div className="flex flex-col border-l border-gray-800 pl-12">
//             <span className="text-gray-400">Latency</span>
//             <span>24ms</span>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



import React from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Syne:wght@800&display=swap');

  .font-syne { font-family: 'Syne', sans-serif; }
  .font-space { font-family: 'Space Grotesk', sans-serif; }

  .bg-grid {
    background-size: 50px 50px;
    background-image: 
      linear-gradient(to right, rgba(15, 23, 42, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(15, 23, 42, 0.1) 1px, transparent 1px);
  }

  /* Darker glass card for contrast against light BG */
  .glass-card {
    background: rgba(15, 17, 26, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(15, 23, 42, 0.2);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  }

  /* Darker text glow for the title */
  .glow-text {
    text-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
    color: #0f172a; /* Deep Slate Navy */
  }

  .nav-blur {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(15, 23, 42, 0.05);
  }
`;

export default function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white font-space selection:bg-indigo-500/30">
      <style>{styles}</style>

      {/* Your Background Image */}
      <img
        src="./image1.png"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* VIGNETTE OVERLAY: Darkens edges to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none"></div>

      {/* Dynamic Grid (Darkened for light BG) */}
      <div className="absolute inset-0 bg-grid opacity-40"></div>

      {/* Decorative Orbs (Opacity adjusted for light mode) */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-indigo-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-emerald-500/10 blur-[100px] rounded-full"></div>

      {/* Refined Navigation */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-6 z-50 nav-blur">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0f172a] rounded-lg rotate-45 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-sm -rotate-45"></div>
          </div>
          <h1 className="text-xl font-bold text-[#0f172a] tracking-tighter">CIVIC_ISSUE</h1>
        </div>

        <ul className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
          <li><a href="/" className="hover:text-indigo-600 transition-colors">Network</a></li>
          <li><a href="#about" className="hover:text-indigo-600 transition-colors">Protocol</a></li>
          <li><a href="#contact" className="hover:text-indigo-600 transition-colors">Support</a></li>
        </ul>

        <div className="text-xs font-mono text-slate-800 border border-slate-900/20 px-3 py-1 rounded bg-white/50">
          SYSTEM_v3.0.4_ACTIVE
        </div>
      </nav>

      {/* Main Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div className="mb-4 px-4 py-1 rounded-full border border-indigo-600/20 bg-indigo-600/10 text-indigo-700 text-[10px] font-black tracking-[0.3em] uppercase">
          Community Infrastructure Interface
        </div>

        {/* Title: Changed to CivicIssue and darkened */}
        <h1 className="text-7xl md:text-9xl font-syne font-extrabold mb-6 tracking-tighter glow-text leading-none">
          CivicIssue
        </h1>

        <p className="text-slate-700 text-lg md:text-xl max-w-2xl text-center mb-12 leading-relaxed font-medium">
          The next-generation <span className="text-indigo-800 font-bold">Citizen Response Protocol</span>.
          Bridging the gap between public reports and rapid administrative resolution.
        </p>

        {/* Dynamic Action Grid (Kept dark for high visibility) */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
          <a
            href="/user"
            className="flex-1 group relative overflow-hidden px-8 py-5 glass-card rounded-2xl text-white font-bold transition-all hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="relative flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-widest text-indigo-400 mb-1">Citizen Portal</span>
              <span className="text-lg">REPORT →</span>
            </div>
          </a>

          <a
            href="/admin"
            className="flex-1 group relative overflow-hidden px-8 py-5 glass-card rounded-2xl text-white font-bold transition-all hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="relative flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 mb-1">Admin Access</span>
              <span className="text-lg">CONTROL PANEL</span>
            </div>
          </a>
        </div>

        {/* Footer Stats Decor (Darkened for contrast) */}
        <div className="absolute bottom-12 flex gap-12 text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase font-bold">
          <div className="flex flex-col">
            <span className="text-slate-400">Response_Rate</span>
            <span className="text-slate-900">98.4%</span>
          </div>
          <div className="flex flex-col border-l border-slate-300 pl-12">
            <span className="text-slate-400">Active_Nodes</span>
            <span className="text-slate-900">1,240 Global</span>
          </div>
          <div className="flex flex-col border-l border-slate-300 pl-12">
            <span className="text-slate-400">Latency</span>
            <span className="text-slate-900">24ms</span>
          </div>
        </div>
      </main>
    </div>
  );
}