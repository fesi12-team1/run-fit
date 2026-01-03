'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MyInfo from '@/components/my/MyInfo';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const dynamic = 'force-dynamic';

export default function MyPage() {
  const router = useRouter();
  const isPc = useMediaQuery({ min: 'laptop' });

  useEffect(() => {
    if (isPc) {
      router.replace('/my/sessions');
    }
  }, [isPc, router]);

  if (isPc) return null;

  return <MyInfo />;
}
