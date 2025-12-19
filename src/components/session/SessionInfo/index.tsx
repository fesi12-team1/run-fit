import Image from 'next/image';
import { formatTimeToKorean } from '@/lib/time';
import { Session } from '@/types';

interface SessionInfoProps {
  data: Session;
}

export default function SessionInfo({ data: session }: SessionInfoProps) {
  const sessionAt = new Date(session.sessionAt);
  const sessionDate = `${sessionAt.getFullYear()}년 ${sessionAt.getMonth() + 1}월 ${sessionAt.getDate()}일`;
  const sessionTime = formatTimeToKorean(
    sessionAt.getHours(),
    sessionAt.getMinutes()
  );

  return (
    <div className="flex w-full gap-2 rounded-xl bg-gray-700 p-2">
      <div className="relative aspect-video w-16 rounded-lg">
        <Image
          src={session.image || '/assets/session-default.png'}
          alt="Crew"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-end">
        <div className="text-caption-semibold line-clamp-1 text-gray-50">
          {session.name}
        </div>
        <div className="text-caption-regular text-gray-300">
          {`${sessionDate} • ${sessionTime}`}
        </div>
      </div>
    </div>
  );
}
