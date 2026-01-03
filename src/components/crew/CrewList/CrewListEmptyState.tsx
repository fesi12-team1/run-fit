import Image from 'next/image';
import EmptyLayout from '@/components/ui/EmptyLayout';
import { generateNextImageSizes } from '@/lib/Image';

export default function CrewListEmptyState() {
  return (
    <EmptyLayout>
      <div className="tablet:w-[414px] tablet:h-[203px] relative h-[118px] w-60">
        <Image
          alt="Empty Crews"
          className="object-contain"
          fill
          sizes={generateNextImageSizes({
            mobile: '240px',
            tablet: '414px',
          })}
          src="/assets/crew-default.png"
        />
      </div>
      <EmptyLayout.Message>
        아직 생성된 크루가 없어요 <br />
        나와 FIT한 러닝 크루를 직접 만들어보세요!
      </EmptyLayout.Message>
    </EmptyLayout>
  );
}
