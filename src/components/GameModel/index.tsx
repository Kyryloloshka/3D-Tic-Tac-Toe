import { useStateSelector } from "@/state";
import { GameDisplay, Player } from "@/types";
import React, { useRef } from "react";
import Cross from "../Cross3d";
import Box from "../Box3d";
import Circle from "../Circle3d";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import PlanesGameBoard from "./PlanesGameBoard";

const GameModel = () => {
  const groupRef = useRef<THREE.Group>(null!)
  const pathname = usePathname();
  
  const gameState = pathname?.replace(/^\/[a-z]{2}/, '') === "/replay" 
    ? useStateSelector((state) => state.replay.gameHistory[state.replay.currentMoveIndex]) 
    : useStateSelector((state) => state.game.gameState);
  
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const hoveredIndex = useStateSelector((state) => state.game.hoveredIndex);
  const isCenterAvailable = useStateSelector((state) => state.game.isCenterAvailable);
  const displayGameAs = useStateSelector((state) => state.game.displayGameAs);
  const distanceBetweenCubes = 1.3;

  return (
    <group ref={groupRef} dispose={null}>
      {displayGameAs === GameDisplay.Planes && <PlanesGameBoard distanceBetweenCubes={distanceBetweenCubes} />}
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) =>
          Array.from({ length: 3 }, (_, z) => {
            const index = z * 3 + Math.abs(row - 2) * 9 + col;
            const elem = gameState[index];
            const opacity = elem != null
              ? 0.85
              : index == hoveredIndex || !isCenterAvailable && index == 13
                ? 0.4
                : 0.15;
            const position: [number, number, number] = [
              col * distanceBetweenCubes - distanceBetweenCubes,
              row * distanceBetweenCubes - distanceBetweenCubes,
              z * distanceBetweenCubes - distanceBetweenCubes
            ];
            return (
              <React.Fragment key={`cube-${row}-${col}-${z}`}>
                {elem === Player.X || (index === hoveredIndex && isXNext && gameState[hoveredIndex] === null)
                  ? <Cross
                      key={`cross-${row}-${col}-${z}`}
                      opacity={opacity}
                      position={position}
                    />
                  : (elem === Player.O || index === hoveredIndex && !isXNext && gameState[hoveredIndex] === null) 
                    ? <Circle
                      key={`circle-${row}-${col}-${z}`}
                      opacity={opacity}
                      position={position}
                    /> 
                    : (displayGameAs === GameDisplay.Cubes) 
                      ? <Box
                        key={`box-${row}-${col}-${z}`}
                        opacity={opacity}
                        position={position}
                        color={index === 13 && !isCenterAvailable ? "#000" : "#555"}
                      /> 
                      : null
                }
              </React.Fragment>
            );
          })
        )
      )}
    </group>
  );
}

export default GameModel