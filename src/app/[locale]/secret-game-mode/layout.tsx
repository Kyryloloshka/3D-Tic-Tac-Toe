import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secret gamemode of game 3D Tic Tac Toe",
  description: "On this page you can go to the secret mode of the game 3D Tic Tac Toe",
};

export default function RulesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
