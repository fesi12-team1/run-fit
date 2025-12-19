'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { userQueries } from '@/api/queries/userQueries';
import Button from '@/components/ui/Button';

export default function MineCrewList() {
  const { data } = useQuery(userQueries.me.crews.owned({ page: 0, size: 4 }));

  return (
    <div>
      <div className="tablet:gap-3 flex min-w-0 flex-col gap-2">
        <p className="text-caption-semibold tablet:text-body3-semibold text-gray-300">
          내가 만든 크루
        </p>
        <div className="flex w-full flex-col gap-2.5">
          {data?.content.length !== 0 ? (
            <div className="flex flex-col gap-4">
              {data?.content.map((crew) => (
                <Link
                  key={crew.id}
                  href={`/crews/${crew.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-11 w-[66px] shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={crew.image || '/assets/crew-default.png'}
                      alt={crew.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="tablet:gap-0 flex min-w-0 flex-col gap-0.5">
                    <p className="text-caption-semibold tablet:text-body2-semibold truncate text-gray-50">
                      {crew.name}
                    </p>
                    <p className="text-caption-regular tablet:text-body3-regular text-gray-300">{`${crew.city} • 멤버 ${crew.memberCount}명`}</p>
                  </div>
                </Link>
              ))}
              {data?.hasNext && (
                <Button variant="neutral" size="sm">
                  더보기
                </Button>
              )}
            </div>
          ) : (
            <p>아직 생성한 크루가 없어요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
