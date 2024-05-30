import React from "react";
import LeftNavBar from "@/components/LeftNavBar";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";
import Loading from "../loading";
import Recomendation from "@/components/Recomendation";
import BotMoveHandler from "@/components/BotMoveHandler";
import WinToastHandler from "@/components/WinToastHandler";

const ComponentPlayGame = dynamic(() => import("@/components/Model3d"), {
  ssr: false,
  loading: () => <Loading />,
});

const PlayGame = () => {
  return (
    <div className={`overflow-hidden flex-auto flex flex-col h-full`}>
      <Recomendation />
      <div className="flex flex-col md:flex-row h-full flex-auto">
        <LeftNavBar />
        <ComponentPlayGame />
      </div>
      <Toaster />
      <BotMoveHandler />
      <WinToastHandler />
    </div>
  );
};

export default PlayGame;
