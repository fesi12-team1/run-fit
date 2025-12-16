'use client';

import SessionInfo from '@/components/session/SessionInfo';
import Rating from '@/components/ui/Rating';
import UserAvatar from '@/components/ui/UserAvatar';
import { Profile, Review, Session } from '@/types';

interface ReviewCardProps {
  data: Review;
}

export default function ReviewCard({ data: review }: ReviewCardProps) {
  // TODO: use tanstack query to fetch
  const userProfile = {} as Profile;
  const userSession = {} as Session;

  const createdAt = new Date(review.createdAt);
  const createdAtText = `${createdAt.getFullYear()}.${createdAt.getMonth() + 1}.${createdAt.getDate()}`;
  return (
    <li className="flex flex-col gap-2">
      <Rating value={review.ranks} disabled onChange={() => {}} />
      <div className="text-body3-regular">{review.description}</div>
      <div className="*:text-caption-regular flex items-center gap-2 *:text-gray-300">
        <UserAvatar src={userProfile.image} alt={userProfile.name} />
        <div>{userProfile.name}</div>
        <div>|</div>
        <div>{createdAtText}</div>
      </div>
      <SessionInfo data={userSession} />
    </li>
  );
}
