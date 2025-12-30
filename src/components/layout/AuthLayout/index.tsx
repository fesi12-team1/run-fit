import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <main className="h-main desktop:flex-row flex flex-col">
      {/* 좌측: 배경 + 배너 + (mobile/tablet 폼) */}
      <div className="desktop:w-1/2 relative flex h-[calc(100vh-56px)] w-full items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <Image
          src="/assets/bg/pc.png"
          alt="Background"
          fill
          priority
          className="desktop:block hidden object-cover"
        />
        <Image
          src="/assets/bg/tb.png"
          alt="Background"
          fill
          className="tablet:block desktop:hidden hidden object-cover"
        />
        <Image
          src="/assets/bg/mo.png"
          alt="Background"
          fill
          className="tablet:hidden object-cover"
        />

        {/* 배너 이미지 */}
        <Image
          src="/assets/banner.png"
          alt="Banner"
          width={600}
          height={400}
          className="tablet:scale-90 desktop:top-1/2 desktop:scale-100 absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75"
        />

        {/* mobile + tablet 폼 */}
        <div className="tablet:px-[122px] desktop:hidden absolute top-[62%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-8">
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
      </div>

      {/* desktop 폼 */}
      <div className="desktop:flex desktop:w-1/2 desktop:-translate-x-12 hidden items-center justify-center px-28">
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
    </main>
  );
}
