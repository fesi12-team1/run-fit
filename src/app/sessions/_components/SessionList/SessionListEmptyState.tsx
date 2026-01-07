import Image from 'next/image';
import EmptyLayout from '@/components/ui/EmptyLayout';
import { generateNextImageSizes } from '@/lib/Image';

export default function SessionListEmptyState() {
  return (
    <EmptyLayout>
      <div className="tablet:w-60 tablet:h-[218px] relative h-[199px] w-[220px]">
        <Image
          alt="Empty Sessions"
          className="object-contain"
          fill
          sizes={generateNextImageSizes({
            mobile: '220px',
            tablet: '240px',
          })}
          src="/assets/session-default.png"
        />
      </div>
      <EmptyLayout.Message>
        아직 생성된 세션이 없어요 <br /> 세션은 크루를 개설하거나 <br />
        운영진으로 활동할 때 만들 수 있어요!
      </EmptyLayout.Message>
    </EmptyLayout>
  );
}
