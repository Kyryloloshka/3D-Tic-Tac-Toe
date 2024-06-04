"use client";
import { useStateSelector } from "@/state";
import { useEffect, useState } from "react"; // Import useEffect for side effects

const WinnerMessage = () => {
  const winner = useStateSelector((state) => state.simpleGame.winner);
  const [isVisible, setIsVisible] = useState(winner ? true : false); // Track visibility state
  const [dataGlitch, setDataGlitch] = useState(
    `Player ${winner} is the winner`
  );

  useEffect(() => {
    if (winner) {
      setDataGlitch(`Player ${winner} is the winner`);
    }
  }, [winner]);

  useEffect(() => {
    // Handle winner change and delayed disappearance
    if (winner && (winner === "X" || winner === "O")) {
      setIsVisible(true); // Show the message

      const timeoutId = setTimeout(() => {
        setIsVisible(false); // Hide the message after 5 seconds
      }, 5000);

      return () => clearTimeout(timeoutId); // Cleanup function to prevent leaks
    }
  }, [winner]); // Dependency on winner state

  return (
    <h2
      style={{
        transition: `opacity 3s`, // Conditional transition duration
        opacity: isVisible ? 1 : 0, // Conditional opacity based on visibility state
        pointerEvents: isVisible ? "auto" : "none", // Disable pointer events when invisible
      }}
      className={`leading-5 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } tracking-widest fixed text-2xl h-[200vh] w-[200vw] top-[-50vh] left-[-50vw] flex-center overflow-hidden z-[10000] bg-[#000000f8]`}
    >
      <div className="relative select-none max-w-[100vw] text-center">
        <div
          data-glitch={dataGlitch}
          className="glitch glitch-red max-w-[100vw] text-center leading-10 whitespace-normal"
        >
          Player{" "}
          <span className="text-[#c8102e] relative">
            {winner}
            <span className="blooddrop"></span>
          </span>{" "}
          is the winner
        </div>
      </div>
    </h2>
  );
};

export default WinnerMessage;
