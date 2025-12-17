'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { sessionQueries } from '@/api/queries/sessionQueries';
import SessionCard from '@/components/session/SessionCard';
import Dropdown from '@/components/ui/Dropdown';
import FilterButton from '@/components/ui/FilterButton';
import { Session } from '@/types';

export default function SessionPage() {
  const { data: sessions } = useQuery(
    sessionQueries.list({
      page: 0,
      size: 10,
      sort: 'createdAtDesc',
    })
  );

  return (
    <main className="h-main mx-auto flex max-w-[1198px] flex-col items-center justify-start">
      <div className="flex w-full items-center justify-between">
        {/** 배너 */}
        <div>
          <h2 className="text-title1-bold mb-4 italic">
            나와 FIT한
            <br />
            러닝 메이트를 찾다
          </h2>
          <span className="text-body3-regular">
            러닝 페이스와 선호하는 스타일에 딱 맞는 세션을 찾아보세요!
          </span>
        </div>
        <div className="pt-[30px] pb-5">
          <Image
            src="/assets/session-list.png"
            alt="Session List"
            // className="origin-center scale-[0.8]"
            width={417}
            height={235}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="mb-6 flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Dropdown>
              <Dropdown.Trigger>지역 전체</Dropdown.Trigger>
            </Dropdown>
            <Dropdown>
              <Dropdown.Trigger>날짜 전체</Dropdown.Trigger>
            </Dropdown>
            <Dropdown>
              <Dropdown.Trigger>시간</Dropdown.Trigger>
            </Dropdown>
            <Dropdown>
              <Dropdown.Trigger>난이도</Dropdown.Trigger>
              <Dropdown.Content>
                {['초급', '중급', '상급'].map((item) => (
                  <Dropdown.Item key={item}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
            <FilterButton className="pl-2" />
          </div>
          <Dropdown>
            <Dropdown.Trigger>최근 생성순</Dropdown.Trigger>
          </Dropdown>
        </div>
        <div className="grid w-full grid-cols-3 gap-6">
          {sessions?.content?.map((session: Session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </main>
  );
}
