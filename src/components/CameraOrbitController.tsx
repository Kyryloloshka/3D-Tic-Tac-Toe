import { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CameraOrbitController = () => {
  const { camera, gl } = useThree();
  const controls = useRef<any>(null);
  const prevTime = useRef(performance.now());

  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    const { current: ctrl} = controls;
    if (!ctrl) return;
    ctrl.enablePan = false;
    ctrl.enableDamping = true;
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 1;
    ctrl.maxZoom = 15;
    ctrl.minZoom = 5;
    ctrl.maxDistance = 15;
    ctrl.minDistance = 5;
    ctrl.dampingFactor = 0.03;

     const animate = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - prevTime.current) / 1000;
      prevTime.current = currentTime;

      ctrl.update(deltaTime);

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      ctrl.dispose();
    };
  }, [camera, gl]);

  return null;
};


export default CameraOrbitController;