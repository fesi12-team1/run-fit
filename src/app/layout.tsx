import type { Metadata } from 'next';
import { QueryProvider } from '@/provider/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'RunFit - 러너를 위한 지역 기반 러닝 모임 플랫폼',
  description:
    '지역·날짜·페이스에 맞는 러닝 모임을 쉽게 탐색하고 참여할 수 있는 러닝 커뮤니티 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
