import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  useDeleteCrew,
  useExpelMember,
  useLeaveCrew,
  useUpdateMemberRole,
} from '@/api/mutations/crewMutations';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import Settings from '@/assets/icons/settings.svg?react';
import VerticalEllipsis from '@/assets/icons/vertical-ellipsis.svg?react';
import CrewModal from '@/components/crew/CrewModal';
import { RoleBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import UserAvatar from '@/components/ui/UserAvatar';
import { useCrewRole } from '@/context/CrewDetailContext';
import { Crew, CrewMember, ROLE_LABEL } from '@/types';

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
          {myRole && <CrewMenuActions crew={crew} />}
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
              editMode="view"
              member={member}
            />
          );
        })}
      </div>
      <Modal>
        <Modal.Trigger aria-label="멤버 전체보기" asChild>
          <Button className="mt-8 w-full" variant="neutral">
            멤버 전체보기
          </Button>
        </Modal.Trigger>
        <Modal.Content
          className="tablet:h-[620px] tablet:w-[400px] tablet:gap-4 flex flex-col gap-5 bg-gray-800"
          fullscreenWhenMobile
          onCloseAutoFocus={() => setEditMode('view')}
        >
          <Modal.Title className="relative flex w-full items-start gap-2 self-start">
            <Modal.EmptyCloseButton
              className="tablet:hidden my-0.5 flex"
              onClick={() => setEditMode('view')}
            >
              <ChevronLeft className="size-6" />
            </Modal.EmptyCloseButton>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-body1-semibold line-clamp-1 text-white">
                  {crew.name}
                </span>
                {myRole === 'LEADER' && (
                  <button
                    onClick={() =>
                      setEditMode((prev) => (prev === 'view' ? 'edit' : 'view'))
                    }
                  >
                    <Settings className="size-5 fill-gray-200" />
                  </button>
                )}
              </div>
              <span className="text-body3-regular tablet:pb-0 pb-1 text-gray-200">
                {crew.city} • 멤버 {members.length}명
              </span>
            </div>
            <Modal.CloseButton
              className="tablet:flex absolute top-0 right-0 my-0.5 hidden"
              onClick={() => setEditMode('view')}
            />
          </Modal.Title>
          <div className="h-0 self-stretch outline-1 outline-offset-[-0.50px] outline-gray-700" />
          <Modal.Description className="flex w-full flex-1 flex-col overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800">
            {members.map((member) => (
              <CrewMemberListItem
                key={member.userId}
                editMode={editMode}
                member={member}
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

function CrewMenuActions({ crew: crewData }: { crew: Crew }) {
  const { crewId, myRole } = useCrewRole();
  const [currentModal, setCurrentModal] = useState<
    'leave' | 'delete' | 'edit' | 'delegate' | null
  >(null);
  const router = useRouter();

  const leaveCrew = useLeaveCrew(crewId ?? 0);
  // TODO: delegateCrewLeader: 현재 - 디자인 없음, API 있음; 추후 구현
  // const delegateCrewLeader = useDelegateCrewLeader(crewId ?? 0);
  const deleteCrew = useDeleteCrew(crewId ?? 0);

  return (
    <>
      <Dropdown size="lg">
        <Dropdown.TriggerNoArrow>
          <VerticalEllipsis className="size-6" />
        </Dropdown.TriggerNoArrow>
        <Dropdown.Content className="z-60 *:w-[120px]">
          {myRole !== 'LEADER' && (
            <Dropdown.Item onSelect={() => setCurrentModal('leave')}>
              크루 나가기
            </Dropdown.Item>
          )}
          {myRole === 'LEADER' && (
            <>
              <Dropdown.Item onSelect={() => setCurrentModal('edit')}>
                수정하기
              </Dropdown.Item>
              {/* TODO: 크루장 변경은 Modal이 떠야함 */}
              {/* <Dropdown.Item
                className="text-error-100"
                onSelect={() => setCurrentModal('delegate')}
              >
                크루장 변경
              </Dropdown.Item> */}
              <Dropdown.Item
                className="text-error-100"
                onSelect={() => setCurrentModal('delete')}
              >
                삭제하기
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Content>
      </Dropdown>

      {/** Edit Crew Modal */}
      <CrewModal
        crewData={crewData}
        handleCloseModal={() => setCurrentModal(null)}
        handleSuccess={() => setCurrentModal(null)}
        mode="edit"
        open={currentModal === 'edit'}
      />

      {/* Leave Crew Modal */}
      <Modal
        open={currentModal === 'leave'}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton />
          <Modal.Description>정말 탈퇴하시겠어요?</Modal.Description>
          <Modal.Footer className="w-full flex-row">
            <div className="flex flex-row gap-2">
              <Modal.Close asChild>
                <Button className="w-full" variant="neutral">
                  취소
                </Button>
              </Modal.Close>
              <Modal.Close asChild>
                <Button
                  className="w-full"
                  onClick={() =>
                    leaveCrew.mutate(undefined, {
                      onSuccess: () => {
                        router.push('/crews');
                      },
                      onError: () => {
                        router.refresh(); // 현재 페이지 새로 고침
                      },
                    })
                  }
                >
                  탈퇴
                </Button>
              </Modal.Close>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Delete Crew Modal */}
      <Modal
        open={currentModal === 'delete'}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
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
              </Modal.Close>
              <Modal.Close asChild>
                <Button
                  className="w-full"
                  onClick={() =>
                    deleteCrew.mutate(undefined, {
                      onSuccess: () => {
                        router.push('/crews');
                        toast.success('크루가 삭제되었습니다!');
                      },
                    })
                  }
                >
                  삭제
                </Button>
              </Modal.Close>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* TODO: Delegate Leader Modal - 디자인 없음, API 있음; 추후 구현 */}
    </>
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
    if (updateMemberRole.isPending || roleTo === member.role) return;
    updateMemberRole.mutate({ userId: member.userId, body: { role: roleTo } });
  };

  return (
    <div className="mb-5 flex items-center gap-3">
      <UserAvatar className="size-10 shrink-0" src={member.profileImage} />
      {editMode === 'view' && (
        <div className="flex flex-col gap-1">
          <div className="flex w-full items-center gap-1.5">
            <span className="text-body3-semibold">{member.name}</span>
            <RoleBadge role={member.role} />
          </div>
          <span className="text-caption-regular line-clamp-1">
            {member.introduction || '안녕하세요:) 잘 부탁드립니다!'}
          </span>
        </div>
      )}
      {editMode === 'edit' && (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-body3-semibold">{member.name}</span>
            {member.role === 'LEADER' && <RoleBadge role="LEADER" />}
            {member.role !== 'LEADER' && (
              <Dropdown size="sm">
                <Dropdown.Trigger className="bg-gray-700">
                  {ROLE_LABEL[member.role]}
                </Dropdown.Trigger>
                <Dropdown.Content className="z-60">
                  <Dropdown.Item onSelect={() => handleSelect('STAFF')}>
                    {ROLE_LABEL['STAFF']}
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={() => handleSelect('MEMBER')}>
                    {ROLE_LABEL['MEMBER']}
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            )}
          </div>
          {member.role !== 'LEADER' && (
            <Modal>
              <Modal.Trigger aria-label="멤버 추방" asChild>
                <button className="text-body3-medium text-error-100 shrink-0 px-3 py-2">
                  삭제하기
                </button>
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
                    </Modal.Close>
                    <Modal.Close asChild>
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
          )}
        </div>
      )}
    </div>
  );
}
