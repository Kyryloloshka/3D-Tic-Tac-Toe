import { Plane } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

const PlanesGameBoard = ({
  distanceBetweenCubes,
}: {
  distanceBetweenCubes: number;
}) => {
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "#555",
    opacity: 0.15,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  return (
    <>
      <Plane
        material={planeMaterial}
        args={[distanceBetweenCubes * 3 + 0.2, distanceBetweenCubes * 3 + 0.2]}
        rotation={[0, Math.PI / 2, 0]}
        position={[distanceBetweenCubes / 2, 0, 0]}
      />
      <Plane
        material={planeMaterial}
        args={[distanceBetweenCubes * 3 + 0.2, distanceBetweenCubes * 3 + 0.2]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-distanceBetweenCubes / 2, 0, 0]}
      />
      <Plane
        material={planeMaterial}
        args={[distanceBetweenCubes * 3 + 0.2, distanceBetweenCubes * 3 + 0.2]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, distanceBetweenCubes / 2, 0]}
      />
      <Plane
        material={planeMaterial}
        args={[distanceBetweenCubes * 3 + 0.2, distanceBetweenCubes * 3 + 0.2]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -distanceBetweenCubes / 2, 0]}
      />
      <Plane
        material={planeMaterial}
        args={[distanceBetweenCubes * 3 + 0.2, distanceBetweenCubes * 3 + 0.2]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, 0, distanceBetweenCubes / 2]}
      />
      <Plane
        material={planeMaterial}
        args={[distanceBetweenCubes * 3 + 0.2, distanceBetweenCubes * 3 + 0.2]}
        rotation={[0, 0, Math.PI / 2]}
        position={[0, 0, -distanceBetweenCubes / 2]}
      />
    </>
  );
};

export default PlanesGameBoard;
