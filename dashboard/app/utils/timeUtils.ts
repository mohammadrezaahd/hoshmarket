/**
 * تبدیل تاریخ به فرمت زمان نسبی فارسی
 * @param date - تاریخ به صورت string یا Date object
 * @returns متن فارسی زمان نسبی (مثل "2 ساعت پیش")
 */
export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffMs = now.getTime() - targetDate.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "چند ثانیه پیش";
  if (diffMins < 60) return `${diffMins} دقیقه پیش`;
  if (diffHours < 24) return `${diffHours} ساعت پیش`;
  if (diffDays < 30) return `${diffDays} روز پیش`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} ماه پیش`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} سال پیش`;
};
