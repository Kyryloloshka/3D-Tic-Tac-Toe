import React from "react";

const blocked = () => {
  return (
    <div className="flex h-[calc(100vh-60px)] w-full">
      <div className="m-auto">
        <h1 className="text-4xl font-semibold text-center">You are blocked</h1>
        <p className="text-center">
          Sorry, you are not allowed to access this page.
        </p>
      </div>
    </div>
  );
};

export default blocked;
