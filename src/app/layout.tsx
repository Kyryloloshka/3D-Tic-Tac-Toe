import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const poppins = Poppins({ weight: ["300", "400", "600"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "3D Tic Tac Toe",
  description: "tic-tac-toe in 3d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-[100dvh] flex flex-col`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
