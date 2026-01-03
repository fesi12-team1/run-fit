import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  useRegisterSession,
  useUnregisterSession,
} from '@/api/mutations/sessionMutations';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { signInModal } from '@/store/signinModal';

interface ParticipateButtonProps {
  className?: string;
  sessionId: number;
}

/**
 세션 참여/참여취소 버튼 컴포넌트
 사용자가 참여한 상태인지에 따라 버튼 동작이 달라짐
 참여 상태 구하는 법: 세션 참가자 목록 API 조회 후 현재 사용자 ID와 비교
  - 참여한 상태: "참여취소" 버튼, 클릭 시 세션 참여 취소 뮤테이션 실행
  - 참여하지 않은 상태: "참여하기" 버튼, 클릭 시 세션 참여 뮤테이션 실행

  세션 API 활용
  - 세션이 시간이 마감된 경우 버튼 비활성화
  - 세션 인원이 가득 찬 경우에도 버튼 비활성화

  버튼 클릭 시 로그인하지 않은 경우 로그인부터 유도하는 모달이 뜨도록 함
  버튼 클릭 시 크루에 가입하지 않았으면(API 응답으로 제공됨) 크루 가입부터 유도하는 모달이 뜨도록 함
 */

export function useSessionAction(sessionId: number) {
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);

  const { data: user } = useQuery({ ...userQueries.me.info() });
  const { data: detail } = useQuery({ ...sessionQueries.detail(sessionId) });
  const { data: participantsData } = useQuery({
    ...sessionQueries.participants(sessionId),
    enabled: !!user, // 로그인 정보가 있을 때만 참여자 목록 조회
  });

  const isParticipating = !!participantsData?.participants.find(
    (p) => p.userId === user?.id
  );

  const isClosed = detail ? new Date(detail.registerBy) < new Date() : false;
  const isFull = detail
    ? detail.currentParticipantCount >= detail.maxParticipantCount
    : false;
  const isHost = detail?.hostUserId === user?.id;

  const registerMutation = useRegisterSession(sessionId, {
    onError: (error) => {
      const status = error.status;
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'SESSION_FULL') {
        toast.error(errorMessage || '세션 정원이 모두 찼습니다.');
        return;
      }

      if (errorCode === 'SESSION_CLOSED') {
        toast.error(errorMessage || '세션 신청이 마감되었습니다.');
        return;
      }

      // 1. 비로그인 처리 (401)
      if (status === '401' || errorCode === 'UNAUTHORIZED') {
        signInModal.open();
        return;
      }

      // 2. 미가입 크루 처리 (403)
      if (status === '403' || errorCode === 'NOT_CREW_MEMBER') {
        setIsCrewModalOpen(true);
        return;
      }
    },
  });

  const unregisterMutation = useUnregisterSession(sessionId);

  return {
    states: {
      isParticipating,
      isClosed,
      isFull,
      isHost,
      isLoading: !detail || (!!user && !participantsData), // 유저가 있는데 데이터가 없으면 로딩
      isCrewModalOpen,
    },
    actions: {
      register: registerMutation.mutate,
      unregister: unregisterMutation.mutate,
      setIsCrewModalOpen,
    },
    detail,
  };
}

export default function ParticipateButton({
  sessionId,
  className,
}: ParticipateButtonProps) {
  const { states, actions, detail } = useSessionAction(sessionId);

  if (states.isLoading)
    return (
      <Button disabled className={className}>
        확인 중...
      </Button>
    );

  if (states.isParticipating) {
    return (
      <Button
        variant="outlined"
        className={className}
        onClick={() => actions.unregister()}
        disabled={states.isHost}
      >
        참여 취소하기
      </Button>
    );
  }

  const isDisabled = states.isClosed || states.isFull;
  const buttonText = states.isClosed
    ? '참여 마감'
    : states.isFull
      ? '인원 모집 완료'
      : '참여하기';

  return (
    <>
      <Button
        variant="default"
        className={className}
        disabled={isDisabled}
        onClick={() => actions.register()}
      >
        {buttonText}
      </Button>
      {/* 크루 가입 유도 모달 */}
      {detail && (
        <JoinCrewModal
          isOpen={states.isCrewModalOpen}
          setIsOpen={actions.setIsCrewModalOpen}
          crewId={detail.crewId}
        />
      )}
    </>
  );
}

export function JoinCrewModal({
  isOpen,
  setIsOpen,
  crewId,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  crewId: number;
}) {
  return (
    <Modal open={isOpen}>
      <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
        <Modal.Title />

        <Modal.CloseButton onClick={() => setIsOpen(false)} />

        <Modal.Description>
          세션에 참여하려면 먼저 크루에 가입해야 해요!
        </Modal.Description>

        <Modal.Footer>
          <Modal.Close asChild>
            <Button asChild>
              <Link href={`/crews/${crewId}`}>가입하러 가기</Link>
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
