"use client"
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const Recomendation = () => {
  const [isShowRecomendation, setIsShowRecomendation] = useState(true)
  const t = useTranslations("toast");
  return (
    <div className={`${!isShowRecomendation && "hidden opacity-0"} bg-primary-500 text-center md:hidden md:opacity-0 select-none px-3 text-dark-2 flex gap-3 justify-center items-center`}>{t("experience")} <span onClick={() => setIsShowRecomendation(false)} className="cross"></span></div>
  )
}

export default Recomendation