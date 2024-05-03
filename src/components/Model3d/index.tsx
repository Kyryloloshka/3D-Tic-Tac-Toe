"use client";
import { Canvas } from '@react-three/fiber';
import GameModel from '../GameModel';
import CameraOrbitController from '../CameraOrbitController';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Stars } from '@react-three/drei';

const Model3d = () => {
  return (
    <div className="min-h-[100%] relative flex flex-auto items-center justify-center w-[100%]" >
      <Canvas 
        className='h-[500px] w-full aspect-square md:aspect-[16/9]'
        camera={{
          position: [0, 5, 7.25], 
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
        <CameraOrbitController/>
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        <Stars saturation={0} count={400} speed={0.5} />
      </Canvas>
    </div>

  );
};

export default Model3d;
