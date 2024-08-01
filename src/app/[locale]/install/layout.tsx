import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Install 3D Tic Tac Toe",
  description: "Here you can find the instructions to install 3D Tic Tac Toe",
};

export default function PlayGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
