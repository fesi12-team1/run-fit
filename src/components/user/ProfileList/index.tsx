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
          src={member.profileImage || '/assets/profile-default.png'}
          alt={member.name}
          className="mobile:size-4 size-6 ring-1 ring-gray-700"
        />
      ))}
    </div>
  );
}
