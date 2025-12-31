'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { crewQueries } from '@/api/queries/crewQueries';
import { userQueries } from '@/api/queries/userQueries';

interface RoleGuardProps {
  crewId: number;
  children: React.ReactNode;
}

export default function RoleGuard({ crewId, children }: RoleGuardProps) {
  const router = useRouter();

  /**
   * 1차 검증: 로그인 상태 확인
   * useSuspenseQuery는 데이터가 성공적으로 올 때까지 렌더링을 멈춥니다.
   * 만약 401 에러(비로그인)가 발생하면 상위 ErrorBoundary로 에러를 던집니다.
   */
  const { data: user } = useSuspenseQuery(userQueries.me.info());

  /**
   * 2차 검증: 크루 내 역할 확인
   * 위에서 user 데이터를 가져왔으므로 user.id를 안전하게 사용할 수 있습니다. (순차적 실행)
   * 만약 404 에러(멤버 아님)가 발생하면 역시 ErrorBoundary로 에러를 던집니다.
   */
  const { data: memberDetail } = useSuspenseQuery(
    crewQueries.members(crewId).detail(user.id)
  );

  // LEADER 또는 STAFF 권한 여부 계산
  const isAuthorized = useMemo(() => {
    return memberDetail?.role === 'LEADER' || memberDetail?.role === 'STAFF';
  }, [memberDetail]);

  useEffect(() => {
    // 권한이 없는 경우(MEMBER인 경우) 리다이렉트
    if (!isAuthorized) {
      toast.error(
        '접근 권한이 없습니다. 크루장 또는 운영진만 접근 가능합니다.'
      );
      router.replace(`/crews/${crewId}`);
    }
  }, [isAuthorized, router, crewId]);

  // 권한이 없으면 렌더링하지 않음 (useEffect가 실행되어 페이지 이동됨)
  if (!isAuthorized) return null;

  return <>{children}</>;
}
