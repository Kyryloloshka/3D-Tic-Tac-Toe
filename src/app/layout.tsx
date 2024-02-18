import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: ["300", "400", "600"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "3d tic-tac-toe",
  description: "tic-tac-toe in 3d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
