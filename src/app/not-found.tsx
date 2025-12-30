'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function NotFound() {
  const isMobile = useMediaQuery({ max: 'tablet' });
  const router = useRouter();
  return (
    <section className="tablet:gap-8 flex h-screen flex-col items-center justify-center gap-10">
      <Image
        src={'/assets/404-error.png'}
        alt={'404'}
        width={isMobile ? 296 : 529}
        height={isMobile ? 218 : 290}
      />
      <p className="tablet:text-body2-medium text-body3-medium text-center text-gray-100">
        원하시는 페이지를 찾을 수 없어요
        <br />
        입력하신 페이지의 주소가 정확한지 {isMobile && <br />}
        다시 한 번 확인해 주세요
      </p>

      <Button
        variant={'default'}
        onClick={() => router.push('/sessions')}
        className="tablet:mt-4"
      >
        홈으로 이동하기
      </Button>
    </section>
  );
}
