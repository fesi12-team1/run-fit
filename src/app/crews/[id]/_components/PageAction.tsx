'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useJoinCrew, useLeaveCrew } from '@/api/mutations/crewMutations';
import Share from '@/assets/icons/share.svg';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useCrewRole } from '@/context/CrewDetailContext';
import { cn, copyStringToClipboard } from '@/lib/utils';

interface PageActionProps {
  className?: string;
}

export default function PageAction({ className }: PageActionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentModal, setCurrentModal] = useState<
    'share' | 'join' | 'leave' | null
  >(null);

  const { crewId, myRole } = useCrewRole();
  const isCrewAdmin = myRole === 'LEADER' || myRole === 'STAFF';

  const joinCrew = useJoinCrew(crewId ?? 0);
  const leaveCrew = useLeaveCrew(crewId ?? 0);

  const handleShare = async () => {
    await copyStringToClipboard(window.location.href);
    toast.success('크루 URL 주소가 복사되었어요!');
  };

  const handleCreateSession = () => {
    router.push(`/crews/${crewId}/create-session`);
  };

  const handleJoinCrew = () => {
    joinCrew.mutate(undefined, {
      onError: () => {
        setCurrentModal('join');
      },
    });
  };

  const handleLeaveCrew = () => {
    setCurrentModal('leave');
  };

  return (
    <>
      <div className={cn('flex items-center gap-7', className)}>
        <button
          type="button"
          aria-label="크루 링크 공유하기"
          onClick={handleShare}
        >
          <Share className="size-6 text-[#9CA3AF]" />
        </button>

        {!myRole ? (
          <Button
            className="text-body2-semibold flex-1 px-6 py-3"
            onClick={handleJoinCrew}
          >
            가입하기
          </Button>
        ) : isCrewAdmin ? (
          <Button
            className="text-body2-semibold flex-1 px-6 py-3"
            onClick={handleCreateSession}
          >
            세션 생성하기
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="text-body2-semibold flex-1 px-6 py-3"
            onClick={handleLeaveCrew}
          >
            크루 나가기
          </Button>
        )}
      </div>

      {/* Join Crew Modal (Login Required) */}
      <Modal
        open={currentModal === 'join'}
        onOpenChange={(open) => !open && setCurrentModal(null)}
      >
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton />
          <Modal.Description>
            크루에 가입하려면 로그인이 필요해요!
          </Modal.Description>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button
                className="text-body2-semibold flex-1 px-6 py-3"
                onClick={() => {
                  router.push(`/signin?redirect=${pathname}`);
                }}
              >
                로그인 하기
              </Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

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
            <div className="flex w-full flex-row gap-2">
              <Modal.Close asChild>
                <Button className="w-full shrink" variant="neutral">
                  취소
                </Button>
              </Modal.Close>
              <Button
                className="w-full shrink"
                disabled={leaveCrew.isPending}
                onClick={() => {
                  leaveCrew.mutate(undefined, {
                    onSettled: () => setCurrentModal(null),
                  });
                }}
              >
                {leaveCrew.isPending ? '처리 중...' : '나가기'}
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
