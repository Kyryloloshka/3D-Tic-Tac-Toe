"use client"
import { Rubik, Rubik_Mono_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import MainDragArea from "@/components/MainDragArea";

export const rubikMonoOne = Rubik_Mono_One({weight: ["400"], subsets: ["latin", "cyrillic"]});
export const rubik = Rubik({weight: ["400", "300", "600"], subsets: ["latin", "cyrillic"]});

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
          <Header/>
          <MainDragArea>
            {children}
          </MainDragArea>
        </body>
      </html>
    </Provider>
  );
}
