import { ErrorBoundary, Suspense } from '@suspensive/react';
import Spinner from '@/components/ui/Spinner';
import AuthErrorFallback from './_components/AuthFallback';
import BackButton from './_components/BackButton';
import SessionCreateForm from './_components/SessionCreateForm';
import RoleGuard from './_others/RoleGuard';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const crewId = Number((await params).id);

  return (
    <main className="h-main laptop:my-[50px] laptop:py-0 laptop:px-8 mx-auto flex max-w-[1120px] flex-col items-center p-6">
      <div className="mb-6 flex w-full items-center gap-2">
        <BackButton />
        <h1 className="text-body1-semibold laptop:text-title2-semibold">
          세션 생성하기
        </h1>
      </div>
      <ErrorBoundary fallback={<AuthErrorFallback />}>
        <Suspense fallback={<Spinner />}>
          <RoleGuard crewId={crewId}>
            <SessionCreateForm crewId={crewId} />
          </RoleGuard>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
