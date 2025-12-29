'use client';

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState } from 'react';
import { getCrewReviews } from '@/api/fetch/crews';
import { useJoinCrew, useLeaveCrew } from '@/api/mutations/crewMutations';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';
import Share from '@/assets/icons/share.svg';
import CrewMemberList from '@/components/crew/CrewMemberList';
import ReviewCard from '@/components/crew/ReviewCard';
import FixedBottomBar from '@/components/layout/FixedBottomBar';
import CompletedSessionCard from '@/components/session/CompletedSessionCard';
import SessionCard from '@/components/session/SessionCard';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Pagination from '@/components/ui/Pagination';
import Tabs from '@/components/ui/Tabs';
import { CrewDetailContext, useCrewRole } from '@/context/CrewDetailContext';
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
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(pageFilter);

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

  const { data: crewReviewsPageData, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [...crewQueries.reviews(crewId).all(), 'infinite-list'],
    queryFn: ({ pageParam }) =>
      getCrewReviews(crewId, { page: pageParam, size: 4 }),
    initialPageParam: pageFilter,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage?.hasPrevious ? firstPage.page - 1 : undefined;
    },
    enabled: !!crewId,
    maxPages: undefined, // Allow unlimited pages to be cached
  });

  // Find the page data for currentPage by checking pageParams
  const pageParams = crewReviewsPageData?.pageParams ?? [];
  const pageIndex = pageParams.indexOf(currentPage);
  const currentPageData =
    pageIndex !== -1 ? crewReviewsPageData?.pages[pageIndex] : undefined;

  const crewReviewsData = currentPageData?.content || [];
  const totalElements = currentPageData?.totalElements ?? 0;
  const totalPages = currentPageData?.totalPages ?? 0;

  // Calculate actual navigation availability based on current page
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  // Helper function to calculate which page numbers to display
  const getDisplayedPages = (
    current: number,
    total: number,
    maxDisplay: number = 5
  ): number[] => {
    if (total <= maxDisplay) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const pages: number[] = [];
    const lastPage = total - 1;

    // Always include first page
    pages.push(0);

    if (current <= 2) {
      // Near the start: show 0, 1, 2, 3, lastPage
      for (let i = 1; i < maxDisplay - 1; i++) {
        pages.push(i);
      }
    } else if (current >= lastPage - 2) {
      // Near the end: show 0, lastPage-3, lastPage-2, lastPage-1, lastPage
      for (let i = lastPage - (maxDisplay - 2); i < lastPage; i++) {
        if (i > 0) pages.push(i);
      }
    } else {
      // In the middle: show 0, current-1, current, current+1, lastPage
      pages.push(current - 1);
      pages.push(current);
      pages.push(current + 1);
    }

    // Always include last page (if not already included)
    if (!pages.includes(lastPage)) {
      pages.push(lastPage);
    }

    return [...new Set(pages)].sort((a, b) => a - b);
  };

  // Helper function to navigate to a specific page
  const goToPage = async (targetPageIndex: number) => {
    // Check if the target page is already in pageParams
    const isPageLoaded = pageParams.includes(targetPageIndex);

    if (!isPageLoaded) {
      // Fetch the specific page directly and add it to the infinite query cache
      const newPageData = await getCrewReviews(crewId, {
        page: targetPageIndex,
        size: 4,
      });

      // Manually update the infinite query data
      queryClient.setQueryData<typeof crewReviewsPageData>(
        [...crewQueries.reviews(crewId).all(), 'infinite-list'],
        (old) => {
          if (!old) return old;

          return {
            pages: [...old.pages, newPageData],
            pageParams: [...old.pageParams, targetPageIndex],
          };
        }
      );
    }

    setCurrentPage(targetPageIndex);
    router.push(`/crews/${crewId}?page=${targetPageIndex + 1}`);
  };

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
                  <Tabs defaultValue="1" className="">
                    <Tabs.List>
                      <Tabs.Trigger value="1">상세 정보</Tabs.Trigger>
                      <Tabs.Trigger value="2">모집 중인 세션</Tabs.Trigger>
                      <Tabs.Trigger value="3">후기</Tabs.Trigger>
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
                  <div id="sessions" className="flex flex-col gap-4">
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
                    <div className="flex flex-col divide-y divide-dashed divide-gray-500 *:pb-2 not-first:*:pt-2">
                      {crewReviewsData.map((review) => (
                        <ReviewCard key={review?.id} data={review} />
                      ))}
                    </div>
                    <div className="tablet:mt-4 mt-3 flex justify-center">
                      <Pagination>
                        <Pagination.Content>
                          {/* Previous */}
                          <Pagination.Item>
                            <Pagination.Previous
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (canGoPrevious && !isFetchingNextPage) {
                                  goToPage(currentPage - 1);
                                }
                              }}
                              className={cn(
                                !canGoPrevious || isFetchingNextPage
                                  ? 'pointer-events-none opacity-50'
                                  : ''
                              )}
                              isActive={canGoPrevious}
                            />
                          </Pagination.Item>
                          {/* Page Numbers with Ellipsis */}
                          {(() => {
                            const displayedPages = getDisplayedPages(
                              currentPage,
                              totalPages
                            );
                            const items: React.ReactNode[] = [];

                            displayedPages.forEach((pageNum, index) => {
                              // Add ellipsis if there's a gap
                              if (
                                index > 0 &&
                                pageNum - displayedPages[index - 1] > 1
                              ) {
                                items.push(
                                  <Pagination.Item key={`ellipsis-${pageNum}`}>
                                    <Pagination.Ellipsis />
                                  </Pagination.Item>
                                );
                              }

                              // Add page number
                              items.push(
                                <Pagination.Item key={pageNum}>
                                  <Pagination.Link
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (!isFetchingNextPage) {
                                        goToPage(pageNum);
                                      }
                                    }}
                                    isActive={pageNum === currentPage}
                                    className={cn(
                                      isFetchingNextPage
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                    )}
                                  >
                                    {pageNum + 1}
                                  </Pagination.Link>
                                </Pagination.Item>
                              );
                            });

                            return items;
                          })()}
                          {/* Next */}
                          <Pagination.Item>
                            <Pagination.Next
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (canGoNext && !isFetchingNextPage) {
                                  goToPage(currentPage + 1);
                                }
                              }}
                              className={cn(
                                !canGoNext || isFetchingNextPage
                                  ? 'pointer-events-none opacity-50'
                                  : ''
                              )}
                              isActive={canGoNext}
                            />
                          </Pagination.Item>
                        </Pagination.Content>
                      </Pagination>
                    </div>
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

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalData, setActionModalData] = useState({
    description: '',
  });

  const { crewId, myRole } = useCrewRole();
  const isCrewAdmin = myRole === 'LEADER' || myRole === 'STAFF';

  const joinCrew = useJoinCrew(crewId ?? 0);
  const leaveCrew = useLeaveCrew(crewId ?? 0);

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator) {
      const pageUrl = `${new URL(pathname, process.env.NEXT_PUBLIC_APP_URL)}`;
      try {
        await navigator.clipboard.writeText(pageUrl);
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
        setIsActionModalOpen(true);
        setActionModalData({
          description: '크루에 가입하려면 로그인이 필요해요!',
        });
      },
    });
  };
  const handleLeaveCrew = () => {
    setIsActionModalOpen(true);
    setActionModalData({
      description: '정말 탈퇴하시겠어요?',
    });
  };

  return (
    <div className={cn('flex items-center gap-7', className)}>
      <Modal>
        <Modal.Trigger
          aria-label="크루 링크 공유하기"
          asChild
          onClick={handleShare}
        >
          <Share className="size-6 stroke-[#9CA3AF]" />
        </Modal.Trigger>
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
      {/* modal for actions */}
      <Modal open={isActionModalOpen}>
        {!myRole ? (
          <Modal.Trigger aria-label="크루 가입하기" asChild>
            <Button
              className="text-body2-semibold flex-1 px-6 py-3"
              onClick={handleJoinCrew}
            >
              가입하기
            </Button>
          </Modal.Trigger>
        ) : isCrewAdmin ? (
          <Modal.Trigger aria-label="세션 생성하기" asChild>
            <Button
              className="text-body2-semibold flex-1 px-6 py-3"
              onClick={handleCreateSession}
            >
              세션 생성하기
            </Button>
          </Modal.Trigger>
        ) : (
          <Modal.Trigger aria-label="크루 나가기" asChild>
            <Button
              variant="outlined"
              className="text-body2-semibold flex-1 px-6 py-3"
              onClick={handleLeaveCrew}
            >
              크루 나가기
            </Button>
          </Modal.Trigger>
        )}
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton onClick={() => setIsActionModalOpen(false)} />
          <Modal.Description>{actionModalData.description}</Modal.Description>
          {!myRole ? (
            <Modal.Footer>
              <Modal.Close asChild>
                {/* 가입하기 */}
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
          ) : isCrewAdmin ? null : (
            <Modal.Footer className="w-full flex-row">
              <div className="flex w-full flex-row gap-2">
                {/* 크루 나가기 */}
                <Button
                  className="w-full shrink"
                  variant="neutral"
                  onClick={() => {
                    leaveCrew.mutate();
                    setIsActionModalOpen(false);
                  }}
                >
                  나가기
                </Button>
                <Button
                  className="w-full shrink"
                  onClick={() => {
                    setIsActionModalOpen(false);
                  }}
                >
                  취소
                </Button>
              </div>
            </Modal.Footer>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}
