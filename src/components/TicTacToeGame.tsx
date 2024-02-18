"use client";
import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'

interface TicTacToeGameProps {
  gameState: string[];
}
type ExtendedMeshProps = ThreeElements['mesh'] & {
  color?: string;
};

const TicTacToeGame = ({gameState} : TicTacToeGameProps) => {
  const [classes, setClasses] = useState(false);
  const Box = (props: ExtendedMeshProps) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    return (
      <mesh
        {...props}
        ref={meshRef}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={props.color} transparent={true}
        opacity={0.4} />
      </mesh>
    );
  }
  const CubeGroup = () => {
    const groupRef = useRef<THREE.Group>(null!)

    return (
      <group ref={groupRef} onPointerMove={(e) => console.log("move")}>
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => 
            Array.from({length: 3}, (_, z) => {
              const color = gameState[z*3+ Math.abs(row-2)*9 + col] == "X" ? "purple" : gameState[z*3 + Math.abs(row-2)*9 + col] == "O" ? "red" : "#555"
              return (
            <Box color={color} key={`${row}-${col}-${z}`} position={[col*1.3 - 1.3, row*1.3 - 1.3, z*1.3 - 1.3]}/>
          )}))
        )}
      </group>
    );
  }
  return (
    <div className="h-[100%] flex flex-auto items-center my-auto justify-center w-[100%] pb-24" >
      <Canvas onMouseDown={() => setClasses(true)} onMouseUp={() => setClasses(false)} style={{ cursor: classes ? "grabbing" : "grab", objectPosition: "center", objectFit: "contain", aspectRatio: "1/1", maxWidth: "700px", minHeight: "100%", overflow: "visible"}} camera={{ position: [0, 4, 5.25], near: 0.3 }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <CubeGroup/>
        <OrbitControls />
      </Canvas>
    </div>

  );
};

export default TicTacToeGame;
