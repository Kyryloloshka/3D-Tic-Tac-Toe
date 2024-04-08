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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setBotPlayer, setFirstPlayer, setIsCenterAvailable, setIsPlayWithBot, setIsXNext } from '@/state/gameState/gameStateSlice';
import { Button } from './ui/button';
import { Player } from '@/types';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';

const DialogSettings = ({restartGame}: {restartGame: Function}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const firstPlayer = useSelector((state: RootState) => state.firstPlayer);
  const isCenterAvailable = useSelector((state: RootState) => state.isCenterAvailable);
  const isPlayWithBot = useSelector((state: RootState) => state.isPlayWithBot);
  const botPlayer = useSelector((state: RootState) => state.botPlayer);
  const [selectedFirstPlayer, setSelectedFirstPlayer] = useState<Player>(firstPlayer);
  const [selectedIsCenterAvailable, setSelectedIsCenterAvailable] = useState(isCenterAvailable);
  const [selectedIsPlayWithBot, setSelectedIsPlayWithBot] = useState(isPlayWithBot);
  const [selectedBotPlayer, setSelectedBotPlayer] = useState(botPlayer);

  const submitSettings = (e: any) => {
    e.preventDefault();
    restartGame(selectedFirstPlayer);
    dispatch(setFirstPlayer(selectedFirstPlayer));
    dispatch(setIsXNext(selectedFirstPlayer === Player.X))
    dispatch(setIsCenterAvailable(selectedIsCenterAvailable));
    dispatch(setIsPlayWithBot(selectedIsPlayWithBot));
    dispatch(setBotPlayer(selectedBotPlayer));
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img src="/assets/icons/settings.svg" alt="setting" className="h-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dark-2 shadow-primary border-primary-500/90">
        <form onSubmit={submitSettings}>
          <DialogHeader>
            <DialogTitle>Settings of game</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-2">
              <Label htmlFor="playFor" className=" col-span-4">
                First move for
              </Label>
              <RadioGroup className="col-span-1" defaultValue={selectedFirstPlayer} onValueChange={handlePlayerChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="X" id="r1" />
                  <Label htmlFor="r1">X</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="O" id="r2" />
                  <Label htmlFor="r2">O</Label>
                </div>
              </RadioGroup>
              <Separator className="col-span-5 w-full bg-dark-5" />
              <Label
                htmlFor="terms"
                className="  col-span-4"
              >
                Center Available
              </Label>
              <Checkbox defaultChecked={selectedIsCenterAvailable} onCheckedChange={handleCenterAvaliableChange} className='col-span-1' id="terms" />
              <Separator className="col-span-5 w-full bg-dark-5" />
              <Label
                htmlFor="bot"
                className="col-span-4"
              >
                Game with Bot
              </Label>
              <Checkbox defaultChecked={selectedIsPlayWithBot} onCheckedChange={handlePlayWithBotChange} className='col-span-1' id="bot" />
              {selectedIsPlayWithBot && 
                <>
                <Separator className="col-span-5 w-full bg-dark-5" />
                  <Label htmlFor="botPlayer" className="col-span-4">
                    The Bot Plays as
                  </Label>
                  <RadioGroup className="col-span-1" defaultValue={selectedBotPlayer} onValueChange={handleBotPlayerChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={Player.X} id="r1" />
                      <Label htmlFor="r1">{Player.X}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={Player.O} id="r2" />
                      <Label htmlFor="r2">{Player.O}</Label>
                    </div>
                  </RadioGroup>
                </>
              }
            </div>
          </div>
          <DialogFooter>
            <Button variant="neon" type="submit">Save and restart</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSettings