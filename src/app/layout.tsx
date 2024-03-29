import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { RotationProvider } from "@/hooks/useRotation";

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
    <RotationProvider>
      <html lang="en">
        <body className={`${poppins.className} h-[100dvh] common-container flex flex-col relative`}>
          <Header/>
          <main className="flex-auto flex flex-col">
            {children}
          </main>
        </body>
      </html>
    </RotationProvider> );
}
