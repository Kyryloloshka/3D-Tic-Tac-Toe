import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About game 3D Tic Tac Toe",
  description: "All you need to know about the game 3D Tic Tac Toe.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
