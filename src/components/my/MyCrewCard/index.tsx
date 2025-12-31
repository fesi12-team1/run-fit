import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import MemberIcon from '@/assets/icons/member.svg?react';
import SafeImage from '@/components/ui/SafeImage';
import ProfileList from '@/components/user/ProfileList';
import { Crew } from '@/types';

const ROLE_NAME = {
  LEADER: '크루장',
  STAFF: '운영진',
  MEMBER: '멤버',
};

export default function MyCrewCard({
  crew,
}: {
  crew: Crew & { myRole: 'LEADER' | 'STAFF' | 'MEMBER' };
}) {
  const { data: crewMembers } = useQuery(crewQueries.members(crew.id).list());

  return (
    <Link className="tablet:flex-row flex flex-col" href={`/crews/${crew.id}`}>
      <div className="tablet:w-60 tablet:h-37 relative aspect-327/132 w-full shrink-0 overflow-hidden rounded-xl">
        <SafeImage
          alt="크루 이미지"
          className="object-cover transition-opacity duration-300 hover:opacity-80"
          fallbackSrc="/assets/crew-default.png"
          fill
          src={crew.image}
        />
        <div className="text-caption-regular tablet:hidden absolute right-3.5 bottom-[11px] flex items-center gap-1">
          <MemberIcon className="size-3 text-gray-100" />
          <p className="text-gray-50">{ROLE_NAME[crew.myRole]}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 p-4 pb-1">
        <p className="tablet:text-title3-semibold text-body2-semibold line-clamp-1 text-gray-50">
          {crew.name}
        </p>
        <p className="tablet:text-body2-regular text-caption-regular line-clamp-2 text-gray-300">
          {crew.description}
        </p>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-caption-medium tablet:text-body3-medium pointer-events-none rounded-lg bg-gray-500 px-2 py-1 text-gray-100">
            {crew.city}
          </span>
          <span className="text-caption-regular tablet:text-body3-regular pointer-events-none text-gray-300">{`• 멤버 ${crew.memberCount}명`}</span>
          <ProfileList members={crewMembers?.members.slice(0, 3)} />
          <div className="tablet:block mr-1 hidden h-4 w-px bg-gray-400" />
          <div className="text-body3-regular tablet:flex hidden items-center gap-1 text-gray-200">
            <MemberIcon className="size-4 text-gray-200" />
            <p className="text-gray-200">{ROLE_NAME[crew.myRole]}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
