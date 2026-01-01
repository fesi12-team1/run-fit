import UserAvatar from '@/components/ui/UserAvatar';
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
          alt={member.name}
          className="tablet:size-6 size-4 data-[slot=avatar]:ring-1 data-[slot=avatar]:ring-gray-900"
          src={member.profileImage || '/assets/profile-default.png'}
        />
      ))}
    </div>
  );
}
