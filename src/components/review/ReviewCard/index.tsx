'use client';

import { mockProfiles, mockSessions } from '@/mocks/data';
import { Review } from '@/types';
import SessionInfo from '../../session/SessionInfo';
import Rating from '../../ui/Rating';
import UserAvatar from '../../ui/UserAvatar';

interface ReviewCardProps {
  data: Review;
}

export default function ReviewCard({ data: review }: ReviewCardProps) {
  // const { data: userProfile } = useGetUserProfile(review.id); // tanstack-query hook
  const userProfile = mockProfiles[0];

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
      <SessionInfo data={mockSessions[0]} />
    </li>
  );
}
