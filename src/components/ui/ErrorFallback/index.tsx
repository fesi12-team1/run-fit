import Image from 'next/image';
import Button from '@/components/ui/Button';

interface ErrorFallbackProps {
  message?: string;
  imageSrc?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function ErrorFallback({
  message = '오류가 발생했습니다.',
  imageSrc,
  actionLabel,
  onAction,
  className = 'flex-1',
}: ErrorFallbackProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${className}`}
    >
      {imageSrc && (
        <div className="tablet:w-60 tablet:h-[218px] relative aspect-220/199 h-[199px] w-[220px]">
          <Image alt="오류" className="object-contain" fill src={imageSrc} />
        </div>
      )}
      <p className="tablet:text-body2-medium text-body3-medium text-error-100 text-center">
        {message}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
