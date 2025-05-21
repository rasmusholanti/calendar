import { DateValue } from '@mantine/dates';

declare module '@mantine/dates' {
  interface CalendarProps {
    value?: DateValue;
    onChange?: (value: DateValue) => void;
  }
} 