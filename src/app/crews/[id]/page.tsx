'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';
import Share from '@/assets/icons/share.svg';
import CrewMemberList from '@/components/crew/CrewMemberList';
import ReviewCard from '@/components/crew/ReviewCard';
import FixedBottomBar, {
  useFixedBottomBar,
} from '@/components/layout/FixedBottomBar';
import CompletedSessionCard from '@/components/session/CompletedSessionCard';
import SessionCard from '@/components/session/SessionCard';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import { cn } from '@/lib/utils';
import { CrewMember } from '@/types';

function PageAction({
  className,
  myRole,
}: {
  className?: string;
  myRole: 'LEADER' | 'STAFF' | 'MEMBER' | undefined;
}) {
  const isCrewAdmin = myRole === 'LEADER' || myRole === 'STAFF';
  const handleShare = () => {};
  const handleCreateSession = () => {};
  const handleJoinCrew = () => {};

  return (
    <div className={cn('flex gap-7', className)}>
      <button
        type="button"
        aria-label="크루 링크 공유하기"
        onClick={handleShare}
      >
        <Share className="size-6 stroke-[#9CA3AF]" />
      </button>
      <Button
        type="button"
        className="bg-brand-500 text-body2-semibold flex-1 px-6 py-3"
        onClick={isCrewAdmin ? handleCreateSession : handleJoinCrew}
      >
        {isCrewAdmin ? '세션 생성하기' : '가입하기'}
      </Button>
    </div>
  );
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const crewId = Number(params.id);

  // fetch queries
  const { data: crew } = useQuery(crewQueries.detail(crewId));
  const { data: crewMembers } = useQuery(
    crewQueries.members(crewId).list({
      sort: 'roleAsc',
    })
  );
  const { data: crewSessions } = useQuery(
    sessionQueries.list({ crewId, sort: 'registerByAsc' })
  );
  // const { data: crewReviews } = useQuery(crewQueries.reviews(crewId).list({}));
  // TODO:
  // crewReview는 Slice에서 Page로 바뀌어야함
  // pagination 컴포넌트 및 총 review 개수를 위해서 totalElements 필요
  const { data: myProfile } = useQuery(userQueries.me.info());
  const { data: myRole } = useQuery({
    ...crewQueries.members(crewId).detail(myProfile?.id ?? 0),
    enabled: !!myProfile?.id,
  });

  const members = [...(crewMembers?.members || [])].filter(
    (member): member is CrewMember => member !== undefined
  );

  const { ref, height } = useFixedBottomBar();

  return (
    <>
      <div
        className="h-main flex flex-col items-center"
        style={{ paddingBottom: height }}
      >
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
              <div className="flex flex-col gap-2">
                <span className="text-title3-semibold text-gray-50">
                  크루 소개
                </span>
                <div className="text-body2-regular text-gray-100">
                  {crew?.description}
                </div>
              </div>
              <div className="flex flex-col gap-4">
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
                    <CompletedSessionCard key={session.id} session={session} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-t-gray-700 py-5">
                <div className="flex gap-2">
                  <span className="text-title3-semibold text-gray-50">
                    후기
                  </span>
                  <span className="text-title3-semibold text-brand-300">
                    {/* {crewReviews?.totalElements || 0} */}
                    24
                  </span>
                </div>
                <div className="not-first:*:bt-2 flex flex-col divide-y divide-dotted *:pb-2">
                  {/* 위 수정 사항 반영 전까지 임시 데이터 사용 */}
                  {/* {crewReviews?.content.map((review) => (
                    <ReviewCard key={review.id} data={review} />
                  ))} */}
                  <ReviewCard
                    data={{
                      id: 1,
                      sessionId: 5,
                      crewId: crew?.id as number,
                      userId: 5,
                      userName: myProfile?.name as string,
                      description:
                        'Great running session! The pace was perfect and the route was scenic. Really enjoyed the group energy and motivation from everyone.',
                      ranks: 4,
                      image: 'https://picsum.photos/seed/review1/640/480',
                      createdAt: '2024-08-15T09:30:00.000Z',
                    }}
                  />
                  <ReviewCard
                    data={{
                      id: 2,
                      sessionId: 5,
                      crewId: crew?.id as number,
                      userId: 5,
                      userName: myProfile?.name as string,
                      description:
                        'Great running session! The pace was perfect and the route was scenic. Really enjoyed the group energy and motivation from everyone.',
                      ranks: 4,
                      image: 'https://picsum.photos/seed/review1/640/480',
                      createdAt: '2024-08-15T09:30:00.000Z',
                    }}
                  />
                  <div className="flex justify-center">
                    Pagination Component
                  </div>
                </div>
              </div>
            </div>
            {/* Crew Title */}
            <div className="laptop:bg-gray-750 laptop:w-[360px] laptop:shrink-0 w-full flex-col self-start rounded-[20px] px-6 py-7 shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.20)]">
              <CrewMemberList members={members}>
                <div className="flex flex-col">
                  <span className="text-title3-semibold text-gray-50">
                    {crew?.name}
                  </span>
                  <span className="text-body3-regular text-gray-200">
                    {crew?.city} • 멤버 {crewMembers?.members.length}명
                  </span>
                </div>
                <div className="laptop:flex hidden flex-col">
                  <PageAction className={'my-8'} myRole={myRole?.role} />
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
      <FixedBottomBar ref={ref}>
        <PageAction myRole={myRole?.role} />
      </FixedBottomBar>
    </>
  );
}
