"use client";
import { Canvas } from "@react-three/fiber";
import GameModel from "../GameModel";
import CameraOrbitController from "../CameraOrbitController";
import { Stars } from "@react-three/drei";

const Model3d = () => {
  return (
    <div className="min-h-[100%] relative flex flex-auto items-center justify-center w-[100%] md:h-[calc(100dvh-70px)]">
      <Canvas
        className="h-[500px] w-full aspect-square md:aspect-auto"
        camera={{
          position: [0, 5, 7.25],
          near: 0.3,
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
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <GameModel />
        <CameraOrbitController />
        <Stars saturation={0} count={400} speed={0.5} />
      </Canvas>
    </div>
  );
};

export default Model3d;
