"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { INavLink } from "@/types"
import { useEffect, useState, useTransition } from "react"
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
import { useMediaQuery } from 'react-responsive';

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
    route: "/rules",
    label: "Rules",
    translateKey: "rules"
  },
  {
    route: "/about-game",
    label: "About",
    translateKey: "about"
  },
  {
    route: "/replay",
    label: "See Replays",
    translateKey: "replays"
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
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const [logoText, setLogoText] = useState("3D Tic tac toe");
  
  useEffect(() => {
    if (isMediumScreen && !isLargeScreen) {
      setLogoText("3D");
    } else {
      setLogoText("3D Tic tac toe");
    }
  }, [isMediumScreen, isLargeScreen])
  
  const toggleIsOpenBurgerMenu = () => {
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
    <header className="z-[500] fade-in top-0 sticky min-h-[40px] md:min-h-[54px] shadow-primary bg-dark-2 gap-3 flex justify-between items-center px-3 md:px-6 py-1 md:py-3">
      <div className="md:hidden z-[502] ml-[-8px]">
        <label className="hamburger" >
          <input type="checkbox" onClick={() => toggleIsOpenBurgerMenu()}/>
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
      <Link draggable="false" href="/" className="text-primary-500 lext-md md:text-lg font-semibold text-shadow-neon whitespace-nowrap">{logoText}</Link>
      <nav className={`${isOpenBurger ? "left-0" : "left-[-100%]"} md:left-0 transition-all absolute pt-16 md:relative min-h-[100dvh] md:min-h-[auto] min-w-[260px] md:min-w-[auto] top-0 bg-dark-2 p-3 md:p-0 z-[499]`}>
        <ul className={` flex-col items-start flex md:flex-row md:items-center gap-y-2 justify-center gap-x-[calc(5vw_-18px)] flex-wrap z-[501] `}>
        {headerLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <li onClick={handleCloseBurgerMenu} className="relative" key={link.label}>
              <Link draggable="false" className={`link-underline capitalize md:text-[16px] text-xl ${isActive && "text-primary-500 before:left-0 before:w-full"}`} href={link.route}>
                {messages.navigation[link.translateKey]}
              </Link>
            </li>
          )
        })}
        </ul>
      </nav>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex gap-5 cursor-pointer">
            <div className="h-6 w-6 flex-center rounded-full transition svg-settings">
              <img src="/assets/icons/settings.svg" alt="settings" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-dark-2 p-2 mr-3 md:mr-6 z-[501] flex flex-col gap-1">
          <DropdownMenuItem>{messages.navigation.language}</DropdownMenuItem>
          <DropdownMenuGroup>
            <Select defaultValue={localeActive} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent  className="bg-dark-2 z-[502]">
                <SelectGroup>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="uk">Українська</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="pl">Polski</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
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