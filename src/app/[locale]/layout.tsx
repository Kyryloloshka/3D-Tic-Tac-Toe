"use client"
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { Analytics } from "@vercel/analytics/react"

const rubik = Rubik({weight: ["400", "600", "300"], subsets: ["latin", "cyrillic"]});

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
        <Analytics/>
        <body className={`${rubik.className} h-[100dvh] common-container flex flex-col relative`}>
            <Header/>
            <main className="flex-auto flex flex-col">
              {children}
            </main>
        </body>
      </html>
    </Provider>
  );
}
