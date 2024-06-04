"use client";
import { Button } from "@/components/ui/button";
import { simpleGameActions, useActionCreators } from "@/state";
import { useTranslations } from "next-intl";
import React from "react";

const RestartButton = () => {
  const actions = useActionCreators(simpleGameActions);
	const t = useTranslations("page.secret")

  const handleRestart = () => {
    actions.restartGame();
  };
  return (
    <Button variant="glitch" size="lg" onClick={handleRestart}>
      {t("restart")}
    </Button>
  );
};

export default RestartButton;
