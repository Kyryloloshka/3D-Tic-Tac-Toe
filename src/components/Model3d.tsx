"use client";
import { Canvas, useThree } from '@react-three/fiber';
import GameModel from './GameModel';
import CameraOrbitController from './CameraOrbitController';

const Model3d = () => {
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
        <GameModel/>
        <CameraOrbitController
        />
      </Canvas>
    </div>

  );
};

export default Model3d;
