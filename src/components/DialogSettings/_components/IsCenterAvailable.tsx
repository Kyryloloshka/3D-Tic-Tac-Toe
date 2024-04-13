import React from "react";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";

export function IsCenterAvailable({
  t,
  selectedIsCenterAvailable,
  setSelectedIsCenterAvailable
}: any) {

  const handleCenterAvaliableChange = () => {
    setSelectedIsCenterAvailable((prev: any) => !prev)
  };

  return <>
    <Label htmlFor="terms" className="col-span-4">
      {t("centerAvailable")}
    </Label>
    <Checkbox defaultChecked={selectedIsCenterAvailable} onCheckedChange={handleCenterAvaliableChange} className='col-span-1' id="terms" />
  </>;
}
  