import { ErrorBoundary, Suspense } from '@suspensive/react';
import KakaoMap from '@/components/ui/KakaoMap';
import { formatKoYMD, formatKoYYMDMeridiemTime } from '@/lib/time';
import { Session } from '@/types';
import ParticipantsList from './ParticipantsList';
import ParticipantsListErrorFallback from './ParticipantsListErrorFallback';
import ParticipantsListSkeleton from './ParticipantsListSkeleton';

export default function SessionDetailInfo({ session }: { session: Session }) {
  const {
    description,
    createdAt,
    sessionAt,
    registerBy,
    location,
    coords,
    currentParticipantCount,
  } = session;

  return (
    <div className="tablet:px-12 laptop:px-3 laptop:py-0 tablet:py-8 tablet:gap-8 laptop:bg-gray-900 flex flex-col gap-6 bg-gray-800 px-6 py-6">
      <div className="tablet:gap-2 flex flex-col gap-1">
        <h2 className="text-body2-semibold tablet:text-title3-semibold text-gray-50">
          세션 소개
        </h2>
        <p className="text-body3-regular tablet:text-body2-regular whitespace-pre-line text-gray-200">
          {description}
        </p>
        <div className="text-body3-regular text-gray-300">
          {formatKoYMD(createdAt)}
        </div>
      </div>

      <div className="tablet:gap-2 flex flex-col gap-1">
        <h2 className="text-body2-semibold tablet:text-title3-semibold text-gray-50">
          일정
        </h2>
        <ul className="text-body3-regular tablet:text-body2-regular text-gray-200">
          <li>&nbsp;{`• 모임 일시: ${formatKoYYMDMeridiemTime(sessionAt)}`}</li>
          <li>
            &nbsp;
            {`• 모집 일정: ~ ${formatKoYYMDMeridiemTime(registerBy)} 마감`}
          </li>
        </ul>
      </div>

      <div className="tablet:gap-2 flex flex-col gap-1">
        <h2 className="text-body2-semibold tablet:text-title3-semibold flex flex-col text-gray-50">
          장소
        </h2>
        <div className="tablet:h-[312px] tablet:rounded-[20px] flex h-[218px] flex-col overflow-hidden rounded-xl border border-gray-600 bg-gray-700">
          <div className="min-h-0 flex-1">
            <KakaoMap
              coords={coords}
              address={location}
              className="h-full w-full"
            />
          </div>

          <div className="text-body3-semibold tablet:text-body1-semibold flex-none px-4 py-5">
            {location}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-body2-semibold tablet:text-title3-semibold tablet:gap-2 flex gap-1">
          <span className="text-gray-50">참여 멤버</span>
          <span className="text-brand-300">{currentParticipantCount}</span>
        </h2>

        {currentParticipantCount === 0 && (
          <div className="text-caption-regular tablet:text-body3-regular text-gray-300">
            참여자가 없습니다.
          </div>
        )}

        {currentParticipantCount > 0 && (
          <ErrorBoundary
            fallback={({ error }) => (
              <ParticipantsListErrorFallback error={error} />
            )}
          >
            <Suspense fallback={<ParticipantsListSkeleton />}>
              <ParticipantsList sessionId={session.id} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
