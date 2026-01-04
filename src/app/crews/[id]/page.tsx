'use client';

import { Suspense } from '@suspensive/react';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import { crewQueries } from '@/api/queries/crewQueries';
import { userQueries } from '@/api/queries/userQueries';
import CrewDetailContent from './_components/CrewDetailContent';
import CrewDetailContentSkeleton from './_components/CrewDetailContentSkeleton';

export default function Page() {
  const params = useParams<{ id: string }>();
  const crewId = Number(params.id);

  const { data: myProfile } = useQuery(userQueries.me.info());
  const { data: myRoleData } = useQuery({
    ...crewQueries.members(crewId).detail(myProfile?.id ?? 0),
    enabled: !!myProfile?.id,
  });

  if (isNaN(crewId)) {
    return notFound();
  }

  return (
    <Suspense fallback={<CrewDetailContentSkeleton />}>
      <CrewDetailContent crewId={crewId} myRole={myRoleData?.role || null} />
    </Suspense>
  );
}
