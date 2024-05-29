import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GameDisplay } from "@/types";
import React from "react";

export const DisplayGame = ({
  t,
  displayGameAs,
  setDisplayGameAs,
}: {
  t: (value: string) => string;
  displayGameAs: GameDisplay;
  setDisplayGameAs: (value: GameDisplay) => void;
}) => {
  const handleDisplayGameAs = (param: any) => {
    setDisplayGameAs(param);
  };

  return (
    <>
      <Label htmlFor="playFor" className=" col-span-4">
        {t("displayGameAs")}
      </Label>
      <RadioGroup
        className="col-span-1"
        defaultValue={displayGameAs}
        onValueChange={handleDisplayGameAs}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={GameDisplay.Cubes} id="r1" />
          <Label htmlFor="r1">{GameDisplay.Cubes}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={GameDisplay.Planes} id="r2" />
          <Label htmlFor="r2">{GameDisplay.Planes}</Label>
        </div>
      </RadioGroup>
    </>
  );
};
