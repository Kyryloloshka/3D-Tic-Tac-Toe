import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play game 4D Tic Tac Toe",
  description: "This page contains the game 4D Tic Tac Toe.",
};

export default function PlayGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
