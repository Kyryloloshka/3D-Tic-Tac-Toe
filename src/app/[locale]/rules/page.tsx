"use client"
import { useTranslations } from "next-intl"
import { Rubik } from "next/font/google";
import Link from "next/link"
import { rubik } from "../layout";


const Rules = () => {
  const t = useTranslations("page.rules")
  return (
    <div className={`${rubik.className} overflow-hidden text-light-2 flex-auto flex flex-col min-h-full common-container p-3 md:p-6 gap-5 container-restrictive`}>
      <h1 className="text-3xl font-semibold text-shadow-neon text-primary-500 tracking-wide">{t("rulesTitle")}</h1>
      <p className="leading-6 text-lg tracking-wide pb-3">{t("welcomeMessage")}</p>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">{t("gameInstructionsTitle")}</h2>
      <ol className="flex flex-col gap-3 ">
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("makeMoves")} </span>{t("makeMovesValue")}</li>
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("winTheGame")} </span>{t("winTheGameValue")}</li>
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("gameCompletion")} </span>{t("gameCompletionValue")} <a href="https://puzzling.stackexchange.com/questions/70699/can-you-tie-in-3d-tic-tac-toe" className="underline capitalize relative text-primary-500 hover:text-secondary-500 transition">{t("gameCompletionValue2")}</a> {t("gameCompletionValue3")} </li>
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("restartGame")} </span>{t("restartGameValue")}</li>
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("enjoyExperience")} </span>{t("enjoyExperienceValue")}</li>
      </ol>
      <p className="leading-6 text-lg tracking-wide pt-8 pb-24 ">
        {t("enjoyMessage")} <Link href="/play-game" className={`link-underline transition capitalize relative text-primary-500 whitespace-nowrap`}>{t("playGameLink")}</Link>
      </p>
    </div>
  )  
}

export default Rules