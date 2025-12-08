'use client';

import SessionCard from '@/components/session/SessionCard';

export default function Page() {
  return (
    <div className="tablet:mx-8 laptop:mx-100 mx-4 flex h-screen flex-col items-center gap-12">
      <div>
        <span className="tablet:hidden text-white">mobile</span>
        <span className="tablet:inline-flex laptop:hidden hidden text-white">
          tablet
        </span>
        <span className="laptop:inline-flex hidden text-white">laptop</span>
      </div>
      <ul className="tablet:grid-cols-3 tablet:gap-6 tablet:gap-x-4 tablet:gap-y-10 grid w-full grid-cols-2 gap-x-3 gap-y-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <SessionCard key={index} /> // 실제로는 sessionId를 key로 사용
        ))}
      </ul>
    </div>
  );
}
