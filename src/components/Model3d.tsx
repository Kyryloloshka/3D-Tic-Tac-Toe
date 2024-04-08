"use client";
import * as THREE from 'three';
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import Cross from './Cross';
import Circle from './Circle';
import Box from './Box';
import { useStateSelector } from '@/state/hooks';
import { Player } from '@/types';

const distanceBetweenCubes = 1.3;

const TicTacToeGame = () => {
  const gameState = useStateSelector((state) => state.game.gameState);
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const hoveredIndex = useStateSelector((state) => state.game.hoveredIndex);
  const isCenterAvailable = useStateSelector((state) => state.game.isCenterAvailable);

  const CubeModel = () => {
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
                  : index == hoveredIndex || !isCenterAvailable && index == 13
                    ? 0.4 
                    : 0.1
              const position: [number, number, number] = [
                col * distanceBetweenCubes - distanceBetweenCubes, 
                row * distanceBetweenCubes - distanceBetweenCubes, 
                z * distanceBetweenCubes - distanceBetweenCubes
              ];
              return (
                <>
                  {elem === Player.X
                    || index === hoveredIndex 
                    && (isXNext && gameState[hoveredIndex] === null) 
                  ? <Cross
                    opacity={opacity}
                    position={position}
                  />  
                  : elem === Player.O || index === hoveredIndex  
                    ? <Circle
                      opacity={opacity} 
                      position={position}/> 
                    : <Box 
                      opacity={opacity} 
                      position={position}
                      color={index === 13 && !isCenterAvailable ? "#000" : "#555"}
                      />
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
      <Canvas 
        style={{
          objectPosition: "center",
          objectFit: "contain", 
          aspectRatio: "1/1", 
          maxWidth: "700px", 
          minHeight: "100%", 
          overflow: "visible"
        }} 
        camera={{
          position: [0, 4, 5.25], 
          near: 0.3 
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight 
          position={[10, 10, 10]}
          angle={0.15} 
          penumbra={1} 
          decay={0} 
          intensity={Math.PI} 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          decay={0} 
          intensity={Math.PI} 
        />
        <CubeModel/>
        <OrbitControls 
          enablePan={false}
          enableDamping={true}
          autoRotate={true}
          autoRotateSpeed={0.6}
          maxZoom={15} 
          minZoom={5} 
          maxDistance={15} 
          minDistance={5}  
        />
      </Canvas>
    </div>

  );
};

export default TicTacToeGame;
