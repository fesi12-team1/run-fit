'use client';

import { useQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import FixedBottomBar from '@/components/layout/FixedBottomBar';
import { Session } from '@/types';
import SessionActionGroup from './SessionActionGroup';

interface BottomBarProps {
  sessionId: Session['id'];
}

export default function BottomBar({ sessionId }: BottomBarProps) {
  const { data: session } = useQuery(sessionQueries.detail(Number(sessionId)));

  if (!session) return null;

  return (
    <FixedBottomBar>
      <SessionActionGroup session={session} />
    </FixedBottomBar>
  );
}
