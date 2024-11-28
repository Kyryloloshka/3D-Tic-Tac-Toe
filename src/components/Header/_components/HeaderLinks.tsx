"use client";
import { INavLink } from "@/types";
import { usePathname } from "@/navigation";
import React, { use } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { headerActions, useActionCreators, useStateSelector } from "@/state";

const headerLinks = [
  {
    route: "/",
    label: "Home",
    translateKey: "home",
  },
  {
    route: "/play-game",
    label: "Play",
    translateKey: "play",
  },
  {
    route: "/rules",
    label: "Rules",
    translateKey: "rules",
  },
  {
    route: "/about-game",
    label: "About",
    translateKey: "about",
  },
  {
    route: "/four-d-game",
    label: "4D Game",
    translateKey: "4dGame",
  },
];

const HeaderLinks = () => {
  const t = useTranslations("navigation");
  const actions = useActionCreators(headerActions);
  const isOpenBurger = useStateSelector(
    (state) => state.header.isBurgerMenuOpen
  );
  const pathname = usePathname();
  return (
    <nav
      className={`${
        isOpenBurger ? "left-0" : "left-[-100%]"
      } md:left-0 transition-all absolute pt-16 md:relative min-h-[100dvh] md:min-h-[auto] min-w-[260px] md:min-w-[auto] top-0 bg-dark-2 p-3 md:p-0 z-[499]`}
    >
      <ul
        className={`flex-col items-start flex md:flex-row md:items-center gap-y-2 justify-center gap-x-[calc(5vw_-18px)] flex-wrap z-[501] `}
      >
        {headerLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <li
              onClick={() => actions.closeBurgerMenu()}
              className="relative"
              key={link.label}
            >
              <Link
                draggable="false"
                className={`link-underline capitalize md:text-[16px] text-xl ${
                  isActive && "text-primary-500 before:left-0 before:w-full"
                }`}
                href={link.route}
              >
                {t(link.translateKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderLinks;
