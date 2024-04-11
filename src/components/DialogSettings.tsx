import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "./ui/label";
import { useSelector } from 'react-redux';
import { RootState } from "@/state/types";
import { Button } from './ui/button';
import { Difficulty, Player } from '@/types';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { useTranslations } from 'next-intl';
import { useActionCreators, useAppDispatch } from '@/state/hooks';
import { gameActions } from '@/state/slices/game';
import { Rubik } from 'next/font/google';
import * as Slider from '@radix-ui/react-slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { rubik } from '@/app/[locale]/layout';


const DialogSettings = ({restartGame}: {restartGame: Function}) => {
  const firstPlayer = useSelector((state: RootState) => state.game.firstPlayer);
  const isCenterAvailable = useSelector((state: RootState) => state.game.isCenterAvailable);
  const isPlayWithBot = useSelector((state: RootState) => state.game.isPlayWithBot);
  const botPlayer = useSelector((state: RootState) => state.game.botPlayer);
  const botDifficulty = useSelector((state: RootState) => state.game.botDifficulty);

  const [open, setOpen] = useState(false);
  const [openTipSlider, setOpenTipSlider] = useState(false);
  const [selectedFirstPlayer, setSelectedFirstPlayer] = useState<Player>(firstPlayer);
  const [selectedIsCenterAvailable, setSelectedIsCenterAvailable] = useState(isCenterAvailable);
  const [selectedIsPlayWithBot, setSelectedIsPlayWithBot] = useState(isPlayWithBot);
  const [selectedBotPlayer, setSelectedBotPlayer] = useState(botPlayer);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(botDifficulty);

  const t = useTranslations("settings");

  const actions = useActionCreators(gameActions);
  const submitSettings = (e: any) => {
    e.preventDefault();
    restartGame(selectedFirstPlayer);
    actions.setFirstPlayer(selectedFirstPlayer);
    actions.setIsXNext(selectedFirstPlayer === Player.X)
    actions.setIsCenterAvailable(selectedIsCenterAvailable);
    actions.setIsPlayWithBot(selectedIsPlayWithBot);
    actions.setBotPlayer(selectedBotPlayer);
    actions.setBotDifficulty(selectedDifficulty);
    setOpen(false)
  }

  const handlePlayerChange = (param: any) => {
    setSelectedFirstPlayer(param)
  };

  const handleCenterAvaliableChange = () => {
    setSelectedIsCenterAvailable(prev => !prev)
  };
  
  const handlePlayWithBotChange = () => {
    setSelectedIsPlayWithBot(prev => !prev)
  };
  const handleBotPlayerChange = (param: any) => {
    setSelectedBotPlayer(param)
  }

  const handleDifficultyChange = (value: number[]) => {
    const difficulty = Math.floor(value[0] / 100 * 3);
    difficulty <= 3 && setSelectedDifficulty(difficulty)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img src="/assets/icons/settings.svg" alt="setting" className="h-6 cursor-pointer select-none" />
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] bg-dark-2 shadow-primary border-primary-500/90`}>
        <form onSubmit={submitSettings}>
          <DialogHeader>
            <DialogTitle className='font-light tracking-wider'>{t("title")}</DialogTitle>
          </DialogHeader>
          <div className={`${rubik.className} grid gap-4 py-4`}>
            <div className="grid grid-cols-5 items-center gap-2">
              <Label htmlFor="playFor" className=" col-span-4">
                {t("firstMoveFor")}
              </Label>
              <RadioGroup className="col-span-1" defaultValue={selectedFirstPlayer} onValueChange={handlePlayerChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Player.X} id="r1" />
                  <Label htmlFor="r1">{Player.X}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Player.O} id="r2" />
                  <Label htmlFor="r2">{Player.O}</Label>
                </div>
              </RadioGroup>
              <Separator className="col-span-5 w-full bg-dark-5" />
              <Label
                htmlFor="terms"
                className="  col-span-4"
              >
                {t("centerAvailable")}
              </Label>
              <Checkbox defaultChecked={selectedIsCenterAvailable} onCheckedChange={handleCenterAvaliableChange} className='col-span-1' id="terms" />
              <Separator className="col-span-5 w-full bg-dark-5" />
              <Label
                htmlFor="bot"
                className="col-span-4"
              >
                {t("gameWithBot")}
              </Label>
              <Checkbox defaultChecked={selectedIsPlayWithBot} onCheckedChange={handlePlayWithBotChange} className='col-span-1' id="bot" />
              <Separator className="col-span-5 w-full bg-dark-5" />
              <Label  htmlFor="botPlayer" className="col-span-4">
              {t("botPlaysAs")}
              </Label>
              <RadioGroup disabled={!selectedIsPlayWithBot} className="col-span-1" defaultValue={selectedBotPlayer} onValueChange={handleBotPlayerChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Player.X} id="r1" />
                  <Label htmlFor="r1">{Player.X}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Player.O} id="r2" />
                  <Label htmlFor="r2">{Player.O}</Label>
                </div>
              </RadioGroup>
              <Separator className="col-span-5 w-full bg-dark-5" />
              <Label  htmlFor="botDifficulty" className="col-span-2">
                Difficulty
              </Label>
              <Slider.Root onMouseEnter={() => setOpenTipSlider(true)} onMouseLeave={() => setOpenTipSlider(false)} disabled={!selectedIsPlayWithBot} className="SliderRoot col-span-3" defaultValue={[selectedDifficulty*100/3]} onValueChange={handleDifficultyChange} max={100} step={100/3}>
                <Slider.Track className="SliderTrack">
                  <Slider.Range className="SliderRange" />
                </Slider.Track>
                <TooltipProvider delayDuration={0}>
                  <Tooltip open={openTipSlider && selectedIsPlayWithBot}>
                    <TooltipTrigger asChild>
                      <Slider.Thumb className="SliderThumb" aria-label="botDifficulty" />
                    </TooltipTrigger>
                    <TooltipContent className='bg-dark-2 border-primary-500 shadow-primary'>
                      {Difficulty[selectedDifficulty]}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Slider.Root>
            </div>
          </div>
          <DialogFooter>
            <Button className='whitespace-normal' variant="neon" type="submit">{t("saveAndRestart")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSettings