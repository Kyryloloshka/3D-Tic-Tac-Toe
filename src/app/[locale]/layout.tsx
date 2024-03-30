"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/state/store";

const inter = Inter({ weight: ["300", "400", "600"], subsets: ['latin'] });

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <Provider store={store}>
      <html lang={params.locale}>
        <body className={`${inter.className} h-[100dvh] common-container flex flex-col relative`}>
            <Header/>
            <main className="flex-auto flex flex-col">
              {children}
            </main>
        </body>
      </html>
    </Provider>
  );
}
