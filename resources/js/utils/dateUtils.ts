export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function format(date: Date, formatStr: string): string {
  // Simple date formatter
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return formatStr
    .replace('yyyy', year.toString())
    .replace('MM', month)
    .replace('dd', day);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

export const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return today.toDateString() === date.toDateString();
};


export const formatTimeLocale = () =>
{
  const MyDate = new Date();
  return MyDate.toLocaleTimeString('en-US', {hour: 'numeric', hour12: true})
};

export const formatDateLocale = (date: Date) => 
{
  return date.toLocaleDateString('en-US', {
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

export const computeDateBetweenTwoDates = (startDate: Date, endDate: Date) =>
{
  const diffMs = endDate.getTime() - startDate.getTime(); // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    totalMilliseconds: diffMs,
    totalSeconds: seconds,
    totalMinutes: minutes,
    totalHours: hours,
    totalDays: days,
  };
}