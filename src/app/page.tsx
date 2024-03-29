import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Home: React.FC = () => {
  return <div className='flex justify-center items-center min-h-[100%] flex-auto gap-10 p-5 overflow-x-hidden'>
    <div className="absolute top-1/2 left-1/2 text-[13vw] whitespace-nowrap -z-10 opacity-5 -translate-y-[50%] font-semibold -translate-x-[50%]">3D Tic Tac Toe</div>
    <div className="flex flex-col gap-5 justify-center items-center flex-auto">
      <h1 className='text-[calc(4vw+20px)] font-semibold text-primary-500 text-shadow-neon '>3D Tic Tac Toe</h1>
      <p className='text-sm tracking-wider text-center max-w-[550px] pb-3'>
      Welcome to the exciting world of 3D Tic Tac Toe! Immerse yourself in a unique 3D experience where you will have the opportunity to deploy your strategy in 3D space and test your mental acuity in a new dimension of this classic game.
      </p>
      <Link href={"/play-game"}> <Button className='px-12 text-xl py-5' variant="neon">Play</Button> </Link>
    </div>
    <p className="absolute left-3 bottom-2 text-primary-500 text-shadow-neon">0.1.4</p>
  </div>
};
export default Home