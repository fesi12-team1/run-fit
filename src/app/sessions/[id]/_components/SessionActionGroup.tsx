import { cn } from '@/lib/utils';
import { Session } from '@/types';
import CopyUrlButton from './CopyUrlButton';
import LikeButton from './LikeButton';
import ParticipateButton from './ParticipateButton';

interface SessionActionGroupProps {
  className?: string;
  session: Session;
}

export default function SessionActionGroup({
  className,
  session,
}: SessionActionGroupProps) {
  return (
    <div className={cn(`flex items-center gap-7`, className)}>
      <div className="flex items-center gap-4">
        <LikeButton sessionId={session.id} />
        <CopyUrlButton />
      </div>
      <ParticipateButton className="flex-1" sessionId={session.id} />
    </div>
  );
}
