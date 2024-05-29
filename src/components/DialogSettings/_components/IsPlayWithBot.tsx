import React from "react";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";

export function IsPlayWithBot({
  t,
  selectedIsPlayWithBot,
  setSelectedIsPlayWithBot,
}: any) {
  const handlePlayWithBotChange = () => {
    setSelectedIsPlayWithBot((prev: any) => !prev);
  };

  return (
    <>
      <Label htmlFor="bot" className="col-span-4">
        {t("gameWithBot")}
      </Label>
      <Checkbox
        defaultChecked={selectedIsPlayWithBot}
        onCheckedChange={handlePlayWithBotChange}
        className="col-span-1"
        id="bot"
      />
    </>
  );
}
