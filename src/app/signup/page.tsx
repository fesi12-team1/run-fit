import Image from 'next/image';
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <main className="h-main flex items-center justify-start">
      <section className="relative flex h-[calc(100vh-56px)] w-1/2 items-center justify-center">
        <Image
          src="/assets/bg/pc.png"
          alt="배경 이미지"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/assets/banner.png"
            alt="런핏 배너"
            className="absolute bottom-30 z-0 pb-20"
            width={600}
            height={400}
            priority
          />
        </div>
      </section>
      <section className="desktop:px-28 tablet:px-20 w-1/2">
        <h2 className="text-title2-semibold mb-8 text-center">회원가입</h2>
        <SignupForm />
        <p className="text-body3-medium mt-6 text-center">
          이미 회원이신가요?
          <Link href="/signin" className="text-brand-300 ml-1">
            로그인
          </Link>
        </p>
      </section>
    </main>
  );
}
