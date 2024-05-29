"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { useMediaQuery } from 'react-responsive';

const Logo = () => {
  const [logoText, setLogoText] = useState("3D Tic tac toe");
  
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (isMediumScreen && !isLargeScreen) {
      setLogoText("3D");
    } else {
      setLogoText("3D Tic tac toe");
    }
  }, [isMediumScreen, isLargeScreen])

  return (
    <Link draggable="false" href="/" className="text-primary-500 lext-md md:text-lg font-semibold text-shadow-neon whitespace-nowrap">{logoText}</Link>
  )
}

export default Logo