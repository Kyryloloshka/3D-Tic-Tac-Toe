import React from "react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Player } from "@/types";

export function BotPlaysAs({
  t,
  selectedIsPlayWithBot,
  selectedBotPlayer,
  setSelectedBotPlayer,
}: any) {
  const handleBotPlayerChange = (param: any) => {
    setSelectedBotPlayer(param);
  };

  return (
    <>
      <Label htmlFor="botPlayer" className="col-span-4">
        {t("botPlaysAs")}
      </Label>
      <RadioGroup
        disabled={!selectedIsPlayWithBot}
        className="col-span-1"
        defaultValue={selectedBotPlayer}
        onValueChange={handleBotPlayerChange}
      >
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
  );
}
