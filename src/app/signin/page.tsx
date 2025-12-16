import Image from 'next/image';
import Link from 'next/link';
import SigninForm from '@/components/auth/SigninForm';

export default function SigninPage() {
  return (
    <main className="h-main flex items-center justify-start">
      <section className="relative flex h-[calc(100vh-56px)] w-1/2 items-center justify-center">
        <Image
          src="/assets/bg/pc.png"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/assets/banner.png"
            alt="Background"
            className="absolute bottom-30 z-0 -translate-y-30"
            width={600}
            height={400}
          />
        </div>
      </section>
      <section className="desktop:px-28 tablet:px-20 w-1/2">
        <h2 className="text-title2-semibold mb-8 text-center">로그인</h2>
        <SigninForm />
        <p className="text-body3-medium mt-6 text-center">
          런핏이 처음이신가요?
          <Link href="/signup" className="text-brand-300 ml-1">
            회원가입
          </Link>
        </p>
      </section>
    </main>
  );
}
