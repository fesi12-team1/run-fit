'use client';

import { Suspense } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { crewQueries } from '@/api/queries/crewQueries';
import { userQueries } from '@/api/queries/userQueries';
import CrewMemberList from '@/components/crew/CrewMemberList';
import FixedBottomBar from '@/components/layout/FixedBottomBar';
import { CREW_DETAIL_SECTIONS } from '@/constants/crew';
import { CrewDetailContext } from '@/context/CrewDetailContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { generateNextImageSizes } from '@/lib/Image';
import { cn } from '@/lib/utils';
import { CrewMember } from '@/types';
import CompletedSessions from './CompletedSessions';
import CompletedSessionsSkeleton from './CompletedSessionsSkeleton';
import CrewDetailSectionsTabs from './CrewDetailSectionsTabs';
import CrewReviews from './CrewReviews';
import CrewReviewsSkeleton from './CrewReviewsSkeleton';
import PageAction from './PageAction';
import RecruitingSessions from './RecruitingSessions';
import RecruitingSessionsSkeleton from './RecruitingSessionsSkeleton';

interface CrewDetailContentProps {
  crewId: number;
}

export default function CrewDetailContent({ crewId }: CrewDetailContentProps) {
  const { data: myProfile } = useQuery(userQueries.me.info());
  const { data: myRoleData } = useQuery({
    ...crewQueries.members(crewId).detail(myProfile?.id ?? 0),
    enabled: !!myProfile?.id,
  });
  const myRole = myRoleData?.role || undefined;

  const searchParams = useSearchParams();
  const pageFilter = Number(searchParams.get('page'))
    ? Number(searchParams.get('page')) - 1
    : 0;

  const [currentPage, setCurrentPage] = useState(pageFilter);

  useEffect(() => {
    setCurrentPage(pageFilter);
  }, [pageFilter]);

  const isMobile = useMediaQuery({ max: 'tablet' });

  const { data: crew } = useSuspenseQuery(crewQueries.detail(crewId));
  const { data: crewMembersData } = useSuspenseQuery(
    crewQueries.members(crewId).list({ sort: 'roleAsc' })
  );

  const members = [...(crewMembersData?.members || [])].filter(
    (member): member is CrewMember => member !== undefined
  );

  return (
    <CrewDetailContext value={{ crewId: crew.id, myRole }}>
      <div className="h-main laptop:bg-gray-850 flex flex-col items-center bg-gray-800 pb-20">
        {/* Crew Image */}
        <div
          className={cn(
            'relative w-full bg-gray-800',
            'laptop:mt-10 laptop:mb-[52px] laptop:max-w-[1120px] laptop:bg-gray-750',
            'laptop:h-[300px] tablet:h-60 h-[174px]'
          )}
        >
          <Image
            src={crew.image || '/assets/crew-default.png'}
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

        {/* Main Content */}
        <div className="laptop:max-w-[1120px] laptop:flex-row laptop:gap-10 flex w-full flex-col-reverse">
          {/* Left Section */}
          <div
            className={cn(
              'laptop:px-3 flex w-full flex-col px-6',
              'tablet:gap-y-8 laptop:gap-y-10 laptop:max-w-[720px] gap-y-6'
            )}
          >
            <CrewDetailSectionsTabs />

            {/* Crew Introduction */}
            <section
              id={CREW_DETAIL_SECTIONS[0].id}
              className="flex flex-col gap-2"
            >
              <span
                className={cn(
                  'text-gray-50',
                  'tablet:text-title3-semibold text-body2-semibold'
                )}
              >
                {CREW_DETAIL_SECTIONS[0].name}
              </span>
              <div
                className={cn(
                  'tablet:text-body2-regular tablet:text-gray-100',
                  'text-body3-regular whitespace-pre-line text-gray-200'
                )}
              >
                {crew.description}
              </div>
            </section>

            {/* Recruiting Sessions */}
            <section
              id={CREW_DETAIL_SECTIONS[1].id}
              className="flex flex-col gap-4"
            >
              <h2
                className={cn(
                  'text-gray-50',
                  'tablet:text-title3-semibold text-body2-semibold'
                )}
              >
                모집중인 세션
              </h2>
              <Suspense fallback={<RecruitingSessionsSkeleton />}>
                <RecruitingSessions crewId={crewId} />
              </Suspense>
            </section>

            {/* Completed Sessions */}
            <section className="flex flex-col gap-4">
              <h2
                className={cn(
                  'text-gray-50',
                  'tablet:text-title3-semibold text-body2-semibold'
                )}
              >
                마감된 세션
              </h2>
              <Suspense fallback={<CompletedSessionsSkeleton />}>
                <CompletedSessions crewId={crewId} />
              </Suspense>
            </section>

            {/* Crew Reviews */}
            <section
              id={CREW_DETAIL_SECTIONS[2].id}
              className="flex flex-col gap-3 border-t border-t-gray-700 py-5"
            >
              <Suspense key={currentPage} fallback={<CrewReviewsSkeleton />}>
                <CrewReviews
                  crewId={crewId}
                  currentPage={currentPage}
                  isMobile={isMobile}
                  onPageChange={setCurrentPage}
                />
              </Suspense>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="laptop:w-[360px] laptop:shrink-0 laptop:bg-gray-750 laptop:border laptop:border-gray-600 z-1 -mt-8 w-full flex-col self-start rounded-[20px] bg-gray-800 px-6 py-7">
            <CrewMemberList crew={crew} members={members}>
              <div className="laptop:flex hidden flex-col">
                <PageAction />
                <div className="tablet:border-t-0 flex items-center gap-1 border-t border-t-gray-500">
                  <span className="text-body2-semibold my-4 text-gray-50">
                    멤버
                  </span>
                  <span className="text-body1-semibold text-brand-300">
                    {members.length}
                  </span>
                </div>
              </div>
            </CrewMemberList>
          </div>
        </div>
      </div>

      <FixedBottomBar>
        <PageAction />
      </FixedBottomBar>
    </CrewDetailContext>
  );
}
