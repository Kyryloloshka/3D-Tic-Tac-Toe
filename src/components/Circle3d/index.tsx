import { useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

interface CircleProps {
  color?: string;
  opacity?: number;
  position: [number, number, number];
  isRotating?: boolean;
}


const Circle: React.FC<CircleProps> = ({ opacity = 0.4, position, isRotating=true }) => {
  const glowPink = new THREE.MeshBasicMaterial({ 
    color: new THREE.Color(2, 0.4, 1), 
    toneMapped: false,
    transparent: true, 
    opacity: opacity,
  })
  const modelRef = useRef<THREE.Mesh>(null!);
  if (isRotating) {
    useFrame(({ clock }) => {
      if (modelRef.current) {
        modelRef.current.rotation.y = clock.elapsedTime * 0.6;
      }
    });
  } else {
    useEffect(() => {
      if (modelRef.current) {
        const randomRotationX = Math.random() * Math.PI * 2;
        const randomRotationY = Math.random() * Math.PI * 2;
        const randomRotationZ = Math.random() * Math.PI * 2;
        modelRef.current.rotation.x = randomRotationX;
        modelRef.current.rotation.y = randomRotationY;
        modelRef.current.rotation.z = randomRotationZ;
      }
    }, [modelRef])
  }
  
  return (
    <mesh ref={modelRef} material={glowPink} position={position}>
      <torusGeometry args={[0.35, 0.1, 32, 32]} />
    </mesh>
  );
};

export default Circle;