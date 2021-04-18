import {intervalToDuration, formatDuration, add, isAfter} from 'date-fns';
import localeFI from 'date-fns/locale/fi';

export const untilExpires = (date: Date) => {
  const duration = intervalToDuration({
    start: new Date(),
    end: add(date, {days: 1}),
  });

  return formatDuration(duration, {
    format: ['years', 'months', 'weeks', 'days'],
    locale: localeFI,
  });
};

export const isLate = (date: Date) => {
  return isAfter(new Date(), date);
};
