import UserAvatar from '@/components/ui/UserAvatar';
import { generateNextImageSizes } from '@/lib/Image';
import type { CrewMember } from '@/types';

interface ProfileListProps {
  members?: CrewMember[];
}

export default function ProfileList({ members }: ProfileListProps) {
  return (
    <div className="flex items-center -space-x-1">
      {members?.map((member: CrewMember) => (
        <UserAvatar
          key={member.userId}
          alt={`${member.name} 프로필 이미지`}
          className="tablet:size-6 size-4 data-[slot=avatar]:ring-1 data-[slot=avatar]:ring-gray-900"
          sizes={generateNextImageSizes({
            mobile: '16px',
            tablet: '24px',
          })}
          src={member.profileImage}
        />
      ))}
    </div>
  );
}
