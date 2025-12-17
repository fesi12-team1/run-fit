import { useQuery } from '@tanstack/react-query';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import ProfileList from '@/components/user/ProfileList';
import { cn } from '@/lib/utils';
import type { Crew } from '@/types';

interface CrewCardProps {
  crew: Crew;
}

export default function CrewCard({
  crew: { id: crewId, name, description, city, image, memberCount },
}: CrewCardProps) {
  const { data: crewMembers } = useQuery(crewQueries.members(crewId).list());

  const { data: crewSessionData } = useQuery(
    sessionQueries.list({
      page: 0,
      size: 3,
      sort: 'createdAtDesc',
      crewId,
    })
  );

  return (
    <div className="desktop:flex tablet:border-t desktop:border-t gap-5 border-gray-700 pt-5">
      {/* 크루 카드 */}
      <div className="tablet:flex-row flex flex-col">
        {/* 크루 이미지 */}
        <Link
          href={`/crews/${crewId}`}
          className="tablet:w-60 tablet:aspect-video relative aspect-327/75 shrink-0 self-stretch overflow-hidden rounded-lg"
        >
          <Image
            src={image || '/assets/crew-default.png'}
            alt="Crew"
            fill
            className={cn(
              'rounded-lg object-cover transition-opacity duration-300 hover:opacity-80',
              image ? 'shadow-sm' : 'border border-gray-500'
            )}
          />
        </Link>
        {/* 크루 정보 */}
        <div className="desktop:w-[500px] desktop:max-w-[500px] flex w-full grow flex-col justify-evenly gap-2 p-3">
          <Link
            href={`/crews/${crewId}`}
            className="tablet:text-title3-semibold text-body2-semibold line-clamp-1 text-gray-50"
          >
            {name}
          </Link>
          <span className="tablet:text-body2-regular mobile:text-caption-regular mobile:min-h-[32px] line-clamp-2 min-h-[50px] text-gray-300">
            {description}
          </span>
          <div className="flex items-center">
            <span className="text-caption-medium tablet:text-body3-medium rounded-lg bg-gray-500 px-2 py-1 text-gray-100">{`${city}`}</span>
            <Dot color="var(--color-gray-300)" />
            <span className="text-caption-regular tablet:text-body3-regular mr-1 text-gray-300">{`멤버 ${memberCount}명`}</span>
            <ProfileList members={crewMembers?.members} />
          </div>
        </div>
      </div>
      {/* 진행된 세션 */}
      <div className="desktop:flex hidden w-[300px] shrink-0 flex-col p-3">
        <div className="text-body3-semibold mb-2 text-gray-300">
          진행된 세션
        </div>
        <ul className="flex flex-col gap-2">
          {crewSessionData?.content?.map((session) => {
            const sessionAt = new Date(session.sessionAt);
            const sessionDate = `${sessionAt.getMonth() + 1}월 ${sessionAt.getDate()}일`;

            return (
              <li
                key={session.id}
                className="text-body2-regular flex justify-between text-gray-100"
              >
                <Link href={`/sessions/${session.id}`} className="truncate">
                  {session.name}
                </Link>
                <div className="text-body3-regular text-nowrap text-gray-200">
                  {sessionDate}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
