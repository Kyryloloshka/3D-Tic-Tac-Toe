import React from "react";

const Cross = ({ isHovered }: { isHovered?: boolean }) => (
  <div
    className={`glitch-block rotate-45 pointer-events-none transition-all ${
      isHovered ? "opacity-50" : "opacity-100"
    }`}
  >
    <div className="absolute top-1/2 left-1/2 w-[40px] h-[6px] bg-primary-500 transform -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute top-1/2 left-1/2 w-[6px] h-[40px] bg-primary-500 transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>
);

export default Cross;
