import React, { useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

interface CircleProps {
  opacity?: number;
  position: [number, number, number];
  isRotating?: boolean;
  depthWrite?: boolean;
}

const Cross = ({
  opacity,
  position,
  isRotating = true,
  depthWrite = false,
}: CircleProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  if (isRotating) {
    useFrame(({ clock }) => {
      if (groupRef.current) {
        groupRef.current.rotation.y = clock.elapsedTime * 0.7;
      }
    });
  } else {
    useEffect(() => {
      if (groupRef.current) {
        const randomRotationX = Math.random() * Math.PI * 2;
        const randomRotationY = Math.random() * Math.PI * 2;
        const randomRotationZ = Math.random() * Math.PI * 2;

        groupRef.current.rotation.x = randomRotationX;
        groupRef.current.rotation.y = randomRotationY;
        groupRef.current.rotation.z = randomRotationZ;
      }
    }, [groupRef]);
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Diagonal Arm 1 */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial
          color={"#58b8a8"}
          transparent={true}
          opacity={opacity}
          depthWrite={depthWrite}
        />
      </mesh>
      {/* Diagonal Arm 2 */}
      <mesh position={[0, 0, -0.0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial
          color={"#58b8a8"}
          transparent={true}
          opacity={opacity}
          depthWrite={depthWrite}
        />
      </mesh>
    </group>
  );
};

export default Cross;
