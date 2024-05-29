import { useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";

interface CircleProps {
  color?: string;
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
    }, [modelRef]);
  }

  return (
    <mesh ref={modelRef} position={position}>
      <torusGeometry args={[0.35, 0.1, 32, 32]} />
      <meshStandardMaterial
        color={"#b868c8"}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

export default Circle;
