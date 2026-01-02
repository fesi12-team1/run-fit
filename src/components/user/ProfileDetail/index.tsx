'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { userQueries } from '@/api/queries/userQueries';
import { formatPaceText, splitSecondsToMinutesAndSeconds } from '@/lib/pace';

interface ProfileProps {
  userId: number;
}
export default function ProfileDetail({ userId }: ProfileProps) {
  const { data: profileData } = useQuery(userQueries.profile(userId));

  if (!profileData) return null;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="relative size-16 overflow-hidden rounded-full border-[1.5px] border-gray-700">
          <Image
            alt="profile"
            className="object-cover"
            fill
            src={profileData.image || '/assets/profile-default.png'}
          />
        </div>
        <div className="flex items-center justify-between"></div>

        <h2 className="text-body1-semibold tablet:text-title2-semibold mt-3 mb-1 self-center">
          {profileData.name}
        </h2>
        {profileData.introduction && (
          <p className="text-caption-regular tablet:text-body3-medium whitespace-pre-line text-gray-200">
            {profileData.introduction}
          </p>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-800 px-2 py-4 text-center">
          <p className="text-caption-medium text-gray-300">러닝 페이스</p>
          <p className="text-body2-semibold">
            {profileData.pace
              ? formatPaceText(
                  splitSecondsToMinutesAndSeconds(profileData?.pace)
                )
              : '-'}
          </p>
        </div>
        <div className="rounded-xl bg-gray-800 px-2 py-4 text-center">
          <p className="text-caption-medium text-gray-300">활동 지역</p>
          <p className="text-body2-semibold">{profileData.city || '-'}</p>
        </div>
      </div>
      {profileData.styles?.length !== 0 && (
        <div className="mt-2 flex w-full flex-col gap-2">
          <p className="text-caption-semibold tablet:text-body3-semibold text-gray-300">
            러닝 스타일
          </p>
          <div className="flex flex-wrap gap-2">
            {profileData.styles?.map((style) => (
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
    </>
  );
}
