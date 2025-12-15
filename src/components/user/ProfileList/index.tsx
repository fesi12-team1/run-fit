import UserAvatar from '@/components/ui/UserAvatar';
import { cn } from '@/lib/utils';
import type { CrewMember } from '@/types';

interface ProfileListProps {
  data: CrewMember[];
  className?: React.ComponentProps<'div'>;
}

export default function ProfileList({ data, className }: ProfileListProps) {
  return (
    <div
      className={cn(
        'tablet:*:size-6 flex items-center -space-x-1 *:size-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-gray-900',
        className
      )}
    >
      {data.slice(0, 3).map((member) => (
        <UserAvatar
          key={member.userId}
          src={member.profileImage}
          alt={member.name}
        />
      ))}
    </div>
  );
}
