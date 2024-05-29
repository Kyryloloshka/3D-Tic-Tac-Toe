import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules of game 3D Tic Tac Toe",
  description: "This page contains the rules of the game 3D Tic Tac Toe.",
};

export default function RulesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
