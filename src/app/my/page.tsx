'use client';

import { useRouter } from 'next/navigation';
import MyInfo from '@/components/my/MyInfo';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function MyPage() {
  const router = useRouter();
  const isLaptop = useMediaQuery('laptop');
  const isDesktop = useMediaQuery('desktop');
  const isPc = isLaptop || isDesktop;

  if (isPc) {
    router.replace('/my/sessions');
    return null;
  }

  return <MyInfo />;
}
