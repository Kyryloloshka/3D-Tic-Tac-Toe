import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();
  const locale = useLocale()
  console.log(messages, locale);
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
