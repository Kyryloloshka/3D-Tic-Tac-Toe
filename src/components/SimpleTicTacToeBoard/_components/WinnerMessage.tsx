"use client";
import { useStateSelector } from "@/state";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react"; // Import useEffect for side effects

const WinnerMessage = () => {
  const winner = useStateSelector((state) => state.simpleGame.winner);
  const [lastWinner, setLastWinner] = useState(winner);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("page.secret");
  const [dataGlitch, setDataGlitch] = useState(
    `${t("player")} ${winner} ${t("winner")}`
  );

  

  useEffect(() => {
    console.log(isVisible, winner, lastWinner);
  }, [winner, isVisible]);

  useEffect(() => {
    if (winner && winner !== "tie" && winner !== lastWinner) {
      setDataGlitch(`${t("player")} ${winner} ${t("winner")}`);
      setLastWinner(winner);
    } else if (winner === "tie" && winner !== lastWinner) {
      setDataGlitch(t("tie"));
      setLastWinner(winner);
    }
  }, [winner]);

  useEffect(() => {
    if (winner) {
      setIsVisible(true);
      const duration = winner === "tie" ? 7000 : 5000;
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [winner]);

  return (
    winner && (
      <>
        <h2
          style={{
            transition: `background-color 3s`,
            pointerEvents: isVisible ? "auto" : "none",
          }}
          className={`leading-5 ${
            isVisible ? "bg-[#000000f8]" : "pointer-events-none"
          } tracking-widest fixed text-2xl h-[200vh] w-[200vw] top-[-50vh] left-[-50vw] flex-center overflow-hidden z-[10000] `}
        >
          {lastWinner === "tie" && (
            <div
              className={`w-[100vw] h-[100vh] overflow-hidden absolute top-[50%] z-[-2] translate-x-[-50%] translate-y-[-50%] left-[50%] ${
                isVisible ? "fadeIn" : " transition-opacity fadeOut"
              }`}
            >
              <img
                className="object-center h-full w-full object-cover brightness-50"
                src="/assets/images/screamer.jpg"
              />
            </div>
          )}
          <div
            className={`relative select-none max-w-[100vw] text-center ${
              isVisible ? "fade-in-with-delay" : "fadeOut"
            }`}
          >
            <div
              data-glitch={dataGlitch}
              className="glitch glitch-red max-w-[100vw] text-center leading-10 whitespace-normal"
            >
              {lastWinner === "tie" ? (
                <>{t("tie")}</>
              ) : (
                <>
                  {t("player")}{" "}
                  <span className="text-[#c8102e] relative">
                    {lastWinner}
                    <span className="blooddrop"></span>
                  </span>{" "}
                  {t("winner")}
                </>
              )}
            </div>
          </div>
        </h2>
      </>
    )
  );
};

export default WinnerMessage;
