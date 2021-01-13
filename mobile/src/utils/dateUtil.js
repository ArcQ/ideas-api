import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getFromNow = (dateString) => dayjs(dateString).fromNow();

export const getFormattedDate = (dateString) =>
  dayjs(dateString).format('dddd, MMMM D, YYYY h:mm A');
