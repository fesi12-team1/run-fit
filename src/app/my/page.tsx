'use client';

import { redirect } from 'next/navigation';
import MyInfo from '@/components/my/MyInfo';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function MyPage() {
  const isLaptop = useMediaQuery('laptop');
  const isDesktop = useMediaQuery('desktop');
  const isPc = isLaptop || isDesktop;

  if (isPc) {
    redirect('/my/sessions');
  }

  return <MyInfo />;
}
