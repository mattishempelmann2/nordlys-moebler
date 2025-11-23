import { useScroll, Environment, useGLTF } from "@react-three/drei"; // Added useGLTF
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";

export const Experience = () => {
  const scroll = useScroll(); 
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // 1. LOAD YOUR MODEL
  // Make sure 'chair.glb' is inside the /public folder!
  const { scene } = useGLTF('/chair.glb');

  // Optional: Pre-center the model if it's off-center in Blender
  useLayoutEffect(() => {
    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // Offset the scene so its center is at (0,0,0)
    scene.position.x += (scene.position.x - center.x);
    scene.position.y += (scene.position.y - center.y);
    scene.position.z += (scene.position.z - center.z);
  }, [scene]);

  useFrame(() => {
    if (!ref.current) return;
    
    // --- TIMELINE ANIMATION (Unchanged) ---
    const r1 = scroll.range(0.10, 0.15);
    const r2 = scroll.range(0.45, 0.15);
    const r3 = scroll.range(0.70, 0.15);

    // ROTATION
    const rotX = THREE.MathUtils.lerp(0, 0.2, r1);
    const rotY = THREE.MathUtils.lerp(0, Math.PI / 2, r1);
    const rotX2 = THREE.MathUtils.lerp(rotX, -0.2, r2);
    const rotY2 = THREE.MathUtils.lerp(rotY, Math.PI * 1.5, r2);
    const finalRotX = THREE.MathUtils.lerp(rotX2, 0, r3);
    const finalRotY = THREE.MathUtils.lerp(rotY2, Math.PI * 2, r3);

    ref.current.rotation.x = finalRotX;
    ref.current.rotation.y = finalRotY;

    // POSITION
    const xDist = isMobile ? 0.8 : 1.5;
    const posX = THREE.MathUtils.lerp(0, xDist, r1);
    const posZ = THREE.MathUtils.lerp(0, -1, r1);
    const posX2 = THREE.MathUtils.lerp(posX, -xDist, r2);
    const posZ2 = THREE.MathUtils.lerp(posZ, -1, r2);
    const finalPosX = THREE.MathUtils.lerp(posX2, 0, r3);
    const finalPosZ = THREE.MathUtils.lerp(posZ2, 0, r3); 

    ref.current.position.x = finalPosX;
    ref.current.position.z = finalPosZ;
    ref.current.position.y = Math.sin(Date.now() / 2000) * 0.05;
  });

  // Responsive Scale
  // Adjust '1.5' depending on how big your model was exported
  const meshScale = isMobile ? 4.0 : 8.0;

  return (
    <>
      <Environment preset="city" blur={1} />
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={1.0} color="#ffffff" />
      <pointLight position={[-10, -10, 5]} intensity={5} color="#2997ff" />

      <group ref={ref}>
          {/* 2. RENDER THE MODEL */}
          <group scale={[meshScale, meshScale, meshScale]}>
             <primitive object={scene} />
          </group>
      </group>
    </>
  );
};