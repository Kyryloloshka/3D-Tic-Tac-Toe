"use client";
import { useState } from "react";
import RestartButton from "./_components/RestartButton";
import Square from "./_components/Square";
import Title from "./_components/Title";

const SimpleTicTacToeGame = () => {
  const [isPassphraseCorrect, setIsPassphraseCorrect] = useState(false);
  const [enteredPassphrase, setEnteredPassphrase] = useState("");
  const [classes, setClasses] = useState("");
  const [textError, setTextError] = useState("");
  const [isTitleError, setIsTitleError] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6">
      {!isPassphraseCorrect ? (
        <div className="flex flex-col items-center gap-6">
          <Title label={"Enter Passphrase"} isError={isTitleError} />
          <input
            value={enteredPassphrase}
            onChange={(event) => {
              setEnteredPassphrase(event.target.value);
              setClasses("");
              setTextError("");
              setIsTitleError(false);
            }}
            placeholder="Enter passphrase"
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
                  setTextError("Incorrect passphrase. Try again.");
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
          </div>
          <RestartButton />
        </>
      )}
    </div>
  );
};

export default SimpleTicTacToeGame;
