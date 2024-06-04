"use client";
import { Button } from "@/components/ui/button";
import { simpleGameActions, useActionCreators } from "@/state";
import React from "react";

const RestartButton = () => {
  const actions = useActionCreators(simpleGameActions);

  const handleRestart = () => {
    actions.restartGame();
  };
  return (
    <Button variant="glitch" size="lg" onClick={handleRestart}>
      Restart
    </Button>
  );
};

export default RestartButton;
