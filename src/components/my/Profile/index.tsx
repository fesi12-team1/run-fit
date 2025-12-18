'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { userQueries } from '@/api/queries/userQueries';
import { formatPaceText, secondsToMinutes } from '@/lib/pace';

export default function Profile() {
  const { data } = useQuery(userQueries.me.info());

  return (
    <div className="w-full">
      <div className="tablet:gap-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="relative size-20 overflow-hidden rounded-full border-[1.5px] border-gray-700">
            <Image
              src={data?.image || '/assets/profile-default.png'}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
          <button
            className="bg-gray-750 text-caption-medium tablet:text-body3-medium tablet:px-3 rounded-xl px-2 py-2 text-gray-200"
            type="button"
          >
            내 정보 수정
          </button>
        </div>
        <div>
          <h2 className="text-body1-semibold tablet:text-title2-semibold">
            {data?.name}
          </h2>
          <p className="text-caption-regular tablet:mt-3 tablet:text-body3-medium mt-1 whitespace-pre-line text-gray-200">
            {data?.introduction || '소개글이 없습니다.'}
          </p>
        </div>
      </div>

      <div className="tablet:mt-6 mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-800 px-2 py-4 text-center">
          <p className="text-caption-medium text-gray-300">러닝 페이스</p>
          <p className="text-body2-semibold">
            {data?.pace
              ? formatPaceText(...secondsToMinutes(data?.pace))
              : '??'}
          </p>
        </div>
        <div className="rounded-xl bg-gray-800 px-2 py-4 text-center">
          <p className="text-caption-medium text-gray-300">활동 지역</p>
          <p className="text-body2-semibold">{data?.city || '??'}</p>
        </div>
      </div>

      <div className="tablet:mt-6 mt-5 flex flex-col gap-2">
        <p className="text-caption-semibold tablet:text-body3-semibold text-gray-300">
          러닝 스타일
        </p>
        <div className="flex flex-wrap gap-2">
          {data?.styles?.length !== 0 ? (
            data?.styles?.map((style) => (
              <span
                key={style}
                className="border-brand-700 text-caption-medium text-brand-200 tablet:px-3 tablet:py-2 tablet:text-body3-medium rounded-xl border bg-gray-800 px-2 py-1.5"
              >
                {style}
              </span>
            ))
          ) : (
            <span className="text-caption-medium tablet:text-body3-medium text-gray-200">
              등록된 러닝 스타일이 없습니다.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
