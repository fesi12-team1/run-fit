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
          <span className="text-body3-regular text-gray-300">
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
            <CrewCard key={crew.id} crew={crew} />
          ))}
        </div>
      </section>
    </main>
  );
}
