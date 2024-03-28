"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { INavLink } from "@/types"
import { useState } from "react"
import { useRouter } from "next/router"

const headerLinks = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/play-game",
    label: "Play"
  },
  {
    route: "/play-game/with-bot",
    label: "Play with bot"
  },
  {
    route: "/rules",
    label: "Rules",
  },
  {
    route: "/about-game",
    label: "About"
  }
]

const Header = () => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const toggleIsOpenBurger = () => {
    setIsOpenBurger(prevState => !prevState);
  }

  const handleCloseBurgerMenu = () => {
    setIsOpenBurger(false);
  };

  const pathname = usePathname()
  return (
    <header className="z-10 top-0 sticky min-h-[60px] shadow-primary bg-dark-2 gap-3 flex justify-between items-center px-6 py-3">
      <div className="md:hidden z-50 ml-[-8px]">
        <label className="hamburger" >
          <input type="checkbox" onClick={() => toggleIsOpenBurger()}/>
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
      <Link href="/" className="text-primary-500 text-xl font-semibold text-shadow-neon whitespace-nowrap">3D Tic tac toe</Link>
      <div className={`${isOpenBurger ? "left-0" : "left-[-100%]"} md:left-0 transition-all absolute pt-16 md:relative min-h-[100dvh] md:min-h-[auto] min-w-[260px] md:min-w-[auto] top-0 bg-dark-2 p-6 md:p-0 z-40`}>
        <ul className={` flex-col items-start flex md:flex-row md:items-center gap-y-2 justify-center gap-x-[calc(5vw_+_1px)] flex-wrap z-50 `}>
          {headerLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li onClick={handleCloseBurgerMenu} className="relative" key={link.label}>
                <Link className={`link-underline capitalize md:text-[16px] text-xl ${isActive && "text-primary-500 before:left-0 before:w-full"}`} href={link.route}>{link.label}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex gap-5">
        <div className="h-8 w-8 rounded-full bg-primary-500"></div>
      </div>
    </header>
  )
}

export default Header