// DailySchedule.ts
import dayjs, { Dayjs } from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export interface UnavailableTimes {
  from: Timestamp;
  to: Timestamp;
  reason: string;
}

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

export class DailySchedule {
  date: Dayjs;
  status: 'full' | 'close' | 'open';
  availableSlots: string[] = [];

  constructor(
    date: Dayjs,
    durationTime: number,
    workingHours: { start: string; end: string } | null,
    unavailableTimes: UnavailableTimes[]
  ) {
    this.date = date.startOf('day');
    this.status = 'open';

    if (!workingHours) {
      this.status = 'close';
      return;
    }

    const unavailableRanges = unavailableTimes.map(item => ({
      from: dayjs(item.from.toDate()),
      to: dayjs(item.to.toDate())
    }));

    const fullDayBlocked = unavailableRanges.find(({ from, to }) => {
      return this.date.isSame(from, 'day') && to.diff(from, 'hour') >= 23;
    });

    if (fullDayBlocked) {
      this.status = 'close';
      return;
    }

    const dayStart = dayjs(`${this.date.format('YYYY-MM-DD')}T${workingHours.start}`);
    const dayEnd = dayjs(`${this.date.format('YYYY-MM-DD')}T${workingHours.end}`);

    let current = dayStart;
    while (current.isBefore(dayEnd)) {
      const slotStart = current;
      const slotEnd = current.add(durationTime, 'minute');

      const isBlocked = unavailableRanges.some(({ from, to }) => {
        return slotStart.isBefore(to) && slotEnd.isAfter(from);
      });

      if (!isBlocked) {
        this.availableSlots.push(slotStart.format('HH:mm'));
      }

      current = current.add(30, 'minute');
    }

    if (this.availableSlots.length === 0) {
      this.status = 'full';
    }
  }
}
