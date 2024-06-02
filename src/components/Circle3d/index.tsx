import { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

interface CircleProps {
  color?: string | null;
  opacity?: number;
  position: [number, number, number];
  isRotating?: boolean;
}

const Circle: React.FC<CircleProps> = ({
  opacity = 0.4,
  position,
  isRotating = true,
}) => {
  const modelRef = useRef<THREE.Mesh>(null!);
  const color = "#b868c8";
  useFrame(({ clock }) => {
    if (isRotating && modelRef.current) {
      modelRef.current.rotation.y = clock.elapsedTime * 0.6;
    }
  });

  useEffect(() => {
    if (!isRotating && modelRef.current) {
      const randomRotationX = Math.random() * Math.PI * 2;
      const randomRotationY = Math.random() * Math.PI * 2;
      const randomRotationZ = Math.random() * Math.PI * 2;
      modelRef.current.rotation.x = randomRotationX;
      modelRef.current.rotation.y = randomRotationY;
      modelRef.current.rotation.z = randomRotationZ;
    }
  }, [isRotating]);

  return (
    <mesh ref={modelRef} position={position}>
      <torusGeometry args={[0.35, 0.1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

export default Circle;
