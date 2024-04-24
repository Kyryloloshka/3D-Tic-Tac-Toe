import { Metadata } from "next";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "Rules of game 3D Tic Tac Toe",
  description: "This page contains the rules of the game 3D Tic Tac Toe.",
};

export default function RulesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();
  const locale = useLocale()
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
