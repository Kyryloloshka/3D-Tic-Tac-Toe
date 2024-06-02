import { useTranslations } from "next-intl";
import { rubik } from "../layout";
import CustomLink from "@/components/CustomLink";

const About = () => {
  const t = useTranslations("page.about");
  return (
    <div
      className={`${rubik.className} overflow-hidden text-light-2 flex-auto flex flex-col min-h-full common-container container-restrictive p-3 md:p-6 gap-5`}
    >
      <h1 className="text-3xl font-semibold text-shadow-neon text-primary-500 tracking-wide">
        {t("aboutTitle")}{" "}
        <span className=" whitespace-nowrap">3D Tic Tac Toe</span>
      </h1>
      <p className="leading-6 text-lg tracking-wide pb-3">
        {t("aboutMessage")}
      </p>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">
        {t("visionTitle")}
      </h2>
      <p className="leading-6 text-lg tracking-wide pb-3">
        {t("visionMessage")}
      </p>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">
        {t("featuresTitle")}
      </h2>
      <ol className="flex flex-col gap-3 ">
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {t("feature1Title")}
          </span>{" "}
          {t("feature1Description")}
        </li>
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {t("feature2Title")}
          </span>{" "}
          {t("feature2Description")}
        </li>
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {t("feature3Title")}
          </span>{" "}
          {t("feature3Description")}
        </li>
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {t("feature4Title")}
          </span>{" "}
          {t("feature4Description")}
        </li>
      </ol>
      <p className="leading-6 text-lg tracking-wide pt-8 pb-24">
        {t("enjoyMessage")}{" "}
        <CustomLink label={t("playGameLink")} href="/play-game" />
      </p>
    </div>
  );
};

export default About;
