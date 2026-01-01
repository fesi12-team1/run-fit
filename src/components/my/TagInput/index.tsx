'use client';

import { useEffect, useRef, useState } from 'react';
import Tag from '@/components/ui/Tag';
import { cn } from '@/lib/utils';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const isMax = value.length >= max;

  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      if (isMax) return;
      onChange([...value, tag]);
    }
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-controls="tag-listbox"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          'tablet:rounded-xl tablet:px-4 flex h-10 cursor-pointer flex-wrap items-center gap-2 rounded-lg px-3',
          open ? 'border-brand-400 border' : 'border-none',
          isPc ? 'bg-gray-750' : 'bg-gray-800'
        )}
        role="combobox"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
      >
        {value.length === 0 && (
          <span className="text-body3-medium tablet:text-body2-medium text-gray-300">
            {placeholder}
          </span>
        )}

        {value.map((tag) => (
          <Tag
            key={tag}
            selected
            size="sm"
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
          aria-label="태그 옵션"
          className={cn(
            'tablet:rounded-[20px] border-gray-750 tablet:p-3 mt-2.5 flex flex-col gap-2 rounded-lg border p-2',
            isPc ? 'bg-gray-750' : 'bg-gray-800'
          )}
          id="tag-listbox"
          role="listbox"
        >
          <p className="text-caption-medium pl-1 text-gray-300">태그</p>

          <div className="flex flex-wrap gap-x-1.5 gap-y-2">
            {options.map((tag) => {
              const selected = value.includes(tag);

              return (
                <button
                  key={tag}
                  aria-label={`${tag} ${selected ? '선택됨' : '선택 안됨'}`}
                  aria-selected={selected}
                  className={cn(!selected && isMax && 'opacity-40')}
                  disabled={!selected && isMax}
                  role="option"
                  onClick={() => toggleTag(tag)}
                >
                  <Tag isPc={isPc} size="sm">
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
