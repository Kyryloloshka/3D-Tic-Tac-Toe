"use client";
import { Button } from "@/components/ui/button";
import { useStateSelector } from "@/state";
import { useTranslations } from "next-intl";
import React from "react";

const SaveMovesHistoryButton = () => {
  const winner = useStateSelector((state) => state.game.winner);
  const movesHistory = useStateSelector((state) => state.game.historyMoves);
  const t = useTranslations("leftNavBar");

  const saveMovesHistory = () => {
    const json = JSON.stringify(movesHistory);
    const blob = new Blob([json], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "moves-history.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    winner && (
      <Button
        onClick={() => {
          saveMovesHistory();
        }}
        variant="neon"
        className={`sm:flex-auto`}
      >
        {t("save")}
      </Button>
    )
  );
};

export default SaveMovesHistoryButton;
