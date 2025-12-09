'use client';

import { ko } from 'date-fns/locale';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import { cn } from '@/lib/utils';
import Button from './Button';

function CalendarRoot({
  className,
  classNames,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={ko}
      className={cn(
        // 최소 너비 설정 및 그리드 레이아웃
        'group/calendar min-w-[calc(7_*_var(--cell-size)_+_34px)] grid-cols-7 bg-gray-700 px-[17.5px] [--cell-size:--spacing(9)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        className
      )}
      // 라벨 항상 고정
      captionLayout="label"
      classNames={{
        // 전체 캘린더
        root: cn('w-full', defaultClassNames.root),
        months: cn('flex flex-col relative', defaultClassNames.months),
        month: cn(
          'flex flex-col gap-3 w-full rounded-lg',
          defaultClassNames.month
        ),
        // 월 이동 네비게이션
        nav: cn(
          'flex items-center gap-20 w-full absolute top-0 inset-x-0 justify-between px-16',
          defaultClassNames.nav
        ),
        button_previous: cn(
          'size-[30px] aria-disabled:opacity-50 p-0 select-none text-gray-400 ',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'size-[30px] aria-disabled:opacity-50 p-0 select-none text-white ',
          defaultClassNames.button_next
        ),
        // 월 캡션
        month_caption: cn(
          'flex items-center justify-center h-[30px] w-full',
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          'select-none text-body3-medium text-gray-200',
          defaultClassNames.caption_label
        ),
        // 달력 그리드
        table: 'w-full border-collapse table-fixed',
        // 요일 헤더(일요일~토요일)
        weekdays: cn('flex items-center py-[6px]', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 font-normal text-[0.8rem] select-none text-body3-regular text-gray-300',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-1 text-body2-regular', defaultClassNames.week),
        day: cn(
          'relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-lg group/day aspect-square select-none text-body2-regular',
          defaultClassNames.day
        ),
        range_start: cn(defaultClassNames.range_start),
        range_middle: cn(defaultClassNames.range_middle),
        range_end: cn(defaultClassNames.range_end),
        today: cn(
          'text-brand-800 rounded-lg data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-warning aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-gray-400', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-5', className)} {...props} />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-5', className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

const Calendar = Object.assign(CalendarRoot, {
  DayButton: CalendarDayButton,
});

export default Calendar;
