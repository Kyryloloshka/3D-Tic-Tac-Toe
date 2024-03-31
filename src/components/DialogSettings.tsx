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
import { setFirstPlayer } from '@/state/gameState/gameStateSlice';
import { Button } from './ui/button';
import { IPlayer } from '@/types';

const DialogSettings = ({restartGame}: {restartGame: Function}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const firstPlayer = useSelector((state: RootState) => state.firstPlayer);
  const [selectedFirstPlayer, setSelectedFirstPlayer] = useState<IPlayer>(firstPlayer);

  const submitSettings = (e: any) => {
    e.preventDefault();
    restartGame(selectedFirstPlayer);
    dispatch(setFirstPlayer(selectedFirstPlayer));
    setOpen(false)
  }

  const handlePlayerChange = (param: any) => {
    setSelectedFirstPlayer(param)
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <img src="/assets/icons/settings.svg" alt="setting" className="h-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dark-2 shadow-primary">
        <form onSubmit={submitSettings}>
          <DialogHeader>
            <DialogTitle>Settings of game</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="playFor" className="text-right">
                First move for
              </Label>
              <RadioGroup defaultValue={selectedFirstPlayer} onValueChange={handlePlayerChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="X" id="r1" />
                  <Label htmlFor="r1">X</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="O" id="r2" />
                  <Label htmlFor="r2">O</Label>
                </div>
              </RadioGroup>
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