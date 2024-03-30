"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

const About = () => {
  const t = useTranslations("page.about")
  return (
    <div className="overflow-hidden flex-auto flex flex-col min-h-full common-container container-restrictive p-6 gap-5">
      <h1 className="text-3xl font-semibold text-shadow-neon text-primary-500 tracking-wide">{t("aboutTitle")} <span className=" whitespace-nowrap">3D Tic Tac Toe</span></h1>
      <p className="leading-6 text-lg tracking-wide pb-3">{t("aboutMessage")}</p>
      <h3 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">{t("visionTitle")}</h3>
      <p className="leading-6 text-lg tracking-wide pb-3">{t("visionMessage")}</p>
      <h3 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">{t("featuresTitle")}</h3>
      <ol className="flex flex-col gap-3 ">
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("feature1Title")}</span> {t("feature1Description")}</li>
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("feature2Title")}</span> {t("feature2Description")}</li>
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("feature3Title")}</span> {t("feature3Description")}</li>
        <li className="tracking-wide"><span className="font-semibold text-shadow-neon text-primary-500">{t("feature4Title")}</span> {t("feature4Description")}</li>
      </ol>
      <p className="leading-6 text-lg tracking-wide pt-8 pb-24">
        {t("enjoyMessage")} <Link href="/play-game" className={`link-underline capitalize relative text-primary-500`}>{t("playGameLink")}</Link>
      </p>
    </div>
  )  
}

export default About