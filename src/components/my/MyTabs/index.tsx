'use client';

import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Tab = {
  label: string;
  href: Route;
};
export const DESKTOP_TABS: Tab[] = [
  { label: '참여 세션', href: '/my/sessions' },
  { label: '나의 리뷰', href: '/my/reviews' },
  { label: '소속 크루', href: '/my/crews' },
  { label: '세션 관리', href: '/my/manage' },
];

export const MOBILE_TABS: Tab[] = [
  { label: 'My 홈', href: '/my' },
  ...DESKTOP_TABS,
];

interface MyTabsProps {
  isSmallDevice: boolean;
}

export default function MyTabs({ isSmallDevice }: MyTabsProps) {
  const pathname = usePathname();
  const tabs = isSmallDevice ? MOBILE_TABS : DESKTOP_TABS;

  return (
    <nav className="flex w-full">
      {tabs.map((tab) => {
        const isActive =
          tab.href === '/my'
            ? pathname === '/my'
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex-1 border-b py-2.5 text-center',
              isActive
                ? 'text-body3-semibold border-white text-white'
                : 'text-body3-medium border-gray-400 text-gray-300'
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
