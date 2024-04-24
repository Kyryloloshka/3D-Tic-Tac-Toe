import { Metadata } from "next";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "About game 3D Tic Tac Toe",
  description: "All you need to know about the game 3D Tic Tac Toe.",
};

export default function AboutLayout({
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
