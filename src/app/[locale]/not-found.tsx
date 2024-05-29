import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("page.not-found");
  const navt = useTranslations("navigation");
  return (
    <div className="capitalize text-center flex-col gap-3 justify-center items-center flex-auto flex mt-[-50px]">
      <span className="text-5xl text-primary-500 text-shadow-neon font-semibold pb-[10px]">
        404
      </span>
      <h1 className="text-lg">{t("text")}</h1>
      <Link
        href="/"
        className="link-underline capitalize relative  whitespace-nowrap "
      >
        {navt("home")}
      </Link>
    </div>
  );
}
