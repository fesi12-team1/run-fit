import { Dot } from 'lucide-react';
import Image from 'next/image';
import { formatTimeToKorean } from '@/lib/time';
import { Session } from '@/types';

interface SessionInfPropsProps {
  data: Session;
}

export default function SessionInfo({ data }: SessionInfPropsProps) {
  const sessionAt = new Date(data.sessionAt);
  const sessionDate = `${sessionAt.getFullYear()}년 ${sessionAt.getMonth() + 1}월 ${sessionAt.getDate()}일`;
  const sessionTime = formatTimeToKorean(
    sessionAt.getHours(),
    sessionAt.getMinutes()
  );

  return (
    <div className="flex w-full gap-2 rounded-xl bg-gray-700 p-2">
      <div className="relative aspect-video w-16 rounded-lg">
        <Image
          src="/session.local.jpg"
          alt="Crew"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-end">
        <div className="text-caption-semibold text-gray-50">{data.name}</div>
        <div className="text-caption-regular text-gray-300">
          {`${sessionDate}`}
          <Dot />
          {`${sessionTime}`}
        </div>
      </div>
    </div>
  );
}
