import { DAYMS } from './data';
import { ChartDates, GanttData, GanttRawData, RawDate } from './types';

export function toDate(str: RawDate): Date;
export function toDate(str: [RawDate, RawDate]): ChartDates;
export function toDate(str: RawDate | [RawDate, RawDate]): Date | ChartDates {
  if (isArray(str)) {
    return str.map((item) => new Date(item)) as ChartDates;
  } else {
    return new Date(str);
  }
}

export function isArray(data: any) {
  return Array.isArray(data);
}

export const formatter = new Intl.DateTimeFormat('ru', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Europe/Moscow',
});

export const getXTicks = (
  startDate: Date,
  endDate: Date,
  scale: number | null,
): string[] => {
  if (!scale) return [];

  const ticks: string[] = [];

  let cur = new Date(startDate);
  const end = new Date(endDate);

  if (scale < 10) {
    let minYear = cur.getFullYear() + 1;
    const maxYear = end.getFullYear();

    while (minYear <= maxYear) {
      const year = minYear.toString();

      ticks.push(year);

      minYear++;
    }

    return ticks;
  }

  if (scale < 90) {
    let minYearMonth = `${cur.getFullYear()}-${cur.getMonth() + 1 + 1}`;
    const maxYearMonth = `${end.getFullYear()}-${end.getMonth() + 1}`;

    while (minYearMonth <= maxYearMonth) {
      const month = minYearMonth;

      ticks.push(month);

      const date = new Date(minYearMonth);

      date.setMonth(date.getMonth() + 1);

      minYearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
    }

    return ticks;
  }

  let minYearMonthDay = `${cur.getFullYear()}-${cur.getMonth() + 1}-${
    cur.getDate() + 1
  }`;
  const maxYearMonthDay = `${end.getFullYear()}-${
    end.getMonth() + 1
  }-${end.getDate()}`;

  while (minYearMonthDay <= maxYearMonthDay) {
    const day = minYearMonthDay;

    ticks.push(day);

    const date = new Date(minYearMonthDay);

    date.setDate(date.getDate() + 1);

    minYearMonthDay = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  }

  return ticks;
};

export function normalize(rows: GanttRawData): GanttData {
  return rows.map((row) => ({
    ...row,
    items: row.items.map((cell) => ({ ...cell, dates: toDate(cell.dates) })),
  }));
}

export const findXValues = (rows: GanttData) => {
  const dates = rows.reduce((acc, val) => {
    val.items.forEach((cell) => {
      const date1 = cell.dates[0].toString();
      const date2 = cell.dates[1].toString();

      if (!acc[date1]) {
        acc[date1] = cell.dates[0];
      }
      if (!acc[date2]) {
        acc[date2] = cell.dates[1];
      }
    });

    return acc;
  }, {} as Record<string, Date>);

  return Object.values(dates).sort((a, b) => (a > b ? 1 : -1));
};

export function calculateScale(start: Date, end: Date, contentWidth: number) {
  const periodMs = end.getTime() - start.getTime();
  return (DAYMS * contentWidth) / periodMs;
}
