import React from "react";

const Title = ({ label, isError }: { label: string; isError?: boolean }) => {
  return (
    <div className="title-effect-wrapper">
      <div
        data-glitch={label}
        className={`glitch select-none text-shadow-neon text-center mx-6 ${
          isError && "error-title text-shadow-error"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default Title;
