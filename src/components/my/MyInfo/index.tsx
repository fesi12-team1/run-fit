import { Suspense } from '@suspensive/react';
import MineCrewList from '../MineCrewList';
import MineCrewListSkeleton from '../MineCrewList/MineCrewListSkeleton';
import ProfileDetail from '../ProfileDetail';
import ProfileDetailSkeleton from '../ProfileDetail/ProfileDetailSkeleton';

export default function MyInfo() {
  return (
    <div className="tablet:gap-6 flex flex-col gap-5">
      <Suspense fallback={<ProfileDetailSkeleton />}>
        <ProfileDetail />
      </Suspense>
      <Suspense fallback={<MineCrewListSkeleton />}>
        <MineCrewList />
      </Suspense>
    </div>
  );
}
