import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { userQueries } from '@/api/queries/userQueries';
import ReviewModal from '@/components/my/ReviewModal';
import CompletedSessionCard from '@/components/session/CompletedSessionCard';
import Button from '@/components/ui/Button';
import EmptyLayout from '@/components/ui/EmptyLayout';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ParticipatingSession, Session } from '@/types';

export default function CompletedSessionsContent({
  completedSessions,
  fetchNextCompleted,
  hasNextCompleted,
  isFetchingNextCompleted,
}: {
  completedSessions: { sessions: ParticipatingSession[] };
  fetchNextCompleted: () => void;
  hasNextCompleted: boolean;
  isFetchingNextCompleted: boolean;
}) {
  const isMobile = useMediaQuery({ max: 'tablet' });
  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const { data: userInfo } = useQuery(userQueries.me.info());

  const completedRef = useInfiniteScroll(fetchNextCompleted, hasNextCompleted);

  const normalizeSession = (session: ParticipatingSession): Session => ({
    ...session,
    description: '',
  });

  const handleOpenReview = (session: ParticipatingSession) => {
    setSelectedSession(normalizeSession(session));
    setOpen(true);
  };

  const hasNoCompleted = completedSessions?.sessions.length == 0;

  if (hasNoCompleted) {
    return (
      <EmptyLayout className="h-[20vh]">
        <EmptyLayout.Message>아직 완료된 세션이 없어요!</EmptyLayout.Message>
      </EmptyLayout>
    );
  }

  return (
    <>
      <div className="tablet:gap-3 flex flex-col gap-2">
        {completedSessions?.sessions.map((session, index) => {
          const isHost = userInfo ? session.hostUserId === userInfo.id : false;
          const showReviewButton = !session.reviewed && userInfo && !isHost;

          return (
            <div key={session.id} className="flex flex-col gap-3">
              <CompletedSessionCard
                session={normalizeSession(session)}
                size={isMobile ? 'sm' : 'lg'}
                showRanks={false}
                action={
                  showReviewButton ? (
                    <Button
                      variant={'outlined'}
                      size={isMobile ? 'sm' : 'default'}
                      className="tablet:px-6 px-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenReview(session);
                      }}
                    >
                      리뷰 작성하기
                    </Button>
                  ) : (
                    <div /> // pace, level 배지 표시를 위해 빈 div 전달
                  )
                }
                actionPlacement={isMobile ? 'bottom' : 'side'}
              />
              {index !== completedSessions.sessions.length - 1 && (
                <hr className="border-gray-750 w-full" />
              )}
            </div>
          );
        })}
        <div ref={completedRef} className="h-5" />

        {isFetchingNextCompleted && <Spinner.Scroll />}
      </div>

      <ReviewModal open={open} setOpen={setOpen} session={selectedSession} />
    </>
  );
}
