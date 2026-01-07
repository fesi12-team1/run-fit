'use client';

import { UseQueryResult } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { GetSessionDetailResponse } from '@/api/fetch/sessions';
import Button from '@/components/ui/Button';
import { ApiError } from '@/lib/error';

interface SessionDetailErrorFallbackProps {
  error: UseQueryResult<GetSessionDetailResponse, Error | ApiError>['error'];
}

export default function SessionDetailErrorFallback({
  error,
}: SessionDetailErrorFallbackProps) {
  let message = '세션을 불러오는 중 오류가 발생했습니다.';

  if (error instanceof ApiError) {
    if (error.code === 'SESSION_NOT_FOUND') {
      message = error.message || '존재하지 않는 세션입니다.';
    }

    if (error.code === '401' || error.code === 'UNAUTHORIZED') {
      message = '로그인이 필요한 서비스입니다.';
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-[1120px] flex-1 flex-col items-center justify-center gap-10 bg-gray-900 py-10">
      <div>
        <section className="flex h-[60vh] flex-col items-center justify-center gap-6">
          <div className="relative h-54 w-60 md:h-72 md:w-80">
            <Image
              fill
              className="object-contain"
              src={'/assets/session-default.png'}
              alt="세션 없음"
              sizes="(max-width: 768px) 240px, 300px"
            />
          </div>
          <p className="tablet:text-body2-medium text-body3-regular text-center text-gray-300">
            {message}
          </p>
          <Button asChild>
            <Link href="/sessions">세션 목록으로 돌아가기</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
