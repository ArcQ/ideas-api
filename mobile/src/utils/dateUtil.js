import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import * as Localization from 'expo-localization';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const getFromNow = (dateString) =>
  dayjs(dateString).tz(Localization.timezone).fromNow();

export const getFormattedDate = (dateString) =>
  dayjs(dateString).format('dddd, MMMM D, YYYY h:mm');

export const isSameDay = (date1, date2) =>
  dayjs(date1).diff(date2, 'day') === 0;
