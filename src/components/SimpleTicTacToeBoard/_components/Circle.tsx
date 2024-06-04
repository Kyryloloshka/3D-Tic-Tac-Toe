const Circle = ({ isHovered }: { isHovered?: boolean }) => {
  return (
    <div
      className={`glitch-block shadow-neon-secondary pointer-events-none h-8 w-8 rounded-full border-secondary-500 border-[6px] ${
        isHovered ? "opacity-50" : "opacity-100"
      }`}
    ></div>
  );
};

export default Circle;
