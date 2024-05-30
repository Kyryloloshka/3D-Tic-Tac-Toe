"use client"
import { useStateSelector } from "@/state";
import { Player } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

const MessageHead = () => {
  const isXNext = useStateSelector((state) => state.game.isXNext);
  const t = useTranslations("leftNavBar");
  const winner = useStateSelector((state) => state.game.winner);

  return (
    <h3 className="no-wrap select-none whitespace-nowrap uppercase text-sm text-light-2">
      {winner == null
        ? `${t("turn")} - ${isXNext ? Player.X : Player.O}`
        : `${t("winner")} - ${winner}`}
    </h3>
  );
};

export default MessageHead;
