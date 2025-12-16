'use client';

import { useQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import CrewCard from '@/components/crew/CrewCard';
import Dropdown from '@/components/ui/Dropdown';
import type { Crew } from '@/types';

export default function Page() {
  const { data } = useQuery(
    crewQueries.list({
      page: 0,
      size: 10,
      sort: 'createdAtDesc',
    })
  );

  return (
    <main className="h-main tablet:px-8 mx-auto flex max-w-[1198px] flex-col items-center justify-start px-6">
      <section className="flex w-full items-center justify-between">
        <div className="my-[45px]">
          <h2 className="text-title2-semibold mb-4">
            나와 FIT한
            <br />
            러닝 메이트를 찾다
          </h2>
          <span className="text-body3-regular">
            러닝 페이스와 선호하는 스타일에 딱 맞는 세션을 찾아보세요!
          </span>
        </div>
      </section>
      <section className="flex w-full flex-col items-center">
        <div className="mb-6 flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Dropdown>
              <Dropdown.Trigger>지역 전체</Dropdown.Trigger>
            </Dropdown>
          </div>
          <Dropdown>
            <Dropdown.Trigger>최근 생성순</Dropdown.Trigger>
            <Dropdown.Content>
              {['최근 생성순', '이름 오름차순', '이름 내림차순'].map((item) => (
                <Dropdown.Item key={item}>{item}</Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        <div className="grid w-full grid-cols-1 gap-6">
          {data?.content?.map((crew: Crew) => (
            <CrewCard key={crew.id} {...crew} />
          ))}
        </div>
      </section>
    </main>
  );
}

{
  /* <div
        className="tablet:mx-8 h-main mx-4 flex flex-col items-center gap-12"
        style={{ paddingBottom: height }}
      >
        <ul className="tablet:divide-y laptop:w-auto flex w-full flex-col divide-gray-700">

        </ul>
      </div>
      <FixedBottomBar ref={ref}>
        <button
          type="button"
          aria-label="크루 링크 공유하기"
          onClick={handleShare}
        >
          <Share className="size-6 stroke-[#9CA3AF]" />
        </button>
        <Button
          type="button"
          className="bg-brand-500 text-body2-semibold flex-1 px-6 py-3"
          onClick={handleClick}
        >
          가입하기
        </Button>
      </FixedBottomBar>
    </> */
}
