'use client';

import { useRouter } from 'next/navigation';
import ErrorFallback from '@/components/ui/ErrorFallback';

export default function SessionPageContentErrorFallback() {
  const router = useRouter();

  return (
    <ErrorFallback
      actionLabel="다시 시도"
      imageSrc="/assets/session-default.png"
      message="세션 목록을 불러오는데 실패했습니다."
      onAction={() => router.refresh()}
    />
  );
}
