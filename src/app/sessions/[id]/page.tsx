'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';
import Camera from '@/assets/icons/camera.svg?react';
import Share from '@/assets/icons/share.svg?react';
import VerticalEllipsisIcon from '@/assets/icons/vertical-ellipsis.svg?react';
import FixedBottomBar, {
  useFixedBottomBar,
} from '@/components/layout/FixedBottomBar';
import KakaoMap from '@/components/session/KakaoMap';
import Badge, { LevelBadge, PaceBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import ProgressBar from '@/components/ui/ProgressBar';
import Rating from '@/components/ui/Rating';
import SafeImage from '@/components/ui/SafeImage';
import UserAvatar from '@/components/ui/UserAvatar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formatDDay, formatKoYMD, formatKoYYMDMeridiemTime } from '@/lib/time';
import { cn } from '@/lib/utils';
import { Crew, Review } from '@/types';
import { Session } from '@/types/session';

export default function Page() {
  const { id } = useParams();
  const {
    data: session,
    error,
    isLoading,
  } = useQuery(sessionQueries.detail(Number(id)));
  const crewId = session?.crewId;

  const { data: participantsResponse } = useQuery(
    sessionQueries.participants(Number(id))
  );

  const { data: crew } = useQuery({
    ...crewQueries.detail(Number(crewId)),
    enabled: !!crewId,
  });

  const { data: reviews } = useQuery({
    ...crewQueries.reviews(Number(crewId)).list({ page: 0, size: 1 }),
    enabled: !!crewId,
  });

  const { ref, height } = useFixedBottomBar();

  if (isLoading) return null;
  if (error) return null;
  if (!session) return null;

  if (!participantsResponse) return null;
  if (!crew) return null;
  if (!reviews) return null;

  const { participants } = participantsResponse;
  const review = reviews?.content[0] || null;

  return (
    <>
      <main
        className="h-main laptop:bg-gray-900 bg-gray-800"
        style={{ paddingBottom: 96 }}
      >
        <SessionDetailView
          session={session}
          crew={crew}
          review={review}
          participants={participants}
        />
      </main>
      <FixedBottomBar ref={ref}>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-4">
            <Camera className="block size-6 text-white" />
            <Share className="block size-6 text-white" />
          </div>
          <Button variant="default" className="flex-1">
            참여하기
          </Button>
        </div>
      </FixedBottomBar>
    </>
  );
}

function SessionDetailView({
  session,
  crew,
  review,
  participants,
}: {
  session: Session;
  crew: Crew;
  review: Review;
  participants: Session['participants'];
}) {
  const isLaptopUp = useMediaQuery({ min: 'laptop' });

  return (
    <>
      <div
        className={cn(
          'flex flex-col bg-gray-800 py-10',
          isLaptopUp && 'hidden'
        )}
      >
        <SessionImage image={session.image} name={session.name} />
        <SessionShortInfo session={session} crewId={crew.id} />
        <SessionDetailInfo session={session} participants={participants} />
        <CrewShortInfo crew={crew} review={review} />
      </div>

      <div
        className={cn(
          'mx-auto flex max-w-[1120px] gap-10 bg-gray-900 py-10',
          !isLaptopUp && 'hidden'
        )}
      >
        <div className="flex flex-1 flex-col gap-10 px-5">
          <SessionImage image={session.image} name={session.name} />
          <SessionDetailInfo session={session} participants={participants} />
        </div>
        <div className="laptop:w-[360px] flex flex-col gap-10">
          <SessionShortInfo session={session} crewId={crew.id} />
          <CrewShortInfo crew={crew} review={review} />
        </div>
      </div>
    </>
  );
}

function SessionImage({ image, name }: { image: string; name: string }) {
  return (
    <div className="tablet:aspect-744/313 laptop:aspect-680/374 laptop:rounded-[20px] relative aspect-375/267 w-full overflow-hidden">
      <SafeImage
        src={image}
        fallbackSrc="/assets/session-default.png"
        alt={name}
        fill
        className="object-cover"
      />
    </div>
  );
}

function SessionShortInfo({
  session,
  crewId,
}: {
  session: Session;
  crewId: number;
}) {
  const {
    registerBy,
    name,
    sessionAt,
    pace,
    level,
    currentParticipantCount,
    maxParticipantCount,
  } = session;
  const { data: profile } = useQuery(userQueries.me.info());
  const profileId = profile?.id;

  const { data: memberRole } = useQuery({
    ...crewQueries.members(crewId).detail(profileId!),
    enabled: !!profileId,
  });

  const isManager =
    memberRole?.role === 'LEADER' || memberRole?.role === 'STAFF';

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="laptop:bg-gray-750 laptop:rounded-b-[20px] laptop:px-6 laptop:pt-7 laptop:pb-6 laptop:mt-0 tablet:px-12 tablet:pt-10 laptop:gap-8 relative z-10 -mt-5 flex flex-col gap-6 rounded-t-[20px] bg-gray-800 px-7 pt-6">
      <div>
        <div className="mb-1 flex w-full items-center justify-between gap-2">
          <Badge variant="dday" size="sm">
            마감 {formatDDay(registerBy)}
          </Badge>
          {isManager && (
            <Dropdown>
              <Dropdown.TriggerNoArrow>
                <VerticalEllipsisIcon className="size-6" />
              </Dropdown.TriggerNoArrow>
              <Dropdown.Content className="z-100">
                <Dropdown.Item>
                  <Link href={`/sessions/${session.id}/edit`}>수정하기</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setIsDeleteModalOpen(true)}>
                  삭제하기
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          )}
        </div>
        <div className="mb-2">
          <h1 className="text-title3-semibold text-gray-50">{name}</h1>
          <div className="text-body3-regular text-gray-300">
            {formatKoYYMDMeridiemTime(sessionAt)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <PaceBadge size="sm" pace={pace} />
          <LevelBadge size="sm" level={level} />
        </div>
      </div>
      <ProgressBar value={currentParticipantCount} max={maxParticipantCount} />
      <hr className="text-gray-500" />
      <div className="laptop:flex hidden items-center gap-7">
        <div className="flex items-center gap-4">
          <Camera className="block size-6 text-white" />
          <Share className="block size-6 text-white" />
        </div>
        <Button variant="default" className="flex-1">
          참여하기
        </Button>
      </div>
      <Modal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <Modal.Content className="z-999">
          <Modal.Header>
            <VisuallyHidden asChild>
              <Modal.Title>세션을 삭제하시겠습니까?</Modal.Title>
            </VisuallyHidden>
          </Modal.Header>
          <Modal.Description>
            삭제 후에는 되돌릴 수 없어요 정말 삭제하시겠어요?
          </Modal.Description>
          <Modal.Footer>
            <Button
              variant="neutral"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              취소
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>확인</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}

function SessionDetailInfo({
  session,
  participants,
}: {
  session: Session;
  participants: Session['participants'];
}) {
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
        <p className="text-body3-regular tablet:text-body2-regular text-gray-200">
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
        <div className="tablet:h-[312px] tabler:rounded-[20px] flex h-[218px] flex-col overflow-hidden rounded-xl border border-gray-600 bg-gray-700">
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

      <div className="tablet:gap-2 flex flex-col gap-1">
        <h2 className="text-body2-semibold tablet:text-title3-semibold text-gray-50">
          참여 멤버&nbsp;
          <span className="text-brand-300">{currentParticipantCount}</span>
        </h2>
        <ul className="tablet:gap-5 mb-3 flex flex-col gap-2">
          {participants.slice(0, 4).map((participant) => (
            <li key={participant.userId} className="flex items-center gap-3">
              <UserAvatar
                src={participant.profileImage}
                className="size-12 shrink-0"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-body3-semibold tablet:text-body2-semibold">
                    {participant.name}
                  </span>
                  <Badge size="sm" variant="dday">
                    {participant.role}
                  </Badge>
                </div>
                <p className="text-caption-regular tablet:text-body3-regular line-clamp-1 text-gray-200">
                  {participant.introduction}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <Button variant="neutral" size="sm" className="w-full">
          더보기
        </Button>
      </div>
    </div>
  );
}

function CrewShortInfo({
  crew,
  review,
}: {
  crew: Crew;
  review: Review | null;
}) {
  const { name, image } = crew;

  return (
    <div className="laptop:mx-0 tablet:mx-12 tablet:rounded-[20px] tablet:px-6 tablet:py-4 tablet:bg-gray-750 mx-6 flex flex-col gap-4 rounded-xl border-gray-700 bg-gray-700 p-3 px-3 py-3">
      <div className="flex items-center gap-3">
        <div className="tablet:aspect-84/56 relative aspect-66/44 w-20">
          <SafeImage
            src={image}
            alt={name}
            fallbackSrc="/assets/crew-default.png"
            height={44}
            width={66}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-caption-semibold tablet:text-body2-semibold mb-0.5">
            {name}
          </div>
          <div className="text-caption-regular tablet:text-body3-regular text-gray-300">
            {`${crew.city} • 멤버 ${crew.memberCount}명`}
          </div>
        </div>
      </div>

      <hr className="text-gray-600" />

      {review && (
        <div>
          <Rating
            value={review.ranks}
            onChange={() => {}}
            disabled
            className="mb-2"
          />
          <p className="text-caption-regular tablet-text-body3-regular laptop:max-w-[320px] line-clamp-2 text-gray-200">
            {review.description}
          </p>
        </div>
      )}
    </div>
  );
}
