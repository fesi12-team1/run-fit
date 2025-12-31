'use client';

import { ko } from 'date-fns/locale';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import * as React from 'react';
import {
  DayButton,
  DayPicker,
  getDefaultClassNames,
  type DateRange,
  type Matcher,
  type OnSelectHandler,
} from 'react-day-picker';
import { cn } from '@/lib/utils';

/* ───────────── Calendar Root (공통 스타일) ───────────── */

type CalendarRootProps = React.ComponentProps<typeof DayPicker> & {
  disablePastDates?: boolean;
};

function CalendarRoot({
  className,
  classNames,
  components,
  disablePastDates,
  ...props
}: CalendarRootProps) {
  const defaultClassNames = getDefaultClassNames();

  const today = new Date();
  const disabledMatchers: Matcher[] = [];
  if (disablePastDates) {
    disabledMatchers.push({ before: today });
  }
  if (props.disabled) {
    disabledMatchers.push(
      ...(Array.isArray(props.disabled) ? props.disabled : [props.disabled])
    );
  }
  const disabled = disabledMatchers.length > 0 ? disabledMatchers : undefined;

  return (
    <DayPicker
      captionLayout="label"
      className={cn(
        'group/calendar min-w-[calc(7_*_var(--cell-size)_+_34px)] grid-cols-7 bg-gray-700 px-[17.5px] [--cell-size:--spacing(9)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        className
      )}
      classNames={{
        root: cn('w-full', defaultClassNames.root),
        months: cn('flex flex-col relative', defaultClassNames.months),
        month: cn(
          'flex flex-col gap-3 w-full rounded-lg',
          defaultClassNames.month
        ),

        nav: cn(
          'flex items-center gap-20 w-full absolute top-0 inset-x-0 justify-between px-16',
          defaultClassNames.nav
        ),
        button_previous: cn(
          'size-[30px] aria-disabled:opacity-50 p-0 select-none text-gray-400',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'size-[30px] aria-disabled:opacity-50 p-0 select-none text-white',
          defaultClassNames.button_next
        ),

        month_caption: cn(
          'flex items-center justify-center h-[30px] w-full',
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          'select-none text-body3-medium text-gray-200',
          defaultClassNames.caption_label
        ),

        table: 'w-full border-collapse table-fixed',

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
          'text-gray-300 aria-selected:text-gray-300',
          defaultClassNames.outside
        ),
        disabled: cn('text-gray-400', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),

        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => (
          <div
            ref={rootRef}
            className={cn(className)}
            data-slot="calendar"
            {...rootProps}
          />
        ),
        Chevron: ({ className, orientation, ...chevronProps }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon
                className={cn('size-5', className)}
                {...chevronProps}
              />
            );
          }
          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-5', className)}
                {...chevronProps}
              />
            );
          }
          return (
            <ChevronDownIcon
              className={cn('size-4', className)}
              {...chevronProps}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...tdProps }) => (
          <td {...tdProps}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      disabled={disabled}
      locale={ko}
      {...props}
    />
  );
}

/* ───────────── DayButton (공통) ───────────── */

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

  const isStart = modifiers.range_start;
  const isMiddle = modifiers.range_middle;
  const isEnd = modifiers.range_end;
  const isRange = isStart || isMiddle || isEnd;
  const isToday = modifiers.today;

  return (
    <div
      className={cn(
        'relative aspect-square w-full overflow-hidden',

        isRange && 'bg-brand-800',
        isStart && 'rounded-l-lg',
        isEnd && 'rounded-r-lg',
        isMiddle && 'rounded-none'
      )}
    >
      <button
        ref={ref}
        className={cn(
          defaultClassNames.day,
          modifiers.disabled &&
            'pointer-events-none cursor-not-allowed text-gray-400 opacity-40',

          'text-body2-regular h-full w-full rounded-lg',

          isStart && 'bg-brand-300 text-brand-900 rounded-l-lg',
          isEnd && 'bg-brand-300 text-brand-900 rounded-r-lg',
          isMiddle && 'text-brand-200 rounded-none',

          isToday && !isRange && 'text-brand-300 bg-transparent font-medium',

          modifiers.selected && !isRange && 'bg-brand-300 text-brand-900',

          className
        )}
        data-day={day.date.toLocaleDateString()}
        data-outside={modifiers.outside}
        data-range-end={isEnd}
        data-range-middle={isMiddle}
        data-range-start={isStart}
        data-selected-single={
          modifiers.selected && !isStart && !isEnd && !isMiddle
        }
        {...props}
      />
    </div>
  );
}

/* ───────────── 모드별 래퍼: Single / Range ───────────── */

type CalendarCommonProps = Omit<
  CalendarRootProps,
  'mode' | 'selected' | 'onSelect'
>;

export type CalendarSingleProps = CalendarCommonProps & {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
};

export type CalendarRangeProps = CalendarCommonProps & {
  selected?: DateRange | undefined;
  onSelect?: (range: DateRange | undefined) => void;
};

export function CalendarSingle({
  selected,
  onSelect,
  ...rest
}: CalendarSingleProps) {
  const handleSelect: OnSelectHandler<Date | undefined> = (next) => {
    onSelect?.(next);
  };

  return (
    <CalendarRoot
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      {...rest}
    />
  );
}

/* Range UX 개선:
   - 첫 클릭: anchor 설정
   - 두 번째 클릭: range 확정
   - 기존 range가 있을 때 클릭: anchor 재설정 */
export function CalendarRange({
  selected,
  onSelect,
  ...rest
}: CalendarRangeProps) {
  const handleSelect: OnSelectHandler<DateRange | undefined> = (
    _selected,
    triggerDate
  ) => {
    const current = selected;

    if (!current || (!current.from && !current.to)) {
      onSelect?.({ from: triggerDate, to: undefined });
      return;
    }

    const anchor = current.from;

    if (anchor && !current.to) {
      const from = triggerDate < anchor ? triggerDate : anchor;
      const to = triggerDate < anchor ? anchor : triggerDate;
      onSelect?.({ from, to });
      return;
    }

    onSelect?.({ from: triggerDate, to: undefined });
  };

  return (
    <CalendarRoot
      mode="range"
      selected={selected}
      onSelect={handleSelect}
      {...rest}
    />
  );
}

/* ───────────── export ───────────── */

const Calendar = Object.assign(CalendarRoot, {
  DayButton: CalendarDayButton,
  Single: CalendarSingle,
  Range: CalendarRange,
});

export default Calendar;
