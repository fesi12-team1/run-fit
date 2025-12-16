import UserAvatar from '@/components/ui/UserAvatar';
import { cn } from '@/lib/utils';
import type { CrewMember } from '@/types';

interface ProfileListProps extends React.ComponentProps<'div'> {
  data: CrewMember[];
}

export default function ProfileList({
  data: members,
  className,
  ...props
}: ProfileListProps) {
  return (
    <div className={cn('flex -space-x-1', className)} {...props}>
      {members.slice(0, 3).map((member) => (
        <UserAvatar
          key={member.userId}
          src={member.profileImage}
          alt={member.name}
          className="tablet:size-6 size-4 data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-gray-900"
        />
      ))}
    </div>
  );
}
