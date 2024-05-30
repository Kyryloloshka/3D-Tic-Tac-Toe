"use client"
import { Button } from "@/components/ui/button";
import { gameActions, useActionCreators } from "@/state";
import { useTranslations } from "next-intl";
import React from "react";

const RestartButton = () => {
  const actions = useActionCreators(gameActions);
  const t = useTranslations("leftNavBar");
  return (
    <Button
      onClick={() => {
        actions.restartGame();
      }}
      variant="neon"
      className={`flex-grow-0 md:flex-grow-1`}
    >
      {t("restart")}
    </Button>
  );
};

export default RestartButton;
