"use client";
import { useEffect, useState } from "react";
import RestartButton from "./_components/RestartButton";
import Square from "./_components/Square";
import Title from "./_components/Title";
import { useStateSelector } from "@/state";
import { calculateWinner } from "@/lib/gameLogic";
import {
  calculateWinnerSimpleTicTacToe,
  checkSubarrayExists,
} from "@/lib/simpleGameLogic";
import { useTranslations } from "next-intl";

const SimpleTicTacToeGame = () => {
  const [isPassphraseCorrect, setIsPassphraseCorrect] = useState(false);
  const [enteredPassphrase, setEnteredPassphrase] = useState("");
  const [classes, setClasses] = useState("");
  const [textError, setTextError] = useState("");
  const [isTitleError, setIsTitleError] = useState(false);
  const gameState = useStateSelector((state) => state.simpleGame.gameState);
  const { lines } = calculateWinnerSimpleTicTacToe(gameState);
	const t = useTranslations("page.secret")
  return (
    <div className="flex flex-col items-center gap-6">
      {!isPassphraseCorrect ? (
        <div className="flex flex-col items-center gap-6">
          <Title label={t("enterPassphrase")} isError={isTitleError} />
          <input
            value={enteredPassphrase}
            onChange={(event) => {
              setEnteredPassphrase(event.target.value);
              setClasses("");
              setTextError("");
              setIsTitleError(false);
            }}
            placeholder={t("enterPassphrase")}
            className={`input-primary ${classes}`}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (
                  enteredPassphrase.toLowerCase() ===
                  process.env.NEXT_PUBLIC_PASSPHRASE?.toLowerCase()
                ) {
                  setIsPassphraseCorrect(true);
                } else {
                  setIsPassphraseCorrect(false);
                  setIsTitleError(true);
                  setEnteredPassphrase("");
                  setClasses("shadow-neon-error");
                  setTextError(t("errorPassphrase"));
                }
              }
            }}
          />
          <div className="text-[#c11b1b] text-center mx-6">{textError}</div>
        </div>
      ) : (
        <>
          <Title label={"Secret Tic Tac Toe"} />
          <div className="relative h-[180px] aspect-square md:max-w-max ">
            <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[33.33%] -translate-y-[2px]"></div>
            <div className="h-[4px] shadow-neon-primary rounded-full w-full bg-primary-500 absolute left-0 top-[66.66%] -translate-y-[2px]"></div>
            <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[33.33%] -translate-x-[2px]"></div>
            <div className="w-[4px] shadow-neon-primary rounded-full h-full bg-primary-500 absolute top-0 left-[66.66%] -translate-x-[2px]"></div>
            <div className="absolute flex flex-col h-[100%] w-full gap-[4px]">
              <div className="flex w-full h-[calc(33.33%-2px)] gap-[4px]">
                {[0, 1, 2].map((index) => (
                  <Square key={index} index={index} />
                ))}
              </div>
              <div className="flex h-[calc(33.33%_-4px)] gap-[4px]">
                {[3, 4, 5].map((index) => (
                  <Square key={index} index={index} />
                ))}
              </div>
              <div className="flex h-[calc(33.33%-4px)] gap-[4px]">
                {[6, 7, 8].map((index) => (
                  <Square key={index} index={index} />
                ))}
              </div>
            </div>
            <div
              className={`w-[4px] transition-all pointer-events-none shadow-neon-error rounded-full bg-[#dd0000] absolute top-0 left-[16.666%] -translate-x-[3px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [0, 3, 6])
                  ? "h-full opacity-100"
                  : "h-0 opacity-0"
              }`}
            ></div>
            <div
              className={`w-[4px] transition-all pointer-events-none shadow-neon-error rounded-full  bg-[#dd0000] absolute top-0 left-[50%] -translate-x-[3px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [1, 4, 7])
                  ? "h-full opacity-100"
                  : "h-0 opacity-0"
              }`}
            ></div>
            <div
              className={`w-[4px] pointer-events-none shadow-neon-error rounded-full transition-all bg-[#dd0000] absolute top-0 left-[83.333%] -translate-x-[0px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [2, 5, 8])
                  ? "h-full opacity-100"
                  : "h-0 opacity-0"
              }`}
            ></div>
            <div
              className={`h-[4px] transition-all pointer-events-none shadow-neon-error rounded-full bg-[#dd0000] absolute left-0 top-[16.666%] -translate-y-[3px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [0, 1, 2])
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
            ></div>
            <div
              className={`h-[4px] transition-all pointer-events-none shadow-neon-error rounded-full bg-[#dd0000] absolute left-0 top-[50%] -translate-y-[3px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [3, 4, 5])
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
            ></div>
            <div
              className={`h-[4px] pointer-events-none shadow-neon-error rounded-full transition-all bg-[#dd0000] absolute left-0 top-[83.333%] -translate-y-[2px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [6, 7, 8])
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
            ></div>
            <div
              className={`h-[4px] pointer-events-none rotate-45 shadow-neon-error origin-left rounded-full bg-[#dd0000] transition-all absolute left-[3.833%] top-[3.533%] -translate-y-[2px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [0, 4, 8])
                  ? "w-[calc(100%*1.3)] opacity-100"
                  : "w-0 opacity-0"
              }`}
            ></div>
            <div
              className={`h-[4px] transition-all -rotate-45 origin-left  shadow-neon-error rounded-full  bg-[#dd0000] pointer-events-none absolute left-[3.833%] top-[96.566%] -translate-y-[2px] ${
                lines.length >= 1 && checkSubarrayExists(lines, [2, 4, 6])
                  ? "w-[calc(100%*1.3)] opacity-100"
                  : "w-0 opacity-0"
              }`}
            ></div>
          </div>
          <RestartButton />
        </>
      )}
    </div>
  );
};

export default SimpleTicTacToeGame;
