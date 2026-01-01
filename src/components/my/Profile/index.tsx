'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { userQueries } from '@/api/queries/userQueries';
import Button from '@/components/ui/Button';
import { formatPaceText, splitSecondsToMinutesAndSeconds } from '@/lib/pace';
import type { Profile as ProfileType } from '@/types';
import ProfileEdit from '../ProfileEdit';

export default function Profile() {
  const { data } = useQuery(userQueries.me.info());
  const [open, setOpen] = useState(false);

  function isEmptyProfile(profile: ProfileType) {
    return (
      !profile.introduction &&
      !profile.city &&
      profile.pace === null &&
      (profile.styles?.length ?? 0) === 0
    );
  }

  const empty = data ? isEmptyProfile(data) : true;

  return (
    <>
      <div className="w-full">
        <div className="tablet:gap-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="relative size-20 overflow-hidden rounded-full border-[1.5px] border-gray-700">
              <Image
                alt="profile"
                className="object-cover"
                fill
                src={data?.image || '/assets/profile-default.png'}
              />
            </div>
            <Button
              className="text-caption-semibold tablet:text-body3-semibold tablet:h-9 tablet:px-3 h-8 px-3.5 py-2"
              variant="neutral"
              onClick={() => setOpen(true)}
            >
              내 정보 수정
            </Button>
          </div>

          <h2 className="text-body1-semibold tablet:text-title2-semibold">
            {data?.name}
          </h2>
        </div>

        {empty ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-800 px-2 py-12">
            <p className="text-body3-regular text-center text-gray-200">
              아직 프로필 정보가 없어요
              <br />
              나와 잘 맞는 러너들을 만날 수 있도록
              <br />
              프로필을 작성해주세요!
            </p>
            <Button onClick={() => setOpen(true)}>프로필 작성하기</Button>
          </div>
        ) : (
          <div>
            <p className="text-caption-regular tablet:mt-3 tablet:text-body3-medium mt-1 whitespace-pre-line text-gray-200">
              {data?.introduction || ''}
            </p>
            <div className="tablet:mt-6 mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-800 px-2 py-4 text-center">
                <p className="text-caption-medium text-gray-300">러닝 페이스</p>
                <p className="text-body2-semibold">
                  {data?.pace
                    ? formatPaceText(
                        splitSecondsToMinutesAndSeconds(data?.pace)
                      )
                    : '-'}
                </p>
              </div>
              <div className="rounded-xl bg-gray-800 px-2 py-4 text-center">
                <p className="text-caption-medium text-gray-300">활동 지역</p>
                <p className="text-body2-semibold">{data?.city || '-'}</p>
              </div>
            </div>
            {data?.styles?.length !== 0 && (
              <div className="tablet:mt-6 mt-5 flex flex-col gap-2">
                <p className="text-caption-semibold tablet:text-body3-semibold text-gray-300">
                  러닝 스타일
                </p>
                <div className="flex flex-wrap gap-2">
                  {data?.styles?.map((style) => (
                    <span
                      key={style}
                      className="border-brand-700 text-caption-medium text-brand-200 tablet:px-3 tablet:py-2 tablet:text-body3-medium rounded-xl border bg-gray-800 px-2 py-1.5"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ProfileEdit open={open} setOpen={setOpen} user={data ?? undefined} />
    </>
  );
}
