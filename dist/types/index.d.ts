declare module 'react-datepicker2' {
  import { Component, DOMAttributes, CSSProperties, ChangeEventHandler } from 'react';
  import { Moment } from 'moment-jalaali';

  export interface CalenderProps {
    min?: Moment;
    max?: Moment;
    styles?: {
      calendarContainer?: string;
      heading?: string;
      prev?: string;
      next?: string;
      title?: string;
      dayWrapper?: string;
      currentMonth?: string;
      daysOfWeek?: string;
      monthsList?: string;
      selected?: string;
      today?: string;
      dayPickerContainer?: string;
    };
    selectedDay?: Moment;
    defaultMonth?: Moment;
    onSelect?: (date: Moment) => void;
    onClickOutside?: () => void;
    containerProps?: object;
    isGregorian?: boolean;
    calendarClass?: string;
    ranges?: Array<{
      start: Moment;
      end: Moment;
      color?: string;
      disabled?: boolean;
    }>;
    value?: Moment;
    defaultValue?: Moment;
    onChange?: (date: Moment) => void;
    onInputChange?: (e: ChangeEventHandler<HTMLInputElement>) => void;
    onMonthChange?: (month: Moment) => void;
    inputFormat?: string;
    inputJalaaliFormat?: string;
  }

  export class Calendar extends Component<CalenderProps> {
    setMode: (mode: string) => void;

    setMonth: (month: Moment) => void;

    nextMonth: () => void;

    prevMonth: () => void;

    selectDay: (selectedDay: Moment) => void;
  }

  export interface DatePickerProps {
    value?: Moment;
    defaultValue?: Moment;
    onChange?: (date: Moment) => void;
    onFocus?: DOMAttributes<HTMLInputElement>['onFocus'];
    onBlur?: DOMAttributes<HTMLInputElement>['onBlur'];
    min?: Moment;
    max?: Moment;
    defaultMonth?: Moment;
    inputFormat?: string;
    inputJalaaliFormat?: string;
    removable?: boolean;
    styles?: { [key: string]: string };
    calendarStyles?: CSSProperties;
    calendarContainerProps?: CalenderProps;
    isGregorian?: boolean; // jalaali or gregorian
    timePicker?: boolean;
    calendarClass?: string;
    datePickerClass?: string;
    tetherAttachment?: string;
    inputReadOnly?: boolean;
    ranges?: [Moment, Moment];
    className?: string;
    persianDigits?: boolean;
  }

  export default class DatePicker extends Component<DatePickerProps> {
    setOpen: (isOpen: boolean) => void;
    toEnglishDigits(str: string): string;
    toPersianDigits(str: string): string;
    toPersianDigits(): void;
    input: HTMLInputElement;
  }
}
