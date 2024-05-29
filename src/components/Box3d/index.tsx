import { useRef, useState } from "react";
import { ThreeElements } from "react-three-fiber";
import * as THREE from "three";

type ExtendedMeshProps = ThreeElements["mesh"] & {
  color?: string;
  opacity?: number;
};

const Box = (props: ExtendedMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);
  return (
    <mesh {...props} ref={meshRef} onClick={() => setActive(!active)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={props.color}
        transparent={true}
        opacity={props.opacity ? props.opacity : 0.4}
      />
    </mesh>
  );
};
export default Box;
