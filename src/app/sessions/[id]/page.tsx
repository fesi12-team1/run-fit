'use client';

// import { useQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
// import { sessionQueries } from '@/api/queries/sessionQueries';
import VerticalEllipsisIcon from '@/assets/icons/vertical-ellipsis.svg?react';
import FixedBottomBar, {
  useFixedBottomBar,
} from '@/components/layout/FixedBottomBar';
import KakaoMap from '@/components/session/KakaoMap';
import Badge, { LevelBadge, PaceBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import Rating from '@/components/ui/Rating';
// import TimeSlider from '@/components/ui/TimeSlider';
import UserAvatar from '@/components/ui/UserAvatar';
import {
  formatDDay,
  formatKoMonthDayTime,
  formatKoYearMonthDay,
} from '@/lib/time';

export default function Page() {
  const { id } = useParams();
  const {
    data: session,
    error,
    isLoading,
  } = useQuery(sessionQueries.detail(Number(id)));
  const crewId = session?.crewId;

  const { data } = useQuery(sessionQueries.participants(Number(id)));

  const { data: crew } = useQuery({
    ...crewQueries.detail(Number(crewId)),
  });

  const { data: reviews } = useQuery(
    crewQueries.reviews(Number(crewId)).list({ page: 0, size: 1 })
  );
  const { ref, height } = useFixedBottomBar();

  if (isLoading) return null;
  if (error) return null;
  if (!session) return null;

  if (!data) return null;
  if (!crew) return null;
  if (!reviews) return null;

  const {
    name,
    description,
    image,
    coords,
    sessionAt,
    registerBy,
    level,
    location,
    pace,
    maxParticipantCount,
    currentParticipantCount,
    createdAt,
    liked,
  } = session;

  const { participants, totalCount } = data;

  const review = reviews?.content[0];

  return (
    <main className="h-main relative w-full">
      <Image
        src={image}
        alt={name}
        height={267}
        width={375}
        className="z-0 aspect-375/267 w-full object-cover"
      />

      <div className="tablet:p-12 tablet:py-10 relative z-100 -mt-5 rounded-t-[20px] bg-gray-800 px-7 py-6">
        <div className="mb-1 flex w-full items-center justify-between gap-2">
          <Badge variant="dday" size="sm">
            마감 {formatDDay(registerBy)}
          </Badge>
          <VerticalEllipsisIcon className="size-6" />
        </div>
        <div className="mb-2">
          <h1 className="text-title3-semibold text-gray-50">{name}</h1>
          <div className="text-body3-regular text-gray-300">
            {formatKoMonthDayTime(sessionAt)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <PaceBadge size="sm" pace={pace} />
          <LevelBadge size="sm" level={level} />
        </div>
        <ProgressBar
          value={currentParticipantCount}
          max={maxParticipantCount}
        />
      </div>

      <hr className="tablet:mx-12 mx-6 text-gray-700" />

      <div className="tablet:px-12 tablet:py-8 tablet:gap-8 flex flex-col gap-6 bg-gray-800 px-6 py-6">
        <div className="tablet:gap-2 flex flex-col gap-1">
          <h2 className="text-body2-semibold tablet:text-title3-semibold text-gray-50">
            세션 소개
          </h2>
          <p className="text-body3-regular tablet:text-body2-regular text-gray-200">
            {description}
          </p>
          <div className="text-body3-regular text-gray-300">
            {formatKoYearMonthDay(createdAt)}
          </div>
        </div>

        <div className="tablet:gap-2 flex flex-col gap-1">
          <h2 className="text-body2-semibold tablet:text-title3-semibold text-gray-50">
            일정
          </h2>
          <ul className="text-body3-regular tablet:text-body2-regular text-gray-200">
            <li>&nbsp;{`• 모임 일시: ${formatKoYearMonthDay(sessionAt)}`}</li>
            <li>
              &nbsp;{`• 모집 일정: ~ ${formatKoMonthDayTime(registerBy)} 마감`}
            </li>
          </ul>
        </div>
        <div className="tablet:gap-2 flex flex-col gap-1">
          <h2 className="text-body2-semibold tablet:text-body3-semibold flex flex-col text-gray-50">
            장소
          </h2>
          <div className="tablet:h-[312px] flex h-[218px] flex-col overflow-hidden rounded-xl border border-gray-600">
            <div className="min-h-0 flex-1">
              <KakaoMap
                coords={coords}
                address="city"
                className="h-full w-full"
              />
            </div>

            <div className="text-body3-semibold tablet:text-body1-semibold flex-none px-4 py-5">
              {location}
            </div>
          </div>
        </div>
        <div className="tablet:gap-2 flex flex-col gap-1">
          <h2 className="text-body2-semibold tablet:text-title3-semibold inline-flex items-center gap-1 text-gray-50">
            참여 멤버
            <span className="text-body1-semibold text-brand-300">
              {totalCount}
            </span>
          </h2>
          <ul className="tablet:gap-5 mb-3 flex flex-col gap-2">
            {participants.slice(0, 4).map((participant) => (
              <li key={participant.userId} className="flex items-center gap-3">
                <UserAvatar
                  src={participant.profileImage}
                  className="size-12 shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-body3-semibold tablet:text-body2-semibold">
                      {participant.name}
                    </span>
                    <Badge size="sm" variant="dday">
                      {participant.role}
                    </Badge>
                  </div>
                  <p className="text-caption-regular tablet:text-body3-regular line-clamp-1 text-gray-200">
                    {participant.introduction}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="neutral" size="sm" className="w-full">
            더보기
          </Button>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border-gray-600 bg-gray-700 p-3">
          <div className="flex gap-3">
            <Image
              src={
                'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt={crew.name}
              height={44}
              width={66}
              className="rounded-lg"
            />
            <div>
              <div className="text-caption-semibold tablet:text-body2-semibold mb-0.5">
                {crew.name}
              </div>
              <div className="text-caption-regular tablet:text-body3-regular text-gray-300">
                {`${crew.city} • 멤버 ${crew.memberCount}명`}
              </div>
            </div>
          </div>
          <hr className="text-gray-600" />

          <div className="gap">
            <Rating value={review.ranks} onChange={() => 1} className="mb-2" />
            <p className="text-caption-regular tablet-text-body3-regular line-clamp-2 text-gray-200">
              {review.description}
            </p>
          </div>
        </div>
      </div>
      <FixedBottomBar ref={ref}>hellowolrd</FixedBottomBar>
    </main>
  );
}
