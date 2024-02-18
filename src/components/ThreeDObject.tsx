"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDObject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);
    const sizes = {
      width: 600,
      height: 600,
    }
    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
    camera.position.z = 5;
    camera.position.x = 5
    camera.position.y = 2
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    const cubesGroup = new THREE.Group();

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'purple', wireframe: true });
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.scale.set(0.8, 0.8, 0.8)
          cube.position.set(i * -1.1, j * -1.1, k * -1.1);
          cubesGroup.add(cube);
        }
      }
    }

    scene.add(cubesGroup);

    renderer.render(scene, camera);

    return () => {
      cubeGeometry.dispose();
      cubeMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div className='overflow-hidden' ref={containerRef}></div>;
};

export default ThreeDObject;
