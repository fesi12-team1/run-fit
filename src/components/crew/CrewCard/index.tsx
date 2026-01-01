import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import ProfileList from '@/components/user/ProfileList';
import type { Crew, CrewMember, Session } from '@/types';

export default function CrewCard({ crew }: { crew: Crew }) {
  const { data: crewMembers } = useQuery(crewQueries.members(crew.id).list());

  const { data: crewSessionData } = useQuery(
    sessionQueries.list({
      page: 0,
      size: 3,
      sort: 'createdAtDesc',
      crewId: crew.id,
    })
  );

  return (
    <div className="tablet:border-t tablet:border-gray-700 tablet:py-5 flex justify-between">
      <CrewCardLeft crew={crew} members={crewMembers?.members} />
      <CrewCardRight sessions={crewSessionData?.content} />
    </div>
  );
}

function CrewCardLeft({
  crew: { id, name, description, city, image, memberCount },
  members,
}: {
  crew: Crew;
  members?: CrewMember[];
}) {
  return (
    <div className="tablet:flex-row flex w-full flex-col gap-3 rounded-xl">
      <CrewCardImage id={id} image={image} />
      <CrewCardInfo
        city={city}
        description={description}
        id={id}
        memberCount={memberCount}
        members={members}
        name={name}
      />
    </div>
  );
}

function CrewCardImage({ id, image }: { id: number; image?: string | null }) {
  return (
    <Link
      className="tablet:w-60 tablet:aspect-video relative aspect-327/75 shrink-0 overflow-hidden rounded-xl"
      href={`/crews/${id}`}
    >
      <Image
        alt="Crew"
        className="rounded-xl object-cover transition-opacity duration-300 hover:opacity-80"
        fill
        src={image || '/assets/crew-default.png'}
      />
    </Link>
  );
}

function CrewCardInfo({
  id,
  name,
  description,
  city,
  memberCount,
  members,
}: {
  id: number;
  name: string;
  description: string;
  city: string;
  memberCount: number;
  members?: CrewMember[];
}) {
  return (
    <div className="tablet:w-[500px] flex flex-col justify-evenly gap-2 p-3">
      <Link
        className="tablet:text-title3-semibold text-body2-semibold line-clamp-1 text-gray-50"
        href={`/crews/${id}`}
      >
        {name}
      </Link>

      <p className="tablet:text-body2-regular mobile:text-caption-regular line-clamp-2 text-gray-300">
        {description}
      </p>

      <CrewCardMembers
        city={city}
        memberCount={memberCount}
        members={members}
      />
    </div>
  );
}

function CrewCardMembers({
  city,
  memberCount,
  members,
}: {
  city: string;
  memberCount: number;
  members?: CrewMember[];
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-caption-medium tablet:text-body3-medium pointer-events-none rounded-lg bg-gray-500 px-2 py-1 text-gray-100">
        {city}
      </span>

      <span className="text-caption-regular tablet:text-body3-regular text-gray-300">
        • 멤버 {memberCount}명
      </span>

      <ProfileList members={members} />
    </div>
  );
}

function CrewCardRight({ sessions }: { sessions?: Session[] }) {
  return (
    <div className="tablet:flex hidden w-[300px] shrink-0 flex-col p-3">
      <div className="text-body3-semibold mb-2 text-gray-300">최근 세션</div>
      <CrewCardSessions sessions={sessions} />
    </div>
  );
}

function CrewCardSessions({ sessions }: { sessions?: Session[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {sessions?.map((session) => {
        const date = new Date(session.sessionAt);
        const formatted = `${date.getMonth() + 1}월 ${date.getDate()}일`;

        return (
          <li
            key={session.id}
            className="text-body2-regular flex justify-between text-gray-100"
          >
            <Link className="truncate" href={`/sessions/${session.id}`}>
              {session.name}
            </Link>
            <span className="text-body3-regular text-nowrap text-gray-200">
              {formatted}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
