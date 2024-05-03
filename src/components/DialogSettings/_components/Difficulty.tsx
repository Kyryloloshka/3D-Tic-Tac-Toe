import React, { useState } from "react";
import { Label } from "../../ui/label";
import * as Slider from "@radix-ui/react-slider";
import { DifficultyEnum } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

export function Difficulty({
  t,
  selectedIsPlayWithBot,
  selectedDifficulty,
  setSelectedDifficulty
}: any) {
  const [openTipSlider, setOpenTipSlider] = useState(false);

  const handleDifficultyChange = (value: number[]) => {
    const difficulty = Math.floor(value[0] / 100 * 3);
    difficulty <= 3 && setSelectedDifficulty(difficulty)
  }
  
  return <>
    <Label htmlFor="botDifficulty" className="col-span-2">
      {t("difficulty")}
    </Label>
    <Slider.Root onMouseEnter={() => setOpenTipSlider(true)} onMouseLeave={() => setOpenTipSlider(false)} disabled={!selectedIsPlayWithBot} className="SliderRoot col-span-3" defaultValue={[selectedDifficulty * 100 / 3]} onValueChange={handleDifficultyChange} max={100} step={100 / 3}>
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <TooltipProvider delayDuration={0}>
        <Tooltip open={openTipSlider && selectedIsPlayWithBot}>
          <TooltipTrigger asChild>
            <Slider.Thumb className="SliderThumb" aria-label="botDifficulty" />
          </TooltipTrigger>
          <TooltipContent className='bg-dark-2 border-primary-500 shadow-primary'>
            {DifficultyEnum[selectedDifficulty]}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Slider.Root>
  </>;
}
  