'use client';

import { Manager } from '../componets/Manager/Manager';
import { Search } from '../componets/Search/Search';
import { useSocket } from '@/hooks';

export default function Home() {
  useSocket();

  return (
    <main className="w-full h-screen grid">
      <div className="flex flex-col justify-center">
        <Search />
      </div>
      <div className="flex flex-col justify-center w-full h-full bg-[#f8f8f8]">
        <Manager />
      </div>
    </main>
  );
}
