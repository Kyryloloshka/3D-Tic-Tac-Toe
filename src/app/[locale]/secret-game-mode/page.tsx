import SimpleTicTacToeGame from "@/components/SimpleTicTacToeBoard";
import WinnerMessage from "@/components/SimpleTicTacToeBoard/_components/WinnerMessage";
import React from "react";

const SecretGameMode = () => {
  return (
    <div className="flex-center min-h-[calc(100vh-80px)]">
      <SimpleTicTacToeGame />
      <WinnerMessage />
    </div>
  );
};

export default SecretGameMode;
