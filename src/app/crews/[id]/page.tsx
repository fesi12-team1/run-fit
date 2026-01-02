'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useJoinCrew, useLeaveCrew } from '@/api/mutations/crewMutations';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';
import Share from '@/assets/icons/share.svg';
import CrewMemberList from '@/components/crew/CrewMemberList';
import ReviewCard from '@/components/crew/ReviewCard';
import ReviewPagination from '@/components/crew/ReviewPagination';
import FixedBottomBar from '@/components/layout/FixedBottomBar';
import CompletedSessionCard from '@/components/session/CompletedSessionCard';
import SessionCard from '@/components/session/SessionCard';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import Tabs from '@/components/ui/Tabs';
import { CrewDetailContext, useCrewRole } from '@/context/CrewDetailContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { generateNextImageSizes } from '@/lib/Image';
import { cn, copyStringToClipboard } from '@/lib/utils';
import { CrewMember } from '@/types';

export default function Page() {
  const params = useParams<{ id: string }>();
  const crewId = Number(params.id);

  const searchParams = useSearchParams();
  const pageFilter = Number(searchParams.get('page'))
    ? Number(searchParams.get('page')) - 1
    : 0;
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(pageFilter);

  useEffect(() => {
    setCurrentPage(pageFilter);
  }, [pageFilter]);

  // Detect mobile screen size
  const isMobile = useMediaQuery({ max: 'tablet' });

  // fetch queries
  const { data: crew, isError: isCrewQueriesError } = useQuery(
    crewQueries.detail(crewId)
  );

  // Redirect to /crews if there's no crew data or error
  useEffect(() => {
    if (isCrewQueriesError) {
      router.push('/crews');
    }
  }, [isCrewQueriesError, router]);

  const { data: crewMembers } = useQuery(
    crewQueries.members(crewId).list({
      sort: 'roleAsc',
    })
  );
  const members = [...(crewMembers?.members || [])].filter(
    (member): member is CrewMember => member !== undefined
  );

  // 모집중인 세션
  const {
    data: recruitingSessions,
    fetchNextPage: fetchNextRecruitingSessions,
    hasNextPage: hasNextRecruitingSessions,
    isFetching: isFetchingRecruitingSessions,
  } = useInfiniteQuery(
    sessionQueries.infiniteList({
      size: 10,
      crewId,
      sort: 'registerByAsc',
      status: 'OPEN',
    })
  );

  const recruitingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = recruitingRef.current;
    if (!el || !hasNextRecruitingSessions) return;

    const handleScroll = () => {
      const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 20;

      if (isEnd && !isFetchingRecruitingSessions) {
        fetchNextRecruitingSessions();
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [
    hasNextRecruitingSessions,
    isFetchingRecruitingSessions,
    fetchNextRecruitingSessions,
  ]);

  // 마감된 세션
  const { data: completedSessions } = useQuery(
    sessionQueries.list({
      page: 0,
      size: 3,
      crewId,
      sort: 'sessionAtAsc',
      status: 'CLOSED',
    })
  );

  const { data: myProfile } = useQuery(userQueries.me.info());
  const { data: myRoleData } = useQuery({
    ...crewQueries.members(crewId).detail(myProfile?.id ?? 0),
    enabled: !!myProfile?.id,
  });

  // Fetch crew reviews with simple useQuery
  const { data: crewReviewsData, isLoading: isLoadingCrewReviews } = useQuery(
    crewQueries.reviews(crewId).list({ page: currentPage, size: 4 })
  );

  const reviews = crewReviewsData?.content || [];
  const totalElements = crewReviewsData?.totalElements ?? 0;
  const totalPages = crewReviewsData?.totalPages ?? 0;

  if (!crew) return null;

  return (
    <>
      <CrewDetailContext value={{ crewId: crew.id, myRole: myRoleData?.role }}>
        {crew && (
          <div className="h-main laptop:bg-gray-850 flex flex-col items-center bg-gray-800 pb-20">
            {/* Crew Image */}
            <div
              className={cn(
                'relative w-full bg-gray-800',
                'laptop:mt-10 laptop:mb-[52px] laptop:max-w-[1120px] laptop:bg-gray-850',
                'laptop:h-[300px] tablet:h-60 h-[174px]'
              )}
            >
              <Image
                src={crew?.image || '/assets/crew-default.png'}
                alt="Crew"
                fill
                preload
                className="laptop:rounded-[20px] overflow-hidden object-cover"
                sizes={generateNextImageSizes({
                  mobile: '100vw',
                  tablet: '100vw',
                  laptop: '1120px',
                })}
              />
            </div>
            {/* Crew Page Main */}
            <div className="laptop:max-w-[1120px] laptop:flex-row laptop:gap-10 flex w-full flex-col-reverse">
              {/* Crew Crew Info */}
              <div
                className={cn(
                  'laptop:px-3 flex w-full flex-col px-6',
                  'tablet:gap-y-8 laptop:gap-y-10 laptop:max-w-[720px] gap-y-6'
                )}
              >
                <Tabs
                  defaultValue="1"
                  className="tablet:top-15 laptop:bg-gray-850 sticky top-14 z-10 bg-gray-800"
                >
                  <Tabs.List>
                    <Tabs.Trigger
                      value="1"
                      onClick={() => router.push('#detail')}
                      className="laptop:bg-gray-850 bg-gray-800"
                    >
                      상세 정보
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="2"
                      onClick={() => router.push('#session')}
                      className="laptop:bg-gray-850 bg-gray-800"
                    >
                      모집 중인 세션
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="3"
                      onClick={() => router.push('#review')}
                      className="laptop:bg-gray-850 bg-gray-800"
                    >
                      후기
                    </Tabs.Trigger>
                  </Tabs.List>
                </Tabs>
                <section id="detail" className="flex flex-col gap-2">
                  <h2
                    className={cn(
                      'text-gray-50',
                      'tablet:text-title3-semibold text-body2-semibold'
                    )}
                  >
                    크루 소개
                  </h2>
                  <div
                    className={cn(
                      'tablet:text-body2-regular tablet:text-gray-100',
                      'text-body3-regular text-gray-200'
                    )}
                  >
                    {crew?.description}
                  </div>
                </section>
                <section id="session" className="flex flex-col gap-4">
                  <h2
                    className={cn(
                      'text-gray-50',
                      'tablet:text-title3-semibold text-body2-semibold'
                    )}
                  >
                    모집중인 세션
                  </h2>
                  {recruitingSessions &&
                  recruitingSessions.sessions.length > 0 ? (
                    <>
                      <div
                        ref={recruitingRef}
                        className="flex gap-3 overflow-x-auto"
                      >
                        {recruitingSessions.sessions.map((session) => (
                          <div
                            key={session.id}
                            className="laptop:w-[calc((100%-24px)/3)] w-[calc((100%-12px)/2)] shrink-0"
                          >
                            <SessionCard
                              session={session}
                              displayParticipants={false}
                              textSize="sm"
                            />
                          </div>
                        ))}
                        {isFetchingRecruitingSessions && (
                          <div className="flex shrink-0 items-center px-4">
                            <Spinner className="text-brand-500 size-5" />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <span
                      className={cn(
                        'self-center justify-self-center text-gray-300',
                        'text-body3-regular py-2.5',
                        'tablet:text-body2-medium tablet:py-5 tablet:mb-4'
                      )}
                    >
                      현재 모집중인 세션이 없어요
                    </span>
                  )}
                </section>
                <section className="flex flex-col gap-4">
                  <h2
                    className={cn(
                      'text-gray-50',
                      'tablet:text-title3-semibold text-body2-semibold'
                    )}
                  >
                    마감된 세션
                  </h2>
                  {completedSessions && completedSessions.content.length > 0 ? (
                    <>
                      <div className="flex flex-col divide-y divide-gray-700 *:py-2">
                        {completedSessions.content.map((session) => (
                          <CompletedSessionCard
                            key={session.id}
                            session={session}
                          />
                        ))}
                      </div>
                      <Button
                        variant="neutral"
                        size="xs"
                        className={cn(
                          'self-center rounded-[10px]',
                          'tablet:w-[620px] laptop:w-[140px] w-[270px]'
                        )}
                        disabled={!completedSessions.hasNext}
                      >
                        더 보기
                      </Button>
                    </>
                  ) : (
                    <span
                      className={cn(
                        'self-center justify-self-center text-gray-300',
                        'text-body3-regular py-2.5',
                        'tablet:text-body2-medium tablet:py-5 tablet:mb-4'
                      )}
                    >
                      아직 마감된 세션이 없어요
                    </span>
                  )}
                </section>
                <section
                  id="review"
                  className="flex flex-col gap-3 border-t border-t-gray-700 py-5"
                >
                  <div className="flex gap-2">
                    <h2
                      className={cn(
                        'text-gray-50',
                        'tablet:text-title3-semibold text-body2-semibold'
                      )}
                    >
                      후기
                    </h2>
                    <span className="text-title3-semibold text-brand-300">
                      {totalElements}
                    </span>
                  </div>
                  {reviews && totalElements > 0 ? (
                    <>
                      <div
                        className={cn(
                          'flex flex-col divide-y divide-dashed divide-gray-500',
                          '*:pb-4 not-first:*:pt-4'
                        )}
                      >
                        {reviews.map((review) => (
                          <ReviewCard key={review.id} data={review} />
                        ))}
                      </div>
                      <ReviewPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                          setCurrentPage(page);
                          router.push(`/crews/${crewId}?page=${page + 1}`, {
                            scroll: false,
                          });
                        }}
                        isMobile={isMobile}
                        isLoading={isLoadingCrewReviews}
                      />
                    </>
                  ) : (
                    <span
                      className={cn(
                        'self-center justify-self-center text-gray-300',
                        'text-body3-regular py-2.5',
                        'tablet:text-body2-medium tablet:py-5 tablet:mb-4'
                      )}
                    >
                      아직 작성된 후기가 없어요
                    </span>
                  )}
                </section>
              </div>

              {/* Crew Title */}
              <div className="laptop:w-[360px] laptop:shrink-0 laptop:bg-gray-850 z-1 -mt-8 w-full flex-col self-start rounded-[20px] bg-gray-800 px-6 py-7 shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.20)]">
                <CrewMemberList crew={crew} members={members}>
                  <div className="laptop:flex hidden flex-col">
                    <PageAction className="my-8" />
                    <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-zinc-700" />
                    <div className="flex items-center gap-1">
                      <span className="text-body2-semibold my-4 text-gray-50">
                        멤버
                      </span>
                      <span className="text-body1-semibold text-brand-300">
                        {crewMembers?.members.length}
                      </span>
                    </div>
                  </div>
                </CrewMemberList>
              </div>
            </div>
          </div>
        )}

        <FixedBottomBar>
          <PageAction />
        </FixedBottomBar>
      </CrewDetailContext>
    </>
  );
}

function PageAction({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentModal, setCurrentModal] = useState<
    'share' | 'join' | 'leave' | null
  >(null);

  const { crewId, myRole } = useCrewRole();
  const isCrewAdmin = myRole === 'LEADER' || myRole === 'STAFF';

  const joinCrew = useJoinCrew(crewId ?? 0);
  const leaveCrew = useLeaveCrew(crewId ?? 0);

  const handleShare = async () => {
    await copyStringToClipboard(window.location.href);
    toast.success('세션 크루 URL 주소가 복사되었어요!');
  };

  const handleCreateSession = () => {
    router.push(`/crews/${crewId}/create-session`);
  };

  const handleJoinCrew = () => {
    joinCrew.mutate(undefined, {
      onError: () => {
        setCurrentModal('join');
      },
    });
  };

  const handleLeaveCrew = () => {
    setCurrentModal('leave');
  };

  return (
    <>
      <div className={cn('flex items-center gap-7', className)}>
        <button
          type="button"
          aria-label="크루 링크 공유하기"
          onClick={handleShare}
        >
          <Share className="size-6 text-[#9CA3AF]" />
        </button>

        {!myRole ? (
          <Button
            className="text-body2-semibold flex-1 px-6 py-3"
            onClick={handleJoinCrew}
          >
            가입하기
          </Button>
        ) : isCrewAdmin ? (
          <Button
            className="text-body2-semibold flex-1 px-6 py-3"
            onClick={handleCreateSession}
          >
            세션 생성하기
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="text-body2-semibold flex-1 px-6 py-3"
            onClick={handleLeaveCrew}
          >
            크루 나가기
          </Button>
        )}
      </div>

      {/* Join Crew Modal (Login Required) */}
      <Modal
        open={currentModal === 'join'}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton />
          <Modal.Description>
            크루에 가입하려면 로그인이 필요해요!
          </Modal.Description>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button
                className="text-body2-semibold flex-1 px-6 py-3"
                onClick={() => {
                  router.push(`/signin?redirect=${pathname}`);
                }}
              >
                로그인 하기
              </Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Leave Crew Modal */}
      <Modal
        open={currentModal === 'leave'}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton />
          <Modal.Description>정말 탈퇴하시겠어요?</Modal.Description>
          <Modal.Footer className="w-full flex-row">
            <div className="flex w-full flex-row gap-2">
              <Modal.Close asChild>
                <Button className="w-full shrink" variant="neutral">
                  취소
                </Button>
              </Modal.Close>
              <Button
                className="w-full shrink"
                disabled={leaveCrew.isPending}
                onClick={() => {
                  leaveCrew.mutate(undefined, {
                    onSettled: () => setCurrentModal(null),
                  });
                }}
              >
                {leaveCrew.isPending ? '처리 중...' : '나가기'}
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
