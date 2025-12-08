import Image from 'next/image';
import Liked from '@/assets/icons/liked.svg';
import Location from '@/assets/icons/location.svg';
import { DdayBadge, LevelBadge, PaceBadge } from '../ui/Badge';
import ProfileList from './ProfileList';

// interface SessionCardProps {
//   data: Session;
// }

// export default function SessionCard({ data }: SessionCardProps) {
export default function SessionCard() {
  return (
    <li className="flex w-full flex-col">
      <div className="tablet:mb-6 tablet:aspect-video relative mb-3 aspect-165/185 self-stretch overflow-hidden rounded-lg bg-blue-300">
        <Image
          src="/session.local.jpg"
          alt="Session"
          fill
          className="object-cover"
        />
        {/* prettier-ignore */}
        <div className="absolute top-3 left-3">
          <DdayBadge className='tablet:hidden' size="sm">마감 D-3</DdayBadge>
          <DdayBadge className='hidden tablet:inline-flex' size="lg">마감 D-3</DdayBadge>
        </div>
        <div className="absolute top-3 right-3">
          <Liked className="stroke-offset-[-0.50px] size-6 fill-neutral-900/50 stroke-sky-100 stroke-1" />
        </div>
        <div className="absolute bottom-3 left-3 flex gap-0.5 md:gap-1">
          <Location className="size-4 fill-gray-200" />
          <div className="text-xs leading-4 font-medium text-gray-200">
            한강 반포공원
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm leading-5 font-semibold text-gray-50">
          {/* title */}
          상쾌한 한강 아침 러닝
        </div>
        <div className="text-xs font-normal text-gray-300">
          {/* date time */}
          12월 25일 • 오전 7:00
        </div>
        {/* prettier-ignore */}
        <div className="flex gap-0.5 mb-2 tablet:mb-3">
          <PaceBadge pace={360} size="sm" className="tablet:hidden" />
          <PaceBadge pace={360} size="lg" className="hidden tablet:inline-flex" />
          <LevelBadge level="hard" size="sm" className="tablet:hidden" />
          <LevelBadge level="hard" size="lg" className="hidden tablet:inline-flex" />
        </div>
        <div className="flex gap-1">
          <ProfileList participants={[]} />
          <div className="flex gap-0.5 *:text-xs *:leading-4 *:font-normal *:text-gray-300">
            <div>4/25명</div> {/* participant count */}
            <div>• 달리는 거북이</div> {/* crew name */}
          </div>
        </div>
      </div>
    </li>
  );
}
