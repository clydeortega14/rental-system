import { DateAvailability } from "@/types/rental";
import { addDays, format } from "@/utils/dateUtils";

const today = new Date();
const generateTimeSlots = (available: boolean) => {
  const slots: { startTime: string; endTime: string; available: boolean }[] = [];
  for (let i = 8; i < 20; i += 2) {
    slots.push({
      startTime: `${i}:00`,
      endTime: `${i + 2}:00`,
      available: available ? Math.random() > 0.3 : false
    });
  }
  return slots;
};

export const availabilityData: DateAvailability[] = Array.from({ length: 14 }, (_, i) => {
  const date = addDays(today, i);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const available = Math.random() > (isWeekend ? 0.7 : 0.2);
  
  return {
    date: format(date, 'yyyy-MM-dd'),
    available,
    timeSlots: generateTimeSlots(available)
  };
});