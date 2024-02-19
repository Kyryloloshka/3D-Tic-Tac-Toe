"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { INavLink } from "@/types"

const headerLinks = [
  {
    route: "/",
    label: "Home",
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
  const pathname = usePathname()
  return (
    <div className="z-10 min-h-[60px] shadow-primary bg-dark-2 gap-3 flex justify-between items-center px-6 py-3">
      <Link href="/" className="text-primary-500 text-xl font-semibold text-shadow-neon whitespace-nowrap">3D Tic tac toe</Link>
      <ul className="flex items-center gap-y-2 justify-center gap-x-[calc(5vw_+_1px)] flex-wrap">
        {headerLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <li className="relative" key={link.label}>
              <Link className={`link-underline capitalize ${isActive && "text-primary-500 before:left-0 before:w-full"}`} href={link.route}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
      <div className="flex gap-5">
        <div className="h-8 w-8 rounded-full bg-primary-500"></div>
      </div>
    </div>
  )
}

export default Header