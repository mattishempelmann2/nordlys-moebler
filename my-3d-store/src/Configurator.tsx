import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import { useState } from "react";

export const Configurator = ({ onBack }: { onBack: () => void }) => {
  const [color, setColor] = useState("#2997ff"); 
  const [colorName, setColorName] = useState("Nordic Blue"); 

  // Load the model (Reusing the same chair)
  const { scene } = useGLTF('/chair.glb');

  // Logic to change color on the first material found
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.color.set(color);
    }
  });

  const handleColorChange = (newColor: string, name: string) => {
    setColor(newColor);
    setColorName(name);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f5f5f7", display: "flex", flexDirection: "column" }}>
      
      {/* 3D View */}
      <div style={{ width: "100%", height: "60%", position: "relative" }}>
        <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]}>
           <OrbitControls makeDefault />
           <Stage environment="city" intensity={0.6}>
             <primitive object={scene} />
           </Stage>
        </Canvas>
      </div>

      {/* UI Controls */}
      <div style={{ padding: "40px", background: "white", height: "40%", borderRadius: "30px 30px 0 0", boxShadow: "0 -10px 40px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
        <button onClick={onBack} style={{ marginBottom: "20px", cursor: "pointer", border:"none", background:"transparent", fontWeight:"bold", alignSelf: "flex-start" }}>← Back to Home</button>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
                <h1 style={{ color: "black", fontSize: "2rem", margin: "0 0 5px 0" }}>Modern Chair</h1>
                <p style={{ color: "gray", margin: 0 }}>Selected: <strong>{colorName}</strong></p>
            </div>
            <h2 style={{ color: "black", fontSize: "1.5rem", margin: 0 }}>$499.00</h2>
        </div>
        
        <h3 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#333" }}>Choose Fabric</h3>
        <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
          {/* Color Buttons */}
          <button onClick={() => handleColorChange("#2997ff", "Nordic Blue")} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#2997ff", border: color === "#2997ff" ? "3px solid black" : "2px solid white", boxShadow: "0 0 0 2px #ccc", cursor: "pointer" }} aria-label="Nordic Blue" />
          <button onClick={() => handleColorChange("#ff5e5e", "Sunset Red")} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ff5e5e", border: color === "#ff5e5e" ? "3px solid black" : "2px solid white", boxShadow: "0 0 0 2px #ccc", cursor: "pointer" }} aria-label="Sunset Red" />
          <button onClick={() => handleColorChange("#333333", "Midnight Grey")} style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#333333", border: color === "#333333" ? "3px solid black" : "2px solid white", boxShadow: "0 0 0 2px #ccc", cursor: "pointer" }} aria-label="Midnight Grey" />
        </div>

        {/* SNIPCART ADD TO CART BUTTON */}
        <button
            className="snipcart-add-item"
            data-item-id="modern-chair-custom"
            data-item-price="499.00"
            data-item-url="/"
            data-item-description="Custom configured modern chair"
            data-item-image="https://via.placeholder.com/150"
            data-item-name="Modern Chair"
            data-item-custom1-name="Fabric Color"
            data-item-custom1-value={colorName} // Passes the React State to the Cart
            style={{ 
                marginTop: "auto",
                width: "100%", 
                padding: "16px", 
                background: "black", 
                color: "white", 
                border: "none", 
                borderRadius: "12px", 
                fontSize: "1.1rem", 
                fontWeight: "600", 
                cursor: "pointer",
                transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
            Add to Cart - $499.00
        </button>

      </div>
    </div>
  );
};