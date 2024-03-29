"use client";
import * as THREE from 'three';
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import Cross from './Cross';
import Circle from './Circle';
import Box from './Box';


interface TicTacToeGameProps {
  gameState: string[];
  hoveredIndex: number | null;
  isXNext: boolean;
}

const TicTacToeGame = ({gameState, hoveredIndex, isXNext} : TicTacToeGameProps) => {
  
  const CubeGroup = () => {
    const groupRef = useRef<THREE.Group>(null!)

    return (
      <group ref={groupRef}>
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => 
            Array.from({length: 3}, (_, z) => {
              const index = z*3+ Math.abs(row-2)*9 + col
              const elem = gameState[index]
              const opacity = elem != null
                ? 0.85
                  : index == hoveredIndex 
                    ? 0.4 
                    : 0.1
              const position: [number, number, number] = [col * 1.3 - 1.3, row * 1.3 - 1.3, z * 1.3 - 1.3];
              return (
                <>
                  {elem == "X" || index == hoveredIndex && isXNext && gameState[hoveredIndex] == null ?
                    <Cross
                    opacity={opacity}
                    key={`${row}-${col}-${z}`}
                    position={position}
                  />  : elem == "O" || index == hoveredIndex  ?
                  <Circle
                    opacity={opacity} 
                    key={`${row}-${col}-${z}`}
                    position={position}/> :
                  <Box 
                    opacity={opacity} 
                    key={`${row}-${col}-${z}`}
                    position={position}/>
                  }
                </>
                  
              )
            })
          )
        )}
      </group>
    );
  }
  return (
    <div className="h-[100%] flex flex-auto items-center my-auto justify-center w-[100%] pb-24" >
      <Canvas style={{objectPosition: "center", objectFit: "contain", aspectRatio: "1/1", maxWidth: "700px", minHeight: "100%", overflow: "visible"}} camera={{ position: [0, 4, 5.25], near: 0.3 }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <CubeGroup/>
        <OrbitControls 
          enablePan={false}
          enableDamping={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxZoom={15} 
          minZoom={5} 
          maxDistance={15} 
          minDistance={5}  />
      </Canvas>
    </div>

  );
};

export default TicTacToeGame;
