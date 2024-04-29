import { useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";

interface CircleProps {
  color?: string;
  opacity?: number;
  position: [number, number, number];
  isRotating?: boolean;
}

const Circle: React.FC<CircleProps> = ({ opacity = 0.4, position, isRotating=true }) => {
  const torusRef = useRef<THREE.Mesh>(null!);
  if (isRotating) {
    useFrame(({ clock }) => {
      if (torusRef.current) {
        torusRef.current.rotation.y = clock.elapsedTime * 0.6;
      }
    });
  } else {
    useEffect(() => {
      if (torusRef.current) {
        const randomRotationX = Math.random() * Math.PI * 2;
        const randomRotationY = Math.random() * Math.PI * 2;
        const randomRotationZ = Math.random() * Math.PI * 2;
        torusRef.current.rotation.x = randomRotationX;
        torusRef.current.rotation.y = randomRotationY;
        torusRef.current.rotation.z = randomRotationZ;
      }
    }, [torusRef])
  }
  
  return (
    <mesh ref={torusRef} position={position}>
      <torusGeometry args={[0.35, 0.1, 32, 32]} />
      <meshStandardMaterial color={"#b868c8"} transparent={true} opacity={opacity} />
    </mesh>
  );
};

export default Circle;