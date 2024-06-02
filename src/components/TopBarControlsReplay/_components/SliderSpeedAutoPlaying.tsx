import React from "react";
import * as Slider from "@radix-ui/react-slider";

const SliderSpeedAutoPlaying = ({
  isPlaying,
  setSpeedAutoPlay,
}: {
  isPlaying: boolean;
  setSpeedAutoPlay: (value: number) => void;
}) => {
  const handleSpeedChange = (value: number[]) => {
    setSpeedAutoPlay(value[0]);
  };
  return (
    <Slider.Root
      disabled={isPlaying}
      id="slider"
      className="SliderRoot w-24"
      defaultValue={[50]}
      max={100}
      onValueChange={handleSpeedChange}
      step={1}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

export default SliderSpeedAutoPlaying;
