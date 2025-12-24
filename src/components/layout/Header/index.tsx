'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSignout } from '@/api/mutations/authMutations';
import { userQueries } from '@/api/queries/userQueries';
import LogoDefault from '@/assets/icons/logo-default.svg?react';
import LogoLarge from '@/assets/icons/logo-large.svg?react';
import Dropdown from '@/components/ui/Dropdown';
import SafeImage from '@/components/ui/SafeImage';
import { cn } from '@/lib/utils';
import { type Profile } from '@/types';

export default function Header() {
  const pathname = usePathname();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    ...userQueries.me.info(),
    retry: false,
  });
  const safeUser = (isError ? null : user) ?? null;

  return (
    <HeaderView pathname={pathname} user={safeUser} isLoading={isLoading} />
  );
}

export function HeaderView({
  pathname,
  user,
  isLoading,
}: {
  pathname: string;
  user: Profile | null;
  isLoading: boolean;
}) {
  const isLoggedIn = !!user;

  return (
    <header className="tablet:h-15 tablet:px-6 sticky top-0 z-20 h-14 w-full border-b border-b-gray-600 bg-gray-800 px-4">
      <div className="tablet:gap-5 mx-auto flex h-full max-w-[1120px] items-center justify-between gap-3">
        <Link href="/" className="relative flex items-center justify-center">
          <LogoDefault className="tablet:hidden block" />
          <LogoLarge className="tablet:block hidden" />
        </Link>
        <nav className="text-body3-semibold tablet:text-body2-semibold tablet:gap-6 flex h-full flex-1 items-stretch gap-3">
          <Link
            href="/sessions"
            className={cn(
              'flex items-center text-gray-300 hover:text-white',
              isSessionsButNotLikes(pathname) && 'text-white'
            )}
          >
            세션 목록
          </Link>
          <Link
            href="/crews"
            className={cn(
              'flex items-center text-gray-300 hover:text-white',
              isCrews(pathname) && 'text-white'
            )}
          >
            크루 찾기
          </Link>
          {isLoggedIn && (
            <Link
              href="/sessions/likes"
              className={cn(
                'flex items-center text-gray-300 hover:text-white',
                isSessionsLikes(pathname) && 'text-white'
              )}
            >
              찜한 세션
            </Link>
          )}
        </nav>
        <div className="flex items-center">
          {isLoading ? (
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-700" />
          ) : isLoggedIn ? (
            <UserMenu user={user} />
          ) : (
            <GuestMenu />
          )}
        </div>
      </div>
    </header>
  );
}

function UserMenu({ user }: { user: Profile }) {
  const signout = useSignout({
    onSuccess: () => {
      router.push('/');
    },
  });

  const router = useRouter();

  return (
    <Dropdown>
      <Dropdown.TriggerNoArrow asChild>
        <div className="relative size-10 overflow-hidden rounded-lg border border-gray-700">
          <SafeImage
            src={user.image}
            fallbackSrc="/assets/profile-default.png"
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
      </Dropdown.TriggerNoArrow>
      <Dropdown.Content className="z-100 flex flex-col">
        <Dropdown.Item asChild>
          <Link href="/my">내 프로필</Link>
        </Dropdown.Item>
        <Dropdown.Item asChild>
          <button
            onClick={() => {
              signout.mutate();
            }}
          >
            로그아웃
          </button>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

function GuestMenu() {
  return (
    <Link
      href="/signin"
      className="text-body3-semibold tablet:text-body2-semibold mx-2"
    >
      로그인
    </Link>
  );
}

function isSessionsButNotLikes(pathname: string) {
  const isSessions =
    pathname === '/sessions' || pathname.startsWith('/sessions/');

  const isLikes =
    pathname === '/sessions/likes' || pathname.startsWith('/sessions/likes/');

  return isSessions && !isLikes;
}

function isCrews(pathname: string) {
  return pathname === '/crews' || pathname.startsWith('/crews/');
}

function isSessionsLikes(pathname: string) {
  return (
    pathname === '/sessions/likes' || pathname.startsWith('/sessions/likes/')
  );
}
