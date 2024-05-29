import { useThree, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  ToneMappingEffect,
  FXAAEffect,
} from "postprocessing";
import { useEffect, useState } from "react";

export default function Effects() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const [composer] = useState(
    () => new EffectComposer(gl, { multisampling: 0 })
  );

  useEffect(() => composer.setSize(size.width, size.height), [composer, size]);
  useEffect(() => {
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    composer.addPass(
      new EffectPass(
        camera,
        new BloomEffect({
          mipmapBlur: true,
          luminanceThreshold: 0.1,
          intensity: 0.9,
          levels: 7,
        })
      )
    );
    composer.addPass(
      new EffectPass(camera, new FXAAEffect(), new ToneMappingEffect())
    );

    return () => {
      composer.removeAllPasses();
    };
  }, [composer, camera, scene]);

  useFrame((state, delta) => {
    gl.autoClear = true; // ?
    composer.render(delta);
  }, 1);
  return null;
}
