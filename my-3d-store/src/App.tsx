import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Experience } from "./Experience";
import { Overlay } from "./Overlay";
import { Configurator } from "./Configurator";
import { useState } from "react";
// 1. Correct Import
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [view, setView] = useState("home");

  return (
    <>
      {/* 2. Added Component here so it tracks both views */}
      <SpeedInsights />

      {view === "configurator" ? (
        <Configurator onBack={() => setView("home")} />
      ) : (
        <div className="h-screen w-full bg-black overflow-hidden relative font-sans selection:bg-blue-500 selection:text-white">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 40 }} 
            dpr={[1, 2]} 
          >
            <color attach="background" args={["#000000"]} />
            
            {/* FIX: Reduced damping from 0.2 to 0.1 for snappier response */}
            <ScrollControls pages={4} damping={0.1}>
              <Experience />
              <Overlay />
            </ScrollControls>
          </Canvas>
          
          <div style={{ 
            position: 'absolute', 
            bottom: '40px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 999,
            pointerEvents: 'none'
          }}>
            <button 
              onClick={() => setView("configurator")}
              className="pointer-events-auto px-8 py-3 rounded-full font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(10px)',            
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <span>Customize This Product</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;