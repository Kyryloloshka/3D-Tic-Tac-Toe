"use client"
import { Canvas, useFrame } from 'react-three-fiber';
import Circle from '../Circle3d';
import Cross from '../Cross3d';
import { BakeShadows, Environment, Lightformer } from '@react-three/drei'
import { easing } from 'maath'
import Effects from '@/components/BgProvider/Effects'

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5], 0.5, delta)
    state.camera.lookAt(0, 0, -5)
  })
  return null
}

const BgProvider = () => {
  const positionsCrosses = [
    [-5, 3, -2],
    [-1, 3.5, -4],
    [-5, -1, -6],
    [3, 4, -8],
    [-2, -1.2, -9],
    [2, -4, -10],
    [3, -0.5, -11],
    [6, -3.5, -6],
    [6.3, 2, -5],
    [5, 3, -2],
    [9, 3.5, -4],
    [5, -1, -6],
    [13, 4, -8],
    [8, -1.2, -9],
    [12, -4, -10],
    [13, -0.5, -11],
    [16, -3.5, -6],
    [16.3, 2, -5],
    [-15, 3, -2],
    [-11, 3.5, -4],
    [-15, -1, -6],
    [-7, 4, -8],
    [-12, -1.2, -9],
    [-8, -4, -10],
    [-7, -0.5, -11],
    [-4, -3.5, -6],
    [-16.3, 2, -5],
  ]
  const positionsCircles = [
    [-2.8, 1.5, -7],
    [5, -2.9, -8],
    [1, 2.1, -10],
    [1.2, -4.3, -11],
    [-6, -5, -11],
    [4, 3, -3],
    [-2.2, -2.5, -7],
    [-4, 3, -5],
    [6, 0, -7],
    [-5, -3.1, -3],
    [-12.8, 1.5, -7],
    [-5, -2.9, -8],
    [-9, 2.1, -10],
    [-8.8, -4.3, -11],
    [-16, -5, -11],
    [-6, 3, -3],
    [-12.2, -2.5, -7],
    [-14, 3, -5],
    [-4, 0, -7],
    [-15, -3.1, -3],
    [7.2, 1.5, -7],
    [15, -2.9, -8],
    [11, 2.1, -10],
    [11.2, -4.3, -11],
    [4, -5, -11],
    [14, 3, -3],
    [-7.8, -2.5, -7],
    [6, 3, -5],
    [16, 0, -7],
    [5, -3.1, -3],
  ]
  return (
    <div className='absolute overflow-hidden h-full w-full top-0 left-0 z-10 opacity-50'>
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
        {positionsCrosses.map((position, index) => (
          <Cross key={index} position={position as [number, number, number]} opacity={1} isRotating={false} />
        ))}
        {positionsCircles.map((position, index) => (
          <Circle key={index} position={position as [number, number, number]} opacity={1} isRotating={false} />
        ))}
        <CameraRig />
        <BakeShadows />
      </Canvas>
      }
    </div>
  )
}

export default BgProvider