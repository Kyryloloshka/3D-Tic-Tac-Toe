"use client"
import { Rubik, Rubik_Mono_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { Analytics } from "@vercel/analytics/react"
import { useState } from "react";

export const rubikMonoOne = Rubik_Mono_One({weight: ["400"], subsets: ["latin", "cyrillic"]});
export const rubik = Rubik({weight: ["400", "300", "600"], subsets: ["latin", "cyrillic"]});

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const [isDragZone, setIsDropZone] = useState<boolean>(false);
  return (
    <Provider store={store}>
      <html lang={params.locale} >
        <body className={`${rubikMonoOne.className} h-[100dvh] common-container flex flex-col relative`}>
          <Analytics/>
          <Header/>
          <main 
          className={`flex-auto relative flex flex-col`}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDropZone(true);
            }}
            onDragLeave={(e) => {
              setIsDropZone(false);  
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDropZone(false);  
              const files = Array.from(e.dataTransfer.files);
              files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                  const content = event.target.result;
                  console.log(content);
                };
                reader.readAsText(file);
              });
            }}
          >
            {children}
            <div className={`absolute transition gap-3 p-5 bg-dark-1/30 top-0 left-0 w-full h-full transition pointer-events-none z-100 flex justify-center items-center opacity-0 ${isDragZone && "opacity-100"}`}>
              <img src="/assets/icons/file.svg" className="h-[calc(2vw+60px)] file-drag" alt="file" />
              <h2 className="text-2xl text-center text-shadow-neon text-primary-500">Drag your file here</h2>
            </div>
          </main>
        </body>
      </html>
    </Provider>
  );
}
