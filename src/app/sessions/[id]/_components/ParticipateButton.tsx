import { useQuery } from '@tanstack/react-query';
import {
  useRegisterSession,
  useUnregisterSession,
} from '@/api/mutations/sessionMutations';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';
import Button from '@/components/ui/Button';

interface ParticipateButtonProps {
  className?: string;
  sessionId: number;
}

export default function ParticipateButton({
  className,
  sessionId,
}: ParticipateButtonProps) {
  const data = useQuery({
    ...sessionQueries.participants(sessionId),
  });
  const user = useQuery({
    ...userQueries.me.info(),
  });

  const isParticipating = data.data?.participants.find(
    (participant) => participant.userId === user.data?.id
  );

  const registerMutation = useRegisterSession(sessionId);
  const unregisterMutation = useUnregisterSession(sessionId);

  return isParticipating ? (
    <Button
      variant="outlined"
      className={className}
      onClick={() => unregisterMutation.mutate()}
    >
      참여취소
    </Button>
  ) : (
    <Button
      variant="default"
      className={className}
      onClick={() => registerMutation.mutate()}
    >
      참여하기
    </Button>
  );
}
