'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { userQueries } from '@/api/queries/userQueries';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';

export default function MineCrewList() {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(userQueries.me.crews.owned({ page: 0, size: 4 }));
  const { data: allCrews, isLoading } = useQuery({
    ...userQueries.me.crews.owned({ page: 0, size: 100 }),
    enabled: open,
  });

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
                  className="flex items-center gap-3"
                  href={`/crews/${crew.id}`}
                >
                  <div className="relative h-11 w-[66px] shrink-0 overflow-hidden rounded-xl">
                    <Image
                      alt={crew.name}
                      className="object-cover"
                      fill
                      src={crew.image || '/assets/crew-default.png'}
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
                <Button
                  size="sm"
                  variant="neutral"
                  onClick={() => setOpen(true)}
                >
                  더보기
                </Button>
              )}
            </div>
          ) : (
            <p className="text-body3-regular mt-4.5 text-center text-gray-300">
              아직 내가 만든 크루가 없어요
            </p>
          )}
        </div>
      </div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content className="tablet:gap-4 tablet:w-[400px] tablet:max-h-[60vh] h-dvh w-full items-start bg-gray-800">
          <Modal.Header className="relative flex items-center justify-center">
            <button
              className="tablet:hidden absolute left-0"
              onClick={() => setOpen(false)}
            >
              <ChevronLeft className="size-6 text-white" />
            </button>
            <Modal.Title className="tablet:m-0 ml-7">
              내가 만든 크루
            </Modal.Title>
          </Modal.Header>
          <Modal.CloseButton
            className="tablet:block top-[26px] right-6 hidden"
            onClick={() => setOpen(false)}
          />
          <hr className="tablet:block hidden w-full border-gray-700" />
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner className="text-brand-500 size-10" />
            </div>
          )}

          {!isLoading && allCrews && allCrews.content.length > 0 && (
            <div className="overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent">
              <div className="flex flex-col justify-center gap-5">
                {allCrews.content.map((crew) => (
                  <Link
                    key={crew.id}
                    className="flex items-center gap-3"
                    href={`/crews/${crew.id}`}
                    onClick={() => setOpen(false)}
                  >
                    <div className="relative h-14 w-21 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        alt={crew.name}
                        className="object-cover"
                        fill
                        src={crew.image || '/assets/crew-default.png'}
                      />
                    </div>
                    <div className="tablet:w-[231px] flex w-[60vw] min-w-0 flex-col gap-0.5">
                      <p className="text-body2-semibold truncate text-gray-50">
                        {crew.name}
                      </p>
                      <p className="text-body3-regular text-gray-300">
                        {crew.city} • 멤버 {crew.memberCount}명
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}
