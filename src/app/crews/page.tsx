'use client';

import { useQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import CrewCard from '@/components/crew/CrewCard';
import Dropdown from '@/components/ui/Dropdown';

export default function Page() {
  const { data, isLoading, isError } = useQuery(
    crewQueries.list({
      page: 0,
      size: 10,
      sort: 'createdAtDesc',
    })
  );

  if (isLoading) {
    return (
      <div className="h-main flex items-center justify-center">로딩 중...</div>
    );
  }

  if (isError) {
    return (
      <div className="h-main flex items-center justify-center text-red-500">
        크루 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <main className="h-main tablet:px-8 mx-auto flex max-w-[1120px] flex-col items-center justify-start px-6">
      <section className="flex w-full items-center justify-between">
        <div className="my-[45px]">
          <h2 className="text-title2-semibold mb-4">
            나와 FIT한 러닝 메이트를 찾다
          </h2>
          <span className="text-body3-regular text-gray-200">
            러닝 페이스와 선호하는 스타일에 딱 맞는 크루를 찾아보세요!
          </span>
        </div>
      </section>
      <section className="flex w-full flex-col items-center">
        <div className="mb-6 flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Dropdown size="lg">
              <Dropdown.Trigger>지역 전체</Dropdown.Trigger>
            </Dropdown>
          </div>
          <Dropdown size="lg">
            <Dropdown.Trigger className="bg-transparent">
              최근 생성순
            </Dropdown.Trigger>
            <Dropdown.Content>
              {['최근 생성순', '이름 오름차순', '이름 내림차순'].map((item) => (
                <Dropdown.Item key={item}>{item}</Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        <div className="grid w-full grid-cols-1 gap-6">
          {data?.content && data.content.length > 0 ? (
            data.content.map((crew) => <CrewCard key={crew.id} crew={crew} />)
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">
              등록된 크루가 없습니다.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
