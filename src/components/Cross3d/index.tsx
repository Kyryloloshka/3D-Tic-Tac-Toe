import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

interface CircleProps {
  opacity?: number;
  position: [number, number, number];
  isRotating?: boolean;
  depthWrite?: boolean;
  isWinnerIndex?: boolean | undefined;
}

const Cross = ({
  opacity,
  position,
  isRotating = true,
  depthWrite = false,
  isWinnerIndex,
}: CircleProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [scale, setScale] = useState(1);
  const [currentColor, setCurrentColor] = useState("#58b8a8");
  const targetColor = isWinnerIndex
    ? new THREE.Color("#88e8d8")
    : new THREE.Color("#58b8a8");
  if (isRotating) {
    useFrame(({ clock }) => {
      if (groupRef.current) {
        groupRef.current.rotation.y = clock.elapsedTime * 0.7;
      }
    });
    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.children.forEach((child) => {
          if ((child as THREE.Mesh).material) {
            (
              (child as THREE.Mesh).material as THREE.MeshStandardMaterial
            ).color.lerp(targetColor, 0.01);
          }
        });
      }
    });
    useEffect(() => {
      if (groupRef.current && isWinnerIndex) {
        let animFrameId: number;
        const animScale = () => {
          setScale((prevScale) => Math.min(prevScale + 0.01, 1.1));
          animFrameId = requestAnimationFrame(animScale);
        };
        animScale();
        return () => cancelAnimationFrame(animFrameId);
      } else if (groupRef.current) {
        setScale(1);
      }
    }, [isWinnerIndex]);
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
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Diagonal Arm 1 */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial
          color={currentColor}
          transparent={true}
          opacity={opacity}
          depthWrite={depthWrite}
        />
      </mesh>
      {/* Diagonal Arm 2 */}
      <mesh position={[0, 0, -0.0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial
          color={currentColor}
          transparent={true}
          opacity={opacity}
          depthWrite={depthWrite}
        />
      </mesh>
    </group>
  );
};

export default Cross;
