'use client';

import { Suspense } from 'react';
import SessionPageInner from '@/components/session/SessionPageInner';

export default function SessionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionPageInner />
    </Suspense>
  );
}
