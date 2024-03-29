import { useRef } from "react";
import { useFrame } from "react-three-fiber";

interface CircleProps {
  color?: string;
  opacity?: number;
  position: [number, number, number];
}

const Circle: React.FC<CircleProps> = ({ opacity = 0.4, position }) => {
  const torusRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.y = clock.elapsedTime * 0.6; // Оновлення обертання на основі часу
    }
  });

  return (
    <mesh ref={torusRef} position={position} onClick={() => console.log('Circle clicked')}>
      <torusGeometry args={[0.35, 0.1, 32, 32]} />
      <meshStandardMaterial color={"#b868c8"} transparent={true} opacity={opacity} />
    </mesh>
  );
};

export default Circle;