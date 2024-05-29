import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replays of game 3D Tic Tac Toe",
  description: "This page contains the replays of the game 3D Tic Tac Toe.",
};

export default function PlayGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
