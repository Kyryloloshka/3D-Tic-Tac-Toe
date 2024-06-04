import React from "react";

const Circle = ({ opacity }: { opacity?: string }) => (
  <div
    className={`shadow-neon-secondary pointer-events-none h-8 w-8 rounded-full border-secondary-500 border-[6px] opacity-[${opacity}]`}
  ></div>
);

export default Circle;
