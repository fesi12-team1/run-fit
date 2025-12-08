import Image from 'next/image';

// interface SessionCardProps {
//   data: Session;
// }

// export default function SessionCard({ data }: SessionCardProps) {
export default function CrewCard() {
  return (
    <li className="laptop:justify-between flex w-full py-5">
      <div className="tablet:flex-row flex flex-col">
        <div className="tablet:w-60 relative aspect-video self-stretch overflow-hidden rounded-lg bg-blue-300">
          <Image
            src="/crew.local.jpg"
            alt="Crew"
            fill
            className="object-cover"
          />
          <div className="text-caption-regular absolute bottom-3.5 left-3.5">
            서울 • 멤버 64명
          </div>
        </div>
        <div className="laptop:w-[500px] p-3">
          <div className="text-title3-semibold text-gray-50">
            달리는 거북이 크루
          </div>
          <div className="text-body2-regular line-clamp-2 text-gray-300">
            안녕하세요 달리는 거북이 크루 소개입니다안녕하세요 달리는 거북이
            크루 소개입니다안녕하세요 달리는 거북이 크루 소개입니다
          </div>
        </div>
      </div>
      <div className="laptop:flex hidden w-[300px] flex-col gap-2 p-3">
        <div className="text-body3-semibold text-gray-300">진행된 세션</div>
        <ul className="flex justify-between">
          <li className="text-body2-regular text-gray-100">
            상쾌한 한강 아침 러닝
          </li>
          <div className="text-body3-regular text-gray-200">12월 25일</div>
        </ul>
      </div>
    </li>
  );
}
