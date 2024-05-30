import { Rubik, Rubik_Mono_One } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import Header from "@/components/Header";
import MainDragArea from "@/components/MainDragArea";
import StoreProvider from "@/components/StoreProvider";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

export const rubikMonoOne = Rubik_Mono_One({
  weight: ["400"],
  subsets: ["latin", "cyrillic"],
});
export const rubik = Rubik({
  weight: ["400", "300", "600"],
  subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <html lang={params.locale}>
      <body
        className={`${rubikMonoOne.className} h-[100dvh] common-container flex flex-col relative`}
        suppressHydrationWarning={true}
      >
        <StoreProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <MainDragArea>{children}</MainDragArea>
          </NextIntlClientProvider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
