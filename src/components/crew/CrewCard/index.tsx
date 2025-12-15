import { Dot } from 'lucide-react';
import Image from 'next/image';
import ProfileList from '@/components/user/ProfileList';
import { Crew, CrewMember, Session } from '@/types';

interface CrewCardProps {
  data: Crew;
}

export default function CrewCard({ data: crew }: CrewCardProps) {
  // TODO: use tanstack query to fetch
  const crewMemberCount = 64;
  const crewSessions: Session[] = [];
  const crewProfiles: CrewMember[] = [];

  return (
    <li className="tablet:pt-5 laptop:gap-20 laptop:flex pb-5">
      <div className="tablet:flex-row flex w-full flex-col">
        <div className="tablet:w-60 tablet:aspect-video relative aspect-327/75 shrink-0 self-stretch overflow-hidden rounded-lg bg-blue-300">
          <Image
            src="/crew.local.jpg"
            alt="Crew"
            fill
            className="object-cover"
          />
        </div>
        <div className="laptop:w-[500px] laptop:max-w-[500px] w-full grow p-3">
          <div className="tablet:text-title3-semibold text-body2-semibold line-clamp-1 text-gray-50">
            {crew.name}
          </div>
          <div className="tablet:text-body2-regular text-caption-regular line-clamp-2 text-gray-300">
            {crew.description}
          </div>
          <div className="flex items-center">
            <span className="text-caption-medium tablet:text-body3-medium rounded-lg bg-gray-500 px-2 py-1 text-gray-100">{`${crew.city}`}</span>
            <Dot color="var(--color-gray-300)" />
            <span className="text-caption-regular tablet:text-body3-regular mr-1 text-gray-300">{`멤버 ${crewMemberCount}명`}</span>
            <ProfileList data={crewProfiles} />
          </div>
        </div>
      </div>
      <div className="laptop:flex hidden w-[300px] shrink-0 flex-col gap-2 p-3">
        <div className="text-body3-semibold text-gray-300">진행된 세션</div>
        <ul>
          {/* 이후에는 hook으로 받아온 3개 이하의 crewSessions 사용 */}
          {crewSessions.map((session) => {
            const sessionAt = new Date(session.sessionAt);
            const sessionDate = `${sessionAt.getMonth() + 1}월 ${sessionAt.getDate()}일`;

            return (
              <li
                key={session.id}
                className="text-body2-regular flex justify-between text-gray-100"
              >
                <span className="truncate">{session.name}</span>
                <div className="text-body3-regular text-nowrap text-gray-200">
                  {sessionDate}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
