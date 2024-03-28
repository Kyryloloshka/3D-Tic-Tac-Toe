"use client"
import React, { createContext, useContext, useEffect } from "react";

const RotationContext = createContext<{
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);

export const RotationProvider = ({ children } : {children: any}) => {
  const [rotation, setRotation] = React.useState(0);

  useEffect(() => {
    const rotate = () => {
      setRotation((prevRotation) => prevRotation + 0.004);
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  return (
    <RotationContext.Provider value={{ rotation, setRotation }}>
      {children}
    </RotationContext.Provider>
  );
};


export const useRotation = () => {
  const context = useContext(RotationContext);
  if (!context) {
    throw new Error('useRotation must be used within a RotationProvider');
  }
  return context;
};