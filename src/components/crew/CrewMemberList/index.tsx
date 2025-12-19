import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import UserAvatar from '@/components/ui/UserAvatar';
import { CrewMember } from '@/types';

function LeaderTag() {
  return (
    <Badge variant="none" size="sm" className="bg-brand-900">
      <span className="text-brand-200">크루장</span>
    </Badge>
  );
}
function StaffTag() {
  return (
    <Badge variant="none" size="sm" className="bg-gray-700">
      <span className="text-gray-200">운영진</span>
    </Badge>
  );
}

function CrewMemberListItem({ member }: { member: CrewMember }) {
  const { data: user } = useQuery(userQueries.profile(member.userId));
  {
    /*
    TODO:
    - CrewMember를 받을 때 introduction도 같이 받아야함
    - 전체적인 DTO 정리 후 수정 요청 필요
    */
  }

  return (
    <div className="mb-3 flex gap-3">
      <UserAvatar src={member.profileImage} />
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-1.5">
          <span className="text-body3-semibold">{member.name}</span>
          {member.role === 'STAFF' && <StaffTag />}
          {member.role === 'LEADER' && <LeaderTag />}
        </div>
        <span className="text-caption-regular">
          {user?.introduction || '안녕하세요:) 잘 부탁드립니다!'}
        </span>
      </div>
    </div>
  );
}
interface CrewMemberListProps {
  members: CrewMember[];
  children?: React.ReactNode;
}
export default function CrewMemberList({
  members,
  children,
}: CrewMemberListProps) {
  return (
    <div className="flex flex-col">
      {children}
      <div className="flex flex-col">
        {members.slice(0, 4).map((member) => {
          return <CrewMemberListItem key={member.userId} member={member} />;
        })}
      </div>
      <Button variant="neutral" className="mt-8 w-full">
        멤버 전체보기
      </Button>
    </div>
  );
}
