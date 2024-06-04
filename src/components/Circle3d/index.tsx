import { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

interface CircleProps {
  color?: string | null;
  opacity?: number;
  position: [number, number, number];
  isRotating?: boolean;
  isWinnerIndex?: boolean | undefined;
}



const Circle: React.FC<CircleProps> = ({
  opacity = 0.4,
  position,
  isRotating = true,
  isWinnerIndex,
}) => {
  const modelRef = useRef<THREE.Mesh>(null!);
  const [scale, setScale] = useState(1);
  const [currentColor, setCurrentColor] = useState("#b868c8");
  const targetColor = isWinnerIndex
    ? new THREE.Color("#e898f8")
    : new THREE.Color("#b868c8");

  useFrame(({ clock }) => {
    if (isRotating && modelRef.current) {
      modelRef.current.rotation.y = clock.elapsedTime * 0.6;
    }
    if (modelRef.current && modelRef.current.children) {
      (modelRef.current.material as THREE.MeshStandardMaterial).color.lerp(
        targetColor,
        0.01
      );
    }
  });

  useEffect(() => {
    if (modelRef.current && isWinnerIndex) {
      let animFrameId: number;
      const animScale = () => {
        setScale((prevScale) => Math.min(prevScale + 0.01, 1.1));
        animFrameId = requestAnimationFrame(animScale);
      };
      animScale();
      return () => cancelAnimationFrame(animFrameId);
    } else if (modelRef.current) {
      setScale(1);
    }
  }, [isWinnerIndex]);

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
    <mesh ref={modelRef} position={position} scale={[scale, scale, scale]}>
      <torusGeometry args={[0.35, 0.1, 32, 32]} />
      <meshStandardMaterial
        color={currentColor}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

export default Circle;
