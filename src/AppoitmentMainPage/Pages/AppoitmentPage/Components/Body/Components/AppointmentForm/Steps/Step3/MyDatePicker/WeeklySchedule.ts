// WeeklySchedule.ts
import { Dayjs } from "dayjs";
import { DailySchedule, UnavailableTimes } from "./Components/TimpeSlotPicker/DailySchedule";

export type WeekDay =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export type WorkingHoursMap = {
  [key in WeekDay]?: {
    start: string;
    end: string;
  };
};

const WEEK_DAYS: WeekDay[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export class WeeklySchedule {
  days: DailySchedule[] = [];

  constructor(
    startDate: Dayjs,
    durationTime: number,
    workingHours: WorkingHoursMap,
    unavailableTimes: UnavailableTimes[]
  ) {
    for (let i = 0; i < 6; i++) {
      const currentDate = startDate.add(i, 'day');
      const dayName = WEEK_DAYS[currentDate.day()];
      const todayWorkingHours = workingHours[dayName] ?? null;

      const dailySchedule = new DailySchedule(
        currentDate,
        durationTime,
        todayWorkingHours,
        unavailableTimes
      );

      this.days.push(dailySchedule);
    }
  }
}