import { Dot } from 'lucide-react';
import Image from 'next/image';
import Liked from '@/assets/icons/liked.svg';
import Location from '@/assets/icons/location.svg';
import { formatTimeToKorean } from '@/lib/time';
import { mockSessionParticipants } from '@/mocks/data';
import { Session } from '@/types';
import { DdayBadge, LevelBadge, PaceBadge } from '../ui/Badge';
import ProfileList from './ProfileList';

interface SessionCardProps {
  data: Session;
}

export default function SessionCard({ data }: SessionCardProps) {
  const today = new Date();
  const registerBy = new Date(data.registerBy);
  const timeDiff = registerBy.getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const ddayText =
    dayDiff > 0 ? `마감 D-${dayDiff}` : dayDiff === 0 ? '마감 D-Day' : '마감됨';

  const sessionAt = new Date(data.sessionAt);
  const sessionDate = `${sessionAt.getMonth() + 1}월 ${sessionAt.getDate()}일`;
  const sessionTime = formatTimeToKorean(
    sessionAt.getHours(),
    sessionAt.getMinutes()
  );

  const levelMap: Record<string, 'easy' | 'medium' | 'hard'> = {
    BEGINNER: 'easy',
    INTERMEDIATE: 'medium',
    ADVANCED: 'hard',
  };
  const level = levelMap[data.level] || 'easy';

  // TODO: 추후에는 실제 데이터 전달
  // const { data: crewData } = useCrewDetail(data.crewId); // tanstack-query hook
  const crewData = { name: '달리는 거북이' };
  const participantList = mockSessionParticipants.participants;

  return (
    <li className="flex w-full flex-col">
      <div className="laptop:mb-6 tablet:aspect-video relative mb-3 aspect-165/185 self-stretch overflow-hidden rounded-lg bg-blue-300">
        <Image
          src="/session.local.jpg"
          alt="Session"
          fill
          className="object-cover"
        />
        {/* prettier-ignore */}
        <div className="absolute top-3 left-3">
          <DdayBadge className="tablet:hidden"  size="sm">{ddayText}</DdayBadge>
          <DdayBadge className="hidden tablet:inline-flex laptop:hidden" size="md">{ddayText}</DdayBadge>
          <DdayBadge className="hidden laptop:inline-flex" size="lg">{ddayText}</DdayBadge>
        </div>
        <button onClick={() => {}} className="absolute top-3 right-3">
          <Liked className="stroke-offset-[-0.50px] size-6 fill-neutral-900/50 stroke-sky-100 stroke-1" />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-0.5 md:gap-1">
          <Location className="size-4 fill-gray-200" />
          <div className="text-caption-medium laptop:text-body3-medium font-medium text-gray-200">
            {data.location}
          </div>
        </div>
      </div>
      <div className="text-body3-semibold tablet:text-body2-semibold laptop:text-title3-semibold text-gray-50">
        {data.name}
      </div>
      <div className="text-caption-regular tablet:text-body3-regular tablet:mb-2 flex items-center text-gray-300">
        {`${sessionDate}`}
        <Dot />
        {`${sessionTime}`}
      </div>
      {/* prettier-ignore */}
      <div className="flex gap-0.5 mb-2 tablet:mb-3">
          <PaceBadge pace={data.pace} size="sm" className="tablet:hidden" />
          <PaceBadge pace={data.pace} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <PaceBadge pace={data.pace} size="lg" className="hidden laptop:inline-flex" />
          <LevelBadge level={level} size="sm" className="tablet:hidden" />
          <LevelBadge level={level} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <LevelBadge level={level} size="lg" className="hidden laptop:inline-flex" />
        </div>
      <div className="flex gap-1">
        <ProfileList data={participantList} />
        <div className="text-caption-regular laptop:text-body3-regular flex items-center text-gray-300">
          {`${data.currentParticipantCount}/${data.maxParticipantCount}명`}
          <Dot />
          {`${crewData.name}`}
        </div>
      </div>
    </li>
  );
}
