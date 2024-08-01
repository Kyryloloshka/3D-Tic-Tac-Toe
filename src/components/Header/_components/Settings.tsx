"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Link, usePathname } from "@/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import CustomLink from "@/components/CustomLink";
import { CiMenuKebab } from "react-icons/ci";

const languages = [
  { label: "English", value: "en" },
  { label: "Українська", value: "uk" },
  { label: "Deutsch", value: "de" },
  { label: "Polski", value: "pl" },
  { label: "Français", value: "fr" },
  { label: "日本語", value: "ja" },
  { label: "Português", value: "pt" },
  { label: "Español", value: "es" },
];

const Settings = () => {
  const localeActive = useLocale();
  const t = useTranslations("navigation");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const handleLanguageChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}/${pathname}`);
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-5 cursor-pointer">
          <div className="h-6 w-6 flex-center rounded-full transition">
            <CiMenuKebab size={36} />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-2 p-2 mr-3 md:mr-6 z-[501] flex flex-col gap-1">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Select
            defaultValue={localeActive}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent className="bg-dark-2 z-[502]">
              <SelectGroup>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("links")}</DropdownMenuLabel>
          <DropdownMenuItem>
            <CustomLink href="/replay" label={t("replays")} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CustomLink href="/install" label={t("instalation")} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
