import CustomLink from "@/components/CustomLink";
import { useTranslations } from "next-intl";
import React from "react";
import { rubik } from "../layout";

const InstallPage = () => {
  const t = useTranslations("page.install");
  return (
    <div
      className={`${rubik.className} overflow-hidden text-light-2 flex-auto flex flex-col w-full min-h-full common-container p-3 md:p-6 gap-5 container-restrictive`}
    >
      <h1 className="text-3xl font-semibold text-shadow-neon text-primary-500 tracking-wide">
        {t("title")}
      </h1>
      <p className="leading-6 text-lg tracking-wide pb-3">{t("description")}</p>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">
        Windows
      </h2>
      <ul className="flex flex-col gap-3">
        <li className="tracking-wide">
          <span>{t("msi")}</span>
          {" - "}
          <a
            className="link-underline transition relative text-primary-500 whitespace-nowrap"
            href="/desktop/desktop-3d-tic-tac-toe_0.1.0_x64_en-US.msi"
            download
          >
            3d-tic-tac-toe_x64_en-US.msi
          </a>
        </li>
        <li className="tracking-wide">
          <span>{t("exe")}</span>
          {" - "}
          <a
            className="link-underline transition relative text-primary-500 whitespace-nowrap"
            href="/desktop/desktop-3d-tic-tac-toe_0.1.0_x64-setup.exe"
            download
          >
            3d-tic-tac-toe_x64_setup.exe
          </a>
        </li>
      </ul>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">
        MacOS
      </h2>
      <p>{t("missMacOS")}</p>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide">
        Linux
      </h2>
      <p>{t("missLinux")}</p>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide mt-10">
        {t("systemRequirements")}
      </h2>
      <ul className="flex flex-col gap-3">
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {t("minimum")}
          </span>{" "}
          {t("minimumInfo")}
        </li>
        <li>
          <span className="font-semibold text-shadow-neon text-primary-500">
            {t("recommend")}
          </span>{" "}
          {t("recommendInfo")}
        </li>
      </ul>
      <h2 className="text-2xl font-semibold text-shadow-neon text-primary-500 tracking-wide mt-10">
        {t("instructionsTitle")}
      </h2>
      <ol className="flex flex-col gap-3">
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {"1) =>"}
          </span>{" "}
          {t("instruct1")}
        </li>
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {"2) =>"}
          </span>{" "}
          {t("instruct2")}
        </li>
        <li className="tracking-wide">
          <span className="font-semibold text-shadow-neon text-primary-500">
            {"3) =>"}
          </span>{" "}
          {t("instruct3")}
        </li>
      </ol>
    </div>
  );
};

export default InstallPage;
