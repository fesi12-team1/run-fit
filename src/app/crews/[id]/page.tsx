'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
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
import Tabs from '@/components/ui/Tabs';
import { CrewDetailContext, useCrewRole } from '@/context/CrewDetailContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
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
  const { data: crew } = useQuery(crewQueries.detail(crewId));

  const { data: crewMembers } = useQuery(
    crewQueries.members(crewId).list({
      sort: 'roleAsc',
    })
  );
  const members = [...(crewMembers?.members || [])].filter(
    (member): member is CrewMember => member !== undefined
  );
  const { data: crewSessions } = useQuery(
    sessionQueries.list({ page: 0, size: 3, crewId, sort: 'registerByAsc' })
  );
  const { data: myProfile } = useQuery(userQueries.me.info());
  const { data: myRoleData } = useQuery({
    ...crewQueries.members(crewId).detail(myProfile?.id ?? 0),
    enabled: !!myProfile?.id,
  });

  // Fetch crew reviews with simple useQuery
  const { data: crewReviewsData, isLoading } = useQuery(
    crewQueries.reviews(crewId).list({ page: currentPage, size: 4 })
  );

  const reviews = crewReviewsData?.content || [];
  const totalElements = crewReviewsData?.totalElements ?? 0;
  const totalPages = crewReviewsData?.totalPages ?? 0;

  return (
    <>
      <CrewDetailContext value={{ crewId: crew?.id, myRole: myRoleData?.role }}>
        {crew && (
          <div className="h-main flex flex-col items-center">
            {/* Crew Image */}
            <div
              className={cn(
                'laptop:mt-10 laptop:mb-[52px] laptop:max-w-[1120px] relative w-full',
                'laptop:h-[300px] tablet:h-60 h-[174px]'
              )}
            >
              <Image
                src={crew?.image || '/assets/crew-default.png'}
                alt="Crew"
                fill
                className="laptop:rounded-[20px] overflow-hidden object-cover"
              />
            </div>
            {/* Crew Page Main */}
            <div className="laptop:max-w-[1120px] w-full">
              <div className="laptop:flex-row laptop:gap-10 flex w-full flex-col-reverse">
                {/* Crew Crew Info */}
                <div className="laptop:px-3 flex w-full flex-col gap-y-10 px-6">
                  <Tabs
                    defaultValue="1"
                    className="tablet:top-15 sticky top-14"
                  >
                    <Tabs.List>
                      <Tabs.Trigger
                        value="1"
                        onClick={() => router.push('#detail')}
                        className="bg-gray-900"
                      >
                        상세 정보
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="2"
                        onClick={() => router.push('#session')}
                        className="bg-gray-900"
                      >
                        모집 중인 세션
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="3"
                        onClick={() => router.push('#review')}
                        className="bg-gray-900"
                      >
                        후기
                      </Tabs.Trigger>
                    </Tabs.List>
                  </Tabs>
                  <div id="detail" className="flex flex-col gap-2">
                    <span className="text-title3-semibold text-gray-50">
                      크루 소개
                    </span>
                    <div className="text-body2-regular text-gray-100">
                      {crew?.description}
                    </div>
                  </div>
                  <div id="session" className="flex flex-col gap-4">
                    <span className="text-title3-semibold text-gray-50">
                      모집중인 세션
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {crewSessions?.content.slice(0, 3).map((session) => (
                        <SessionCard
                          key={session.id}
                          session={session}
                          displayParticipants={false}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-title3-semibold text-gray-50">
                      마감된 세션
                    </span>
                    <div className="flex flex-col divide-y divide-gray-700 *:py-2">
                      {crewSessions?.content.slice(0, 3).map((session) => (
                        <CompletedSessionCard
                          key={session.id}
                          session={session}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    id="review"
                    className="flex flex-col gap-3 border-t border-t-gray-700 py-5"
                  >
                    <div className="flex gap-2">
                      <span className="text-title3-semibold text-gray-50">
                        후기
                      </span>
                      <span className="text-title3-semibold text-brand-300">
                        {totalElements}
                      </span>
                    </div>
                    {reviews && totalElements > 0 && (
                      <>
                        <div className="flex flex-col divide-y divide-dashed divide-gray-500 *:pb-2 not-first:*:pt-2">
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
                          isLoading={isLoading}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Crew Title */}
                <div className="laptop:bg-gray-750 laptop:w-[360px] laptop:shrink-0 w-full flex-col self-start rounded-[20px] px-6 py-7 shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.20)]">
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
    if (typeof window !== 'undefined' && navigator) {
      const pageUrl = `${new URL(pathname, process.env.NEXT_PUBLIC_APP_URL)}`;
      try {
        await navigator.clipboard.writeText(pageUrl);
        setCurrentModal('share');
      } catch (error) {
        console.error('클립보드 복사 실패:', error);
      }
    }
  };

  const handleCreateSession = () => {
    router.push('/sessions/create');
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
        <Share
          className="size-6 cursor-pointer stroke-[#9CA3AF]"
          aria-label="크루 링크 공유하기"
          onClick={handleShare}
        />

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

      {/* Share Modal */}
      <Modal
        open={currentModal === 'share'}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton />
          <Modal.Description>크루 URL 주소가 복사되었어요!</Modal.Description>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button>닫기</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

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
              <Modal.Close asChild>
                <Button
                  className="w-full shrink"
                  onClick={() => leaveCrew.mutate()}
                >
                  나가기
                </Button>
              </Modal.Close>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
