import { cn } from '@/lib/utils';

export default function Chip({
  value = 'primary',
  children,
  active = false,
}: {
  value: 'primary' | 'secondary';
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        'text-body3-regular hover:border-brand-800 flex items-center justify-center rounded-xl border px-3 py-2 text-gray-100',
        value === 'primary'
          ? 'border-gray-700 bg-gray-800'
          : 'border-gray-500 bg-gray-600',
        active &&
          (value === 'primary'
            ? 'border-brand-500 bg-brand-950 text-brand-300'
            : 'border-brand-500 bg-brand-900 text-brand-300')
      )}
    >
      {children}
    </div>
  );
}
