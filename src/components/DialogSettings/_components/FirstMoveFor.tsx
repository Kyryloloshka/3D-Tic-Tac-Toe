import React from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Player } from "@/types";

export function FirstMoveFor({
  t,
  selectedFirstPlayer,
  setSelectedFirstPlayer
}: any) {
  const handlePlayerChange = (param: any) => {
    setSelectedFirstPlayer(param)
  };
  return <>
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
  </>;
}
  