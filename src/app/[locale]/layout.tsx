"use client"
import { Rubik_Mono_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { Analytics } from "@vercel/analytics/react"

const rubikMonoOne = Rubik_Mono_One({weight: ["400"], subsets: ["latin", "cyrillic"]});

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <Provider store={store}>
      <html lang={params.locale} >
        <body className={`${rubikMonoOne.className} h-[100dvh] common-container flex flex-col relative`}>
          <Analytics/>
          <Header/>
          <main className="flex-auto flex flex-col">
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
}
