import { Suspense } from '@suspensive/react';
import MineCrewList from '../MineCrewList';
import MineCrewListSkeleton from '../MineCrewList/Skeleton';
import Profile from '../Profile';
import ProfileSkeleton from '../Profile/Skeleton';

export default function MyInfo() {
  return (
    <div className="tablet:gap-6 flex flex-col gap-5">
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>

      <Suspense fallback={<MineCrewListSkeleton />}>
        <MineCrewList />
      </Suspense>
    </div>
  );
}
