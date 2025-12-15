'use client';

import Image from 'next/image';
import Link from 'next/link';
import Hamburger from '@/assets/icons/hamburger.svg';

export default function Header() {
  const { isLoggedIn, user } = { isLoggedIn: true, user: { image: null } };

  return (
    <header className="tablet:h-15 tablet:px-6 sticky top-0 z-50 h-14 w-full border-b border-b-gray-600 bg-gray-800 px-4">
      <div className="tablet:gap-5 mx-auto flex h-full max-w-[1198px] items-center justify-between gap-3">
        <Link href="/">
          <Image
            src="/assets/symbol.png"
            alt="Symbol"
            width={40}
            height={40}
            className="tablet:hidden block"
          />
          <Image
            src="/assets/symbol-text.png"
            alt="Symbol"
            width={120}
            height={40}
            className="tablet:block hidden"
          />
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
              <Link href="/my">
                {/* @TODO: UserAvatar 추가 시 아래 줄 삭제 */}
                <div className="tablet:block hidden size-10 rounded-full bg-white"></div>
                {/* <UserAvatar src={user.image} className="size-10" /> */}
              </Link>
              <Hamburger className="tablet:hidden size-6" />
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
