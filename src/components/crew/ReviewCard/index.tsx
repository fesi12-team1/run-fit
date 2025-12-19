'use client';

import { useQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import SessionInfo from '@/components/session/SessionInfo';
import Rating from '@/components/ui/Rating';
import UserAvatar from '@/components/ui/UserAvatar';
import { Review } from '@/types';

interface ReviewCardProps {
  data: Review;
}

export default function ReviewCard({ data: review }: ReviewCardProps) {
  const { data: userSession } = useQuery(
    sessionQueries.detail(review.sessionId)
  );
  const createdAt = new Date(review.createdAt);
  const createdAtText = `${createdAt.getFullYear()}.${createdAt.getMonth() + 1}.${createdAt.getDate()}`;
  return (
    <li className="flex flex-col gap-2">
      <Rating value={review.ranks} disabled onChange={() => {}} />
      <div className="text-body3-regular">{review.description}</div>
      <div className="*:text-caption-regular flex items-center gap-2 *:text-gray-300">
        <UserAvatar src={review.userImage} alt={review.userName} />
        <div>{review.userName}</div>
        <div>|</div>
        <div>{createdAtText}</div>
      </div>
      {userSession && <SessionInfo data={userSession} />}
    </li>
  );
}
