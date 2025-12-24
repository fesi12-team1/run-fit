import { useState } from 'react';
import {
  useDelegateCrewLeader,
  useDeleteCrew,
  useExpelMember,
  useLeaveCrew,
  useUpdateCrewDetail,
  useUpdateMemberRole,
} from '@/api/mutations/crewMutations';
import Settings from '@/assets/icons/settings.svg?react';
import VerticalEllipsis from '@/assets/icons/vertical-ellipsis.svg?react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import UserAvatar from '@/components/ui/UserAvatar';
import { useCrewRole } from '@/context/CrewDetailContext';
import { Crew, CrewMember } from '@/types';

interface CrewMemberListProps {
  crew: Crew;
  members: CrewMember[];
  children?: React.ReactNode;
}
export default function CrewMemberList({
  crew,
  members,
  children,
}: CrewMemberListProps) {
  const { myRole } = useCrewRole();
  const [editMode, setEditMode] = useState<'view' | 'edit'>('view');
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-title3-semibold line-clamp-1 text-gray-50">
            {crew.name}
          </span>
          {myRole && <CrewMenuActions />}
        </div>
        <span className="text-body3-regular laptop:pb-0 pb-4 text-gray-200">
          {crew.city} • 멤버 {members.length}명
        </span>
      </div>
      {children}
      <div className="flex flex-col">
        {members.slice(0, 4).map((member) => {
          return (
            <CrewMemberListItem
              key={member.userId}
              member={member}
              editMode="view"
            />
          );
        })}
      </div>
      <Modal>
        <Modal.Trigger aria-label="멤버 전체보기" asChild>
          <Button variant="neutral" className="mt-8 w-full">
            멤버 전체보기
          </Button>
        </Modal.Trigger>
        <Modal.Content
          className="tablet:h-[620px] flex h-full w-[400px] flex-col bg-gray-800"
          onCloseAutoFocus={() => setEditMode('view')}
        >
          <Modal.Title className="self-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-title3-semibold line-clamp-1 text-gray-50">
                  {crew.name}
                </span>
                {myRole === 'LEADER' && (
                  <Settings
                    className="size-5 fill-gray-300"
                    onClick={() => setEditMode('edit')}
                  />
                )}
              </div>
              <span className="text-body3-regular laptop:pb-0 pb-4 text-gray-200">
                {crew.city} • 멤버 {members.length}명
              </span>
            </div>
          </Modal.Title>
          <Modal.CloseButton onClick={() => setEditMode('view')} />
          <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-gray-700" />
          <Modal.Description className="flex w-full flex-col overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800">
            {members.map((member) => (
              <CrewMemberListItem
                key={member.userId}
                member={member}
                editMode={editMode}
              />
            ))}
          </Modal.Description>
          {editMode !== 'view' && (
            <Modal.Footer className="w-full">
              <Button className="w-full" onClick={() => setEditMode('view')}>
                완료
              </Button>
            </Modal.Footer>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}

function CrewMenuActions() {
  const { crewId, myRole } = useCrewRole();

  const leaveCrew = useLeaveCrew(crewId ?? 0);
  const updateCrewDetail = useUpdateCrewDetail(crewId ?? 0);
  const delegateCrewLeader = useDelegateCrewLeader(crewId ?? 0);
  const deleteCrew = useDeleteCrew(crewId ?? 0);

  return (
    <Dropdown size="lg">
      <Dropdown.TriggerNoArrow>
        <VerticalEllipsis className="size-6" />
      </Dropdown.TriggerNoArrow>
      <Dropdown.Content className="z-60 *:w-[120px]">
        {myRole !== 'LEADER' && (
          <Modal>
            <Dropdown.Item onClick={() => leaveCrew.mutate()}>
              크루 나가기
            </Dropdown.Item>
          </Modal>
        )}
        {myRole === 'LEADER' && (
          <>
            {/* TODO: 수정 및 변경은 Modal이 떠야함 */}
            <Dropdown.Item>수정하기</Dropdown.Item>
            <Dropdown.Item className="text-error-100">
              크루장 변경
            </Dropdown.Item>
            <Modal>
              <Modal.Trigger aria-label="크루 삭제하기" asChild>
                <Dropdown.Item className="text-error-100">
                  삭제하기
                </Dropdown.Item>
              </Modal.Trigger>
              <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
                <Modal.Title />
                <Modal.CloseButton />
                <Modal.Description className="flex flex-col items-center justify-center">
                  <span>삭제 후에는 되돌릴 수 없어요</span>
                  <span>정말 삭제하시겠어요?</span>
                </Modal.Description>
                <Modal.Footer className="w-full flex-row">
                  <div className="flex flex-row gap-2">
                    <Modal.Close asChild>
                      <Button className="w-full" variant="neutral">
                        취소
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => deleteCrew.mutate()}
                      >
                        삭제
                      </Button>
                    </Modal.Close>
                  </div>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </>
        )}
      </Dropdown.Content>
    </Dropdown>
  );
}

function LeaderTag() {
  return (
    <Badge variant="none" size="md" className="bg-brand-900">
      <span className="text-brand-200 font-700 text-[10px] leading-none">
        크루장
      </span>
    </Badge>
  );
}

function StaffTag() {
  return (
    <Badge variant="none" size="md" className="bg-gray-700">
      <span className="font-700 text-[10px] leading-none text-gray-200">
        운영진
      </span>
    </Badge>
  );
}

function CrewMemberListItem({
  member,
  editMode,
}: {
  member: CrewMember;
  editMode: 'view' | 'edit';
}) {
  const { crewId } = useCrewRole();

  const expelMember = useExpelMember(crewId ?? 0);
  const updateMemberRole = useUpdateMemberRole(crewId ?? 0);
  const handleSelect = (roleTo: 'STAFF' | 'MEMBER') => {
    if (roleTo === member.role) return;

    updateMemberRole.mutate({ userId: member.userId, body: { role: roleTo } });
  };

  const roleText = (role = member.role) => {
    switch (role) {
      case 'LEADER':
        return '크루장';
      case 'STAFF':
        return '운영진';
      case 'MEMBER':
        return '일반';
      default:
        break;
    }
  };
  return (
    <div className="mb-5 flex items-center gap-3">
      <UserAvatar src={member.profileImage} className="size-10 shrink-0" />
      {editMode === 'view' ? (
        <div className="flex flex-col gap-1">
          <div className="flex w-full items-center gap-1.5">
            <span className="text-body3-semibold">{member.name}</span>
            {member.role === 'LEADER' && <LeaderTag />}
            {member.role === 'STAFF' && <StaffTag />}
          </div>
          <span className="text-caption-regular line-clamp-1">
            {member.introduction || '안녕하세요:) 잘 부탁드립니다!'}
          </span>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-body3-semibold">{member.name}</span>
            {member.role === 'LEADER' && <LeaderTag />}
            {member.role !== 'LEADER' && (
              <Dropdown size="lg">
                <Dropdown.Trigger>{roleText()}</Dropdown.Trigger>
                <Dropdown.Content className="z-60">
                  <Dropdown.Item onSelect={() => handleSelect('STAFF')}>
                    운영진
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={() => handleSelect('MEMBER')}>
                    일반
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            )}
          </div>
          <Modal>
            <Modal.Trigger aria-label="멤버 추방" asChild>
              <span className="text-body3-medium text-error-100 shrink-0 px-3 py-2">
                삭제하기
              </span>
            </Modal.Trigger>
            <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
              <Modal.Title />
              <Modal.CloseButton />
              <Modal.Description className="flex flex-col items-center justify-center">
                <span>삭제 후에는 되돌릴 수 없어요</span>
                <span>정말 삭제하시겠어요?</span>
              </Modal.Description>
              <Modal.Footer className="w-full flex-row">
                <div className="flex flex-row gap-2">
                  <Modal.Close asChild>
                    <Button className="w-full" variant="neutral">
                      취소
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => expelMember.mutate(member.userId)}
                    >
                      확인
                    </Button>
                  </Modal.Close>
                </div>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>
      )}
    </div>
  );
}
