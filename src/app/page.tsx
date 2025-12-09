'use client';

import { useEffect, useState } from 'react';
import { Crew } from '@/types/crew';

export default function HomePage() {
  const [crews, setCrews] = useState<Crew[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/crews');
      const data = await response.json();
      setCrews(data);
    }
    fetchData();
  }, []);

  return (
    <main className="h-main flex items-center justify-center">
      <p className="text-title1-semibold bg-brand-500 tablet:bg-brand-600 laptop:bg-brand-700 desktop:bg-gray-200 p-5">
        Hello, world!
      </p>

      {crews &&
        crews.map((crew) => (
          <div key={crew.id} className="text-white">
            {crew.name}
          </div>
        ))}
    </main>
  );
}
