'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSignout } from '@/api/mutations/authMutations';
import { userQueries } from '@/api/queries/userQueries';
import LogoDefault from '@/assets/icons/logo-default.svg?react';
import LogoLarge from '@/assets/icons/logo-large.svg?react';
import Dropdown from '@/components/ui/Dropdown';
import UserAvatar from '@/components/ui/UserAvatar';
import { type Profile } from '@/types';

export default function Header() {
  const { data: user, isLoading } = useQuery(userQueries.me.info());
  const pathname = usePathname();
  const isLoggedIn = !isLoading && !!user;

  return (
    <header className="tablet:h-15 tablet:px-6 sticky top-0 z-50 h-14 w-full border-b border-b-gray-600 bg-gray-800 px-4">
      <div className="tablet:gap-5 mx-auto flex h-full max-w-[1120px] items-center justify-between gap-3">
        <Link href="/" className="relative flex items-center justify-center">
          <LogoDefault className="tablet:hidden block" />
          <LogoLarge className="tablet:block hidden" />
        </Link>
        <nav className="text-body3-semibold tablet:text-body2-semibold tablet:gap-6 flex h-full flex-1 items-stretch gap-3">
          <Link href="/sessions" className="flex items-center">
            세션 목록
          </Link>
          <Link href="/crews" className="flex items-center">
            크루 찾기
          </Link>
          {isLoggedIn && (
            <Link href="/sessions/likes" className="flex items-center">
              찜한 세션
            </Link>
          )}
        </nav>
        <div>{isLoggedIn ? <UserMenu user={user} /> : <GuestMenu />}</div>
      </div>
    </header>
  );
}

function UserMenu({ user }: { user: Profile }) {
  const signout = useSignout();

  return (
    <Dropdown>
      <Dropdown.TriggerNoArrow>
        <UserAvatar
          src={user.image || '/assets/profile-default.png'}
          alt={user.name}
          className="tablet:size-8 size-6 data-[slot=avatar]:ring-1 data-[slot=avatar]:ring-gray-900"
        />
      </Dropdown.TriggerNoArrow>
      <Dropdown.Content>
        <Dropdown.Item asChild>
          <Link href="/my">내 프로필</Link>
        </Dropdown.Item>
        <Dropdown.Item asChild>
          <button onClick={() => signout.mutate()}>로그아웃</button>
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
