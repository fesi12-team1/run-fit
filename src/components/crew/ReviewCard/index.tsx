'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { sessionQueries } from '@/api/queries/sessionQueries';
import SessionInfo from '@/components/session/SessionInfo';
import Rating from '@/components/ui/Rating';
import UserAvatar from '@/components/ui/UserAvatar';
import { Review } from '@/types';

interface ReviewCardProps {
  data?: Review & { sessionName?: string };
  showUser?: boolean;
}

export default function ReviewCard({
  data: review,
  showUser = true,
}: ReviewCardProps) {
  const { data: userSession } = useQuery({
    ...sessionQueries.detail(review?.sessionId ?? 0),
    enabled: !!review,
  });

  if (!review) return;

  const createdAt = new Date(review.createdAt);
  const createdAtText = `${createdAt.getFullYear()}.${createdAt.getMonth() + 1}.${createdAt.getDate()}`;
  return (
    <li className="flex flex-col gap-2">
      {review.image && (
        <Image
          alt="리뷰 이미지"
          className="rounded-xl"
          height={80}
          src={review.image}
          width={124}
        />
      )}
      <Rating disabled value={review.ranks} onChange={() => {}} />
      <div className="text-body3-regular">{review.description}</div>
      <div className="text-caption-regular flex items-center gap-2 text-gray-300">
        {showUser && (
          <>
            <UserAvatar
              alt={review.userName}
              className="size-6"
              src={review.userImage}
            />
            <div>{review.userName}</div>
            <div>|</div>
          </>
        )}
        <div>{createdAtText}</div>
      </div>
      {userSession && <SessionInfo data={userSession} />}
    </li>
  );
}
