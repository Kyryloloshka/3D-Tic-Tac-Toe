"use client"
import { Canvas, useFrame } from 'react-three-fiber';
import Circle from '../Circle3d';
import Cross from '../Cross3d';
import { BakeShadows, Environment, Lightformer } from '@react-three/drei'
import { easing } from 'maath'
import dynamic from 'next/dynamic';

const Effects = dynamic(
  () => import('@/components/BgProvider/Effects'),
  { ssr: false}
);

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5], 0.5, delta)
    state.camera.lookAt(0, 0, -5)
  })
  return null
}

const BgProvider = () => {
  return (
    <div className='absolute overflow-hidden h-full w-full top-0 left-0 z-10 opacity-50 bg-dark-1'>
    {Effects &&
      <Canvas 
        style={{
          minHeight: "1000px",
          overflow: "hidden",
          objectFit: "cover",
        }} 
        shadows dpr={[1, 1.5]}
        camera={{ position: [-1.5, 1, 1.5], fov: 45, near: 1, far: 40 }} eventPrefix="client"
      >
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
            <Lightformer form="ring" color="#4060ff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
          </group>
        </Environment>
        <Effects />
        <Cross depthWrite={true} position={[-5, 3, -2]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-1, 3.5, -4]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-5, -1, -6]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[3, 4, -8]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-2, -1.2, -9]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[2, -4, -10]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[3, -0.5, -11]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[6, -3.5, -6]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[6.3, 2, -5]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[5, 3, -2]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[9, 3.5, -4]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[5, -1, -6]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[13, 4, -8]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[8, -1.2, -9]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[12, -4, -10]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[13, -0.5, -11]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[16, -3.5, -6]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[16.3, 2, -5]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-15, 3, -2]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-11, 3.5, -4]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-15, -1, -6]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-7, 4, -8]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-12, -1.2, -9]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-8, -4, -10]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-7, -0.5, -11]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-4, -3.5, -6]} opacity={1} isRotating={false} />
        <Cross depthWrite={true} position={[-16.3, 2, -5]} opacity={1} isRotating={false} />
        <Circle position={[-2.8, 1.5, -7]} opacity={1} isRotating={false} />
        <Circle position={[5, -2.9, -8]} opacity={1} isRotating={false} />
        <Circle position={[1, 2.1, -10]} opacity={1} isRotating={false} />
        <Circle position={[1.2, -4.3, -11]} opacity={1} isRotating={false} />
        <Circle position={[-6, -5, -11]} opacity={1} isRotating={false} />
        <Circle position={[4, 3, -3]} opacity={1} isRotating={false} />
        <Circle position={[-2.2, -2.5, -7]} opacity={1} isRotating={false} />
        <Circle position={[-4, 3, -5]} opacity={1} isRotating={false} />
        <Circle position={[6, 0, -7]} opacity={1} isRotating={false} />
        <Circle position={[-5, -3.1, -3]} opacity={1} isRotating={false} />
        <Circle position={[-12.8, 1.5, -7]} opacity={1} isRotating={false} />
        <Circle position={[-5, -2.9, -8]} opacity={1} isRotating={false} />
        <Circle position={[-9, 2.1, -10]} opacity={1} isRotating={false} />
        <Circle position={[-8.8, -4.3, -11]} opacity={1} isRotating={false} />
        <Circle position={[-16, -5, -11]} opacity={1} isRotating={false} />
        <Circle position={[-6, 3, -3]} opacity={1} isRotating={false} />
        <Circle position={[-12.2, -2.5, -7]} opacity={1} isRotating={false} />
        <Circle position={[-14, 3, -5]} opacity={1} isRotating={false} />
        <Circle position={[-4, 0, -7]} opacity={1} isRotating={false} />
        <Circle position={[-15, -3.1, -3]} opacity={1} isRotating={false} />
        <Circle position={[7.2, 1.5, -7]} opacity={1} isRotating={false} />
        <Circle position={[15, -2.9, -8]} opacity={1} isRotating={false} />
        <Circle position={[11, 2.1, -10]} opacity={1} isRotating={false} />
        <Circle position={[11.2, -4.3, -11]} opacity={1} isRotating={false} />
        <Circle position={[4, -5, -11]} opacity={1} isRotating={false} />
        <Circle position={[14, 3, -3]} opacity={1} isRotating={false} />
        <Circle position={[-7.8, -2.5, -7]} opacity={1} isRotating={false} />
        <Circle position={[6, 3, -5]} opacity={1} isRotating={false} />
        <Circle position={[16, 0, -7]} opacity={1} isRotating={false} />
        <Circle position={[5, -3.1, -3]} opacity={1} isRotating={false} />
        <CameraRig />
        <BakeShadows />
      </Canvas>
      }
    </div>
  )
}

export default BgProvider