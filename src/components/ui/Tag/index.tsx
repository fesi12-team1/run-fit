import XIcon from '@/assets/icons/x.svg';
import { cn } from '@/lib/utils';

export default function Tag({
  children,
  size,
  selected = false,
  onClick,
  isPc = false,
}: {
  children: React.ReactNode;
  size: 'sm' | 'lg';
  selected?: boolean;
  onClick?: () => void;
  isPc?: boolean;
}) {
  return (
    <div
      className={cn(
        size === 'sm'
          ? 'text-caption-medium rounded-lg px-2 py-1.5'
          : 'text-body3-medium rounded-xl px-3 py-2',
        'text-brand-200 border-brand-700 border',
        'flex items-center',
        isPc ? 'bg-gray-750' : 'bg-gray-800'
      )}
    >
      {children}
      {selected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          type="button"
          className="ml-1"
          aria-label="태그 제거"
        >
          <XIcon
            className={cn(
              size === 'sm' ? 'size-3' : 'size-4',
              'text-brand-400 hover:text-error-100 transition-colors'
            )}
          />
        </button>
      )}
    </div>
  );
}
