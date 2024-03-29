import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

interface CircleProps {
  opacity?: number;
  position: [number, number, number];
}

const Cross = ({opacity, position}: CircleProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.7;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Diagonal Arm 1 */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color={'#58b8a8'} transparent={true} opacity={opacity} depthWrite={false} />
      </mesh>

      {/* Diagonal Arm 2 */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color={'#58b8a8'} transparent={true} opacity={opacity} depthWrite={false} />
      </mesh>
    </group>
  );
};

export default Cross;
