"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { INavLink } from "@/types"
import { useState, useTransition } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "@/navigation"
import { useLocale } from "next-intl"

const headerLinks = [
  {
    route: "/",
    label: "Home",
    translateKey: "home"
  },
  {
    route: "/play-game",
    label: "Play",
    translateKey: "play"
  },
  {
    route: "/play-game/with-bot",
    label: "Play with bot",
    translateKey: "playWithBot"
  },
  {
    route: "/rules",
    label: "Rules",
    translateKey: "rules"
  },
  {
    route: "/about-game",
    label: "About",
    translateKey: "about"
  }
]

const Header = () => {
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const pathname = usePathname();
  const localeActive = useLocale()
  const locale = useLocale();
  const messages = require(`@/messages/${locale}.json`)
  const toggleIsOpenBurger = () => {
    setIsOpenBurger(prevState => !prevState);
  }

  const handleCloseBurgerMenu = () => {
    setIsOpenBurger(false);
  };

  const handleLanguageChange = (value: any) => {
    startTransition(() => {
      router.replace(`/${value}/${pathname}`)
    })
  };

  return (
    <header className="z-10 top-0 sticky min-h-[60px] shadow-primary bg-dark-2 gap-3 flex justify-between items-center px-3 md:px-6 py-2 md:py-3">
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
      <div className={`${isOpenBurger ? "left-0" : "left-[-100%]"} md:left-0 transition-all absolute pt-16 md:relative min-h-[100dvh] md:min-h-[auto] min-w-[260px] md:min-w-[auto] top-0 bg-dark-2 p-3 md:p-0 z-40`}>
        <ul className={` flex-col items-start flex md:flex-row md:items-center gap-y-2 justify-center gap-x-[calc(5vw_+_1px)] flex-wrap z-50 `}>
        {headerLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          
          return (
            <li onClick={handleCloseBurgerMenu} className="relative" key={link.label}>
              <Link className={`link-underline capitalize md:text-[16px] text-xl ${isActive && "text-primary-500 before:left-0 before:w-full"}`} href={link.route}>
                {messages.navigation[link.translateKey]}
              </Link>
            </li>
          )
        })}
        </ul>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-5 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-primary-500"></div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dark-2 p-2 mr-3 md:mr-6">
          <DropdownMenuItem>{messages.navigation.language}</DropdownMenuItem>

          <DropdownMenuGroup>
          <Select defaultValue={localeActive} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent  className="bg-dark-2">
              <SelectGroup>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="uk">Українська</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="pl">Polski</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header