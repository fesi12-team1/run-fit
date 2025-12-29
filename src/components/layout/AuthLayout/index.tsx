'use client';

import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface AuthLayoutProps {
  title: string;
  form: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: Route;
}

export default function AuthLayout({
  title,
  form,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  const isLaptopUp = useMediaQuery({ min: 'laptop' });
  const isTablet = useMediaQuery({ min: 'tablet', max: 'laptop' });

  // 배경 이미지 선택
  const bgSrc = isLaptopUp
    ? '/assets/bg/pc.png'
    : isTablet
      ? '/assets/bg/tb.png'
      : '/assets/bg/mo.png';

  // 배너 가변 스타일
  const bannerScale = isLaptopUp
    ? 'scale-100'
    : isTablet
      ? 'scale-90'
      : 'scale-75';
  const bannerTop = isLaptopUp ? 'top-1/2' : 'top-[30%]';

  return (
    <main className="h-main laptop:flex-row flex flex-col">
      {/* 좌측 레이아웃 */}
      <div className="laptop:w-1/2 relative flex h-[calc(100vh-56px)] w-full items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <Image
          src={bgSrc}
          alt="Background"
          fill
          className="object-cover"
          priority
        />

        {/* 배너 */}
        <Image
          src="/assets/banner.png"
          alt="Banner"
          width={600}
          height={400}
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${bannerTop} ${bannerScale}`}
        />

        {/* 모바일 + 태블릿 폼: cols 1개 */}
        {!isLaptopUp && (
          <div className="tablet:px-[122px] absolute top-[62%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-8">
            <h2 className="text-title2-semibold mb-8 text-center text-white">
              {title}
            </h2>
            {form}
            <p className="text-body3-medium mt-6 text-center text-white">
              {footerText}
              <Link href={footerLinkHref} className="text-brand-300 ml-1">
                {footerLinkText}
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* 랩탑 이상 전용 폼: cols 2개 */}
      {isLaptopUp && (
        <div className="laptop:flex laptop:w-1/2 laptop:-translate-x-12 hidden items-center justify-center px-28">
          <div className="w-full max-w-md">
            <h2 className="text-title2-semibold mb-8 text-center">{title}</h2>
            {form}
            <p className="text-body3-medium mt-6 text-center">
              {footerText}
              <Link href={footerLinkHref} className="text-brand-300 ml-1">
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
