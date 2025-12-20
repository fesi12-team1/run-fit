'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ShevronLeft from '@/assets/icons/chevron-left.svg?react';
import SessionLevelCard from '@/components/session/SessionLevelCard';
import Button from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import { CoverImageUploader } from '@/components/ui/ImageUploader';
import Input from '@/components/ui/Input';
import PaceSlider from '@/components/ui/PaceSlider';
import Textarea from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';
import { useDaumPostcode } from '@/provider/DaumPostcodeProvider';

export default function Page() {
  return (
    <main className="h-main laptop:my-[50px] laptop:py-0 laptop:px-8 mx-auto flex max-w-[1120px] flex-col items-center p-6">
      <div className="mb-6 flex w-full items-center gap-2">
        <BackButton />
        <h1 className="text-body1-semibold laptop:text-title2-semibold">
          세션 생성하기
        </h1>
      </div>
      <SessionCreateForm />
    </main>
  );
}

export function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/sessions');
  };

  return (
    <ShevronLeft
      type="button"
      onClick={handleClick}
      className="size-6 hover:cursor-pointer"
    />
  );
}

function SessionCreateForm() {
  const date = new Date();
  const [location, setLocation] = React.useState('서울특별시 어쩌구');
  const [city, setCity] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const { openAddressSearch } = useDaumPostcode();

  return (
    <form className="laptop:flex-row laptop:gap-20 flex w-full flex-col">
      <div className="w-[380px]">
        <Input
          label="세션 이름"
          id="session-name"
          placeholder="세션 이름을 입력하세요"
        />
        <CoverImageUploader />
        <div className="flex">
          <DatePicker
            id="session-date"
            mode="single"
            label="모임 날짜"
            placeholder="모임 날짜를 선택해주세요"
            value={date}
            onChange={() => 0}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={cn(
              location ? 'flex flex-col items-start gap-2' : 'hidden'
            )}
          >
            <label className="text-body3-semibold text-gray-50">장소</label>
            <input
              disabled
              value={location}
              className="text-body2-medium w-full rounded-xl bg-gray-800 px-4 py-2 text-white"
            />
          </div>
          <Button
            type="button"
            variant="outlined"
            className="w-full"
            size="sm"
            onClick={() =>
              openAddressSearch((data) => {
                setLocation(data.address);
                setCity(data.sido);
                setDistrict(data.sigungu);
              })
            }
          >
            {location ? '다시 검색하기' : '주소 검색하기'}
          </Button>
        </div>
        <div className="laptop:block hidden">
          <label htmlFor="">상세 내용</label>
          <Textarea placeholder="세션에 대한 상세 설명을 작성해주세요" />
        </div>
      </div>
      <div className="laptop:flex-1">
        <div>
          <label>
            <span>{'페이스 (분/km)'}</span>
            <span>세션에서 함께 달릴 기준 페이스를 선택해주세요!</span>
          </label>
          <PaceSlider className="" value={300} onValueChange={() => {}} />
        </div>
        <div>
          <label>
            <span>난이도</span>
            <span>페이스와 별개로, 이 세션의 체감 난이도를 선택해주세요</span>
          </label>
          <div>
            <SessionLevelCard
              label="초급"
              description="천천히 몸을 풀며 가볍게 달리는 데 집중해요"
              size="sm"
              checked={false}
              onClick={() => {}}
            />
            <SessionLevelCard
              label="초급"
              description="천천히 몸을 풀며 가볍게 달리는 데 집중해요"
              size="sm"
              checked={false}
              onClick={() => {}}
            />
            <SessionLevelCard
              label="초급"
              description="천천히 몸을 풀며 가볍게 달리는 데 집중해요"
              size="sm"
              checked={false}
              onClick={() => {}}
            />
          </div>
        </div>
        <hr className="text-gray-500" />
        <Input label="모집 정원" placeholder="최소 2인 이상 입력해주세요" />
        <div className="flex">
          <DatePicker
            id="session-date"
            mode="single"
            label="마감날짜"
            placeholder="마감 날짜를 선택해주세요"
            value={date}
            onChange={() => 0}
          />
        </div>
        <div className="laptop:hidden block">
          <label htmlFor="">상세 내용</label>
          <Textarea placeholder="세션에 대한 상세 설명을 작성해주세요" />
        </div>

        <Button type="button" className="w-full" size="sm" disabled>
          생성하기
        </Button>
        <p>세션 생성 후에는 ‘이름/설명/이미지’만 수정할 수 있어요</p>
      </div>
    </form>
  );
}
