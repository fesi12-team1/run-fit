'use client';

import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';
import MyInfo from '@/components/my/MyInfo';
import MyTabs from '@/components/my/MyTabs';
import Spinner from '@/components/ui/Spinner';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function MyLayout({ children }: { children: React.ReactNode }) {
  const isSmallDevice = useMediaQuery({ max: 'laptop' });

  const { data: user, isLoading } = useQuery(userQueries.me.info());

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="text-brand-500 size-8" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="tablet:pt-7.5 laptop:pt-[47px] tablet:mx-20 laptop:mx-auto mx-6 flex max-w-[1320px] gap-20 pt-3.5">
      <aside className="laptop:block ml-5 hidden w-[327px]">
        <MyInfo />
      </aside>

      <div className="tablet:gap-16 laptop:gap-10 mx-5 flex min-w-0 flex-1 flex-col gap-[27px]">
        <div className="block w-full">
          <MyTabs isSmallDevice={isSmallDevice} />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
