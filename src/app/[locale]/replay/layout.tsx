import { Metadata } from "next";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "Replays of game 3D Tic Tac Toe",
  description: "This page contains the replays of the game 3D Tic Tac Toe.",
};

export default function PlayGameLayout({
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
