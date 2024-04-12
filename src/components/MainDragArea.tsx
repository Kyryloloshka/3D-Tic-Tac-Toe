import React, { PropsWithChildren, useState } from 'react'
import { useToast } from './ui/use-toast';
import { replayActions, useActionCreators } from '@/state';
import { useRouter } from 'next/navigation';

const MainDragArea = (props: PropsWithChildren) => {
  const [isDragZone, setIsDropZone] = useState<boolean>(false);
  const {toast} = useToast();
  const actions = useActionCreators(replayActions);
  const router = useRouter();
  return (
    <main 
      className={`flex-auto relative flex flex-col min-h-full`}
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
          if (file.type === "application/json") { 
            const reader = new FileReader();
            reader.onload = (event: any) => {
              const content = event.target.result;
              actions.loadMovesHistory(JSON.parse(content));
            };
            reader.readAsText(file);
            router.push("/replay");
          } else {
            toast({
              title: "We cannot process this file",
              description: `Please upload a JSON file`,
            })
          }
        });
      }}
    >
      {props.children}
      <div className={`absolute gap-3 p-5 bg-dark-1/30 top-0 left-0 w-full h-full transition pointer-events-none z-100 flex justify-center items-center opacity-0 ${isDragZone && "opacity-100"}`}>
        <img src="/assets/icons/file.svg" className="h-[calc(2vw+60px)] file-drag" alt="file" />
        <h2 className="text-2xl text-center text-shadow-neon text-primary-500">Drag your file here</h2>
      </div>
    </main>
  )
}

export default MainDragArea