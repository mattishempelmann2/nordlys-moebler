import { useScroll, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const Experience = () => {
  const scroll = useScroll(); 
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    
    // --- TIMELINE ANIMATION ---
    const r1 = scroll.range(0.10, 0.15);
    const r2 = scroll.range(0.45, 0.15);
    const r3 = scroll.range(0.70, 0.15);

    // ROTATION LOGIC
    const rotX = THREE.MathUtils.lerp(0, 0.2, r1);
    const rotY = THREE.MathUtils.lerp(0, Math.PI / 2, r1);
    
    const rotX2 = THREE.MathUtils.lerp(rotX, -0.2, r2);
    const rotY2 = THREE.MathUtils.lerp(rotY, Math.PI * 1.5, r2);

    const finalRotX = THREE.MathUtils.lerp(rotX2, 0, r3);
    const finalRotY = THREE.MathUtils.lerp(rotY2, Math.PI * 2, r3);

    ref.current.rotation.x = finalRotX;
    ref.current.rotation.y = finalRotY;

    // POSITION LOGIC
    const posX = THREE.MathUtils.lerp(0, 1.5, r1);
    const posZ = THREE.MathUtils.lerp(0, -1, r1);

    const posX2 = THREE.MathUtils.lerp(posX, -1.5, r2);
    const posZ2 = THREE.MathUtils.lerp(posZ, -1, r2);

    const finalPosX = THREE.MathUtils.lerp(posX2, 0, r3);
    const finalPosZ = THREE.MathUtils.lerp(posZ2, 0, r3); 

    ref.current.position.x = finalPosX;
    ref.current.position.z = finalPosZ;

    ref.current.position.y = Math.sin(Date.now() / 2000) * 0.05;
  });

  return (
    <>
      {/* FIXED: Removed 'intensity' prop to solve TypeScript error.
        'blur={1}' keeps the soft studio look.
      */}
      <Environment preset="city" blur={1} />

      {/* LIGHTING ADJUSTMENTS (Compensating for Environment intensity) */}
      
      {/* 1. Ambient: Increased to 0.5 to keep shadows soft */}
      <ambientLight intensity={0.5} color="#ffffff" />
      
      {/* 2. Key Light: Increased to 1.0 to ensure top highlights are visible */}
      <directionalLight position={[10, 10, 5]} intensity={1.0} color="#ffffff" />
      
      {/* 3. Rim Light: Kept strong for the blue edge */}
      <pointLight position={[-10, -10, 5]} intensity={5} color="#2997ff" />

      <group ref={ref}>
          {/* GEOMETRY: Low Poly Titanium Sphere */}
          <mesh>
              <icosahedronGeometry args={[1.5, 0]} />
              <meshStandardMaterial 
                  color="#101e35" // Dark Navy
                  roughness={0.15} // Sharp reflections
                  metalness={1.0}  // 100% Metal
              />
              {/* Subtle Wireframe for tech feel */}
              <mesh>
                  <icosahedronGeometry args={[1.5, 0]} />
                  <meshBasicMaterial color="#40aaff" wireframe transparent opacity={0.15} />
              </mesh>
          </mesh>
      </group>
    </>
  );
};