import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AuthErrorFallback() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-20">
      <div className="text-center">
        <p className="text-body1-semibold laptop:text-title2-semibold text-gray-50">
          에러가 발생했습니다.
        </p>
        <p className="text-body3-regular mt-2 text-gray-400">
          해당 페이지에 접근할 권한이 없거나 정보가 존재하지 않습니다.
        </p>
      </div>
      <Button asChild className="mt-8 w-full max-w-[200px]" variant="default">
        <Link href="/">홈으로 이동하기</Link>
      </Button>
    </div>
  );
}
