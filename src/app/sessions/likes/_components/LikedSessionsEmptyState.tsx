import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EmptyLayout from '@/components/ui/EmptyLayout';
import { generateNextImageSizes } from '@/lib/Image';

export default function LikedSessionsEmptyState() {
  const router = useRouter();

  return (
    <EmptyLayout className="desktop:my-[62px] laptop:my-[87px] my-[127px]">
      <div className="tablet:w-[375px] tablet:h-[340px] relative h-[218px] w-60">
        <Image
          alt="Empty Liked Sessions"
          className="object-contain"
          fill
          sizes={generateNextImageSizes({
            mobile: '240px',
            tablet: '375px',
          })}
          src="/assets/session-default.png"
        />
      </div>
      <EmptyLayout.Message>
        아직 찜한 세션이 없어요 <br />
        맘에 드는 세션을 찾으러 가볼까요?
      </EmptyLayout.Message>
      <EmptyLayout.Button
        onClick={() => {
          router.push('/sessions');
        }}
      >
        세션 구경하러 가기
      </EmptyLayout.Button>
    </EmptyLayout>
  );
}
