import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  className?: string;
}

export default function SubmitButton({ className }: SubmitButtonProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <Button type="submit" className="w-full" size="sm">
        생성하기
      </Button>
      <p className="text-caption-medium text-gray-300">
        세션 생성 후에는 ‘이름/설명/이미지’만 수정할 수 있어요
      </p>
    </div>
  );
}
