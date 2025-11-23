import { useScroll, Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber"; // Added useThree
import { useRef } from "react";
import * as THREE from "three";

export const Experience = () => {
  const scroll = useScroll(); 
  const ref = useRef<THREE.Group>(null);
  
  // 1. GET VIEWPORT DIMENSIONS
  // This tells us how wide the visible 3D area is in "units"
  const { viewport } = useThree();
  
  // 2. DEFINE MOBILE BREAKPOINT
  // If viewport is narrower than 5 units, we consider it mobile
  const isMobile = viewport.width < 5;

  useFrame(() => {
    if (!ref.current) return;
    
    // --- TIMELINE ANIMATION ---
    const r1 = scroll.range(0.10, 0.15);
    const r2 = scroll.range(0.45, 0.15);
    const r3 = scroll.range(0.70, 0.15);

    // ROTATION LOGIC (Unchanged)
    const rotX = THREE.MathUtils.lerp(0, 0.2, r1);
    const rotY = THREE.MathUtils.lerp(0, Math.PI / 2, r1);
    
    const rotX2 = THREE.MathUtils.lerp(rotX, -0.2, r2);
    const rotY2 = THREE.MathUtils.lerp(rotY, Math.PI * 1.5, r2);

    const finalRotX = THREE.MathUtils.lerp(rotX2, 0, r3);
    const finalRotY = THREE.MathUtils.lerp(rotY2, Math.PI * 2, r3);

    ref.current.rotation.x = finalRotX;
    ref.current.rotation.y = finalRotY;


    // POSITION LOGIC (Responsive!)
    // On mobile, we move less (0.8) vs desktop (1.5) so it stays on screen
    const xDist = isMobile ? 0.8 : 1.5; 
    
    // 1. Move to Right
    const posX = THREE.MathUtils.lerp(0, xDist, r1);
    const posZ = THREE.MathUtils.lerp(0, -1, r1);

    // 2. Move to Left
    const posX2 = THREE.MathUtils.lerp(posX, -xDist, r2);
    const posZ2 = THREE.MathUtils.lerp(posZ, -1, r2);

    // 3. Move to Center
    const finalPosX = THREE.MathUtils.lerp(posX2, 0, r3);
    const finalPosZ = THREE.MathUtils.lerp(posZ2, 0, r3); 

    ref.current.position.x = finalPosX;
    ref.current.position.z = finalPosZ;

    ref.current.position.y = Math.sin(Date.now() / 2000) * 0.05;
  });

  // 3. RESPONSIVE SCALE
  // Reduce size from 1.0 to 0.6 on mobile so it doesn't crowd the text
  const meshScale = isMobile ? 0.6 : 1.0;

  return (
    <>
      <Environment preset="city" blur={1} />

      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-10, -10, 5]} intensity={5} color="#2997ff" />

      <group ref={ref}>
          {/* Apply the responsive scale here */}
          <group scale={[meshScale, meshScale, meshScale]}>
            <mesh>
                <icosahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial 
                    color="#101e35" 
                    roughness={0.15} 
                    metalness={1.0} 
                />
                <mesh>
                    <icosahedronGeometry args={[1.5, 0]} />
                    <meshBasicMaterial color="#40aaff" wireframe transparent opacity={0.15} />
                </mesh>
            </mesh>
          </group>
      </group>
    </>
  );
};