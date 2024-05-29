import { useTranslations } from "next-intl";
import React from "react";

const Loading = () => {
  const t = useTranslations("loading");
  return (
    <div className="min-h-full w-full flex gap-1 flex-auto overflow-hidden justify-center items-center">
      <span className="text-xl capitalize font-semibold text-shadow-neon text-primary-500">
        {t("loading")}
      </span>
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
