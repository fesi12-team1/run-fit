import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import SessionCard from '@/components/session/SessionCard';
import EmptyLayout from '@/components/ui/EmptyLayout';
import Spinner from '@/components/ui/Spinner';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ParticipatingSession, Session } from '@/types';

export function ScheduledSessionsContent({
  scheduledSessions,
  fetchNextScheduled,
  hasNextScheduled,
  isFetchingNextScheduled,
}: {
  scheduledSessions: { sessions: ParticipatingSession[] };
  fetchNextScheduled: () => void;
  hasNextScheduled: boolean;
  isFetchingNextScheduled: boolean;
}) {
  const scheduledRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const isMobile = useMediaQuery({ max: 'tablet' });

  const normalizeSession = (session: ParticipatingSession): Session => ({
    ...session,
    description: '',
  });

  useEffect(() => {
    const el = scheduledRef.current;
    if (!el || !hasNextScheduled) return;

    const handleScroll = () => {
      const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 20;

      if (isEnd && !isFetchingNextScheduled) {
        fetchNextScheduled();
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [hasNextScheduled, isFetchingNextScheduled, fetchNextScheduled]);

  const hasNoScheduled = scheduledSessions?.sessions.length === 0;

  if (hasNoScheduled) {
    return (
      <EmptyLayout>
        <Image
          width={isMobile ? 150 : 200}
          height={isMobile ? 136 : 181}
          src="/assets/session-default.png"
          alt="예정된 세션 없음"
        />
        <EmptyLayout.Message>
          아직 예정된 세션이 없어요
          <br />
          다양한 세션을 구경하러 가볼까요?
        </EmptyLayout.Message>
        <EmptyLayout.Button onClick={() => router.push('/sessions')}>
          세션 구경하러 가기
        </EmptyLayout.Button>
      </EmptyLayout>
    );
  }

  return (
    <div
      ref={scheduledRef}
      className="tablet:gap-4 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent"
    >
      {scheduledSessions?.sessions.map((session) => (
        <div
          key={session.id}
          className="laptop:w-[calc((100%-32px)/3)] tablet:w-[calc((100%-16px)/2)] w-[calc((100%-12px)/2)] shrink-0"
        >
          <SessionCard session={normalizeSession(session)} textSize="sm" />
        </div>
      ))}
      {isFetchingNextScheduled && <Spinner.Scroll />}
    </div>
  );
}
