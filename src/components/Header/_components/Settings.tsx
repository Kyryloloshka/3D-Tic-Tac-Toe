"use client"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { usePathname } from "@/navigation"
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
import { useLocale, useTranslations } from 'next-intl'

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
  const localeActive = useLocale()
  const t = useTranslations("navigation");
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const pathname = usePathname();
  const handleLanguageChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}/${pathname}`)
    })
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-5 cursor-pointer">
          <div className="h-6 w-6 flex-center rounded-full transition svg-settings">
            <img src="/assets/icons/settings.svg" alt="settings" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-2 p-2 mr-3 md:mr-6 z-[501] flex flex-col gap-1">
        <DropdownMenuItem>{t("language")}</DropdownMenuItem>
        <DropdownMenuGroup>
          <Select defaultValue={localeActive} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent  className="bg-dark-2 z-[502]">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Settings