'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Tag from '../Tag';

type TagInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  options: string[];
  max?: number;
  placeholder?: string;
  isPc?: boolean;
};

export default function TagInput({
  value,
  onChange,
  options,
  max = 3,
  placeholder = '태그를 선택해주세요',
  isPc = false,
}: TagInputProps) {
  const [open, setOpen] = useState(false);

  const isMax = value.length >= max;

  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      if (isMax) return;
      onChange([...value, tag]);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'tablet:rounded-xl tablet:px-4 flex h-10 cursor-pointer flex-wrap items-center gap-2 rounded-lg px-3',
          open ? 'border-brand-400 border' : 'border-none',
          isPc ? 'bg-gray-750' : 'bg-gray-800'
        )}
      >
        {value.length === 0 && (
          <span className="text-body3-medium tablet:text-body2-medium text-gray-300">
            {placeholder}
          </span>
        )}

        {value.map((tag) => (
          <Tag
            key={tag}
            size="sm"
            selected
            onClick={() => {
              toggleTag(tag);
            }}
          >
            {tag}
          </Tag>
        ))}
      </div>

      {open && (
        <div
          className={cn(
            'tablet:rounded-[20px] border-gray-750 tablet:p-3 mt-2.5 flex flex-col gap-2 rounded-lg border p-2',
            isPc ? 'bg-gray-750' : 'bg-gray-800'
          )}
        >
          <p className="text-caption-medium pl-1 text-gray-300">태그</p>

          <div className="flex flex-wrap gap-x-1.5 gap-y-2">
            {options.map((tag) => {
              const selected = value.includes(tag);

              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  disabled={!selected && isMax}
                  className={cn(!selected && isMax && 'opacity-40')}
                >
                  <Tag size="sm" isPc={isPc}>
                    {tag}
                  </Tag>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
