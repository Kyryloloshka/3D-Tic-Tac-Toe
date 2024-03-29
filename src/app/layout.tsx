"use client"
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/state/store";

const poppins = Poppins({ weight: ["300", "400", "600"], subsets: ['latin'] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${poppins.className} h-[100dvh] common-container flex flex-col relative`}>
          <Header/>
          <main className="flex-auto flex flex-col">
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
}
