'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSignout } from '@/api/mutations/authMutations';
import { userQueries } from '@/api/queries/userQueries';
import LogoDefault from '@/assets/icons/logo-default.svg?react';
import LogoLarge from '@/assets/icons/logo-large.svg?react';
import Dropdown from '@/components/ui/Dropdown';
import UserAvatar from '@/components/ui/UserAvatar';

export default function Header() {
  const { data: user, isLoading } = useQuery(userQueries.me.info());
  const isLoggedIn = !isLoading && !!user;
  const signout = useSignout();

  return (
    <header className="tablet:h-15 tablet:px-6 sticky top-0 z-50 h-14 w-full border-b border-b-gray-600 bg-gray-800 px-4">
      <div className="tablet:gap-5 mx-auto flex h-full max-w-[1198px] items-center justify-between gap-3">
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
        <div>
          {isLoggedIn ? (
            <>
              <Dropdown>
                <Dropdown.TriggerNoArrow>
                  <UserAvatar src={user.image} className="size-10" />
                </Dropdown.TriggerNoArrow>
                <Dropdown.Content className="z-51">
                  <Dropdown.Item>
                    <Link href="/my">마이페이지</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => signout.mutate()}>
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </>
          ) : (
            <Link
              href="/signin"
              className="text-body3-semibold tablet:text-body2-semibold mx-2"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
