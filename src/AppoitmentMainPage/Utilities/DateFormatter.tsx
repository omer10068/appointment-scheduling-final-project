import {Timestamp} from "firebase/firestore";
import dayjs from "dayjs";

export function dateToIsraelLocale(date: Date) {
    const formattedDate = date.toLocaleString('en-GB', {
        timeZone: 'Asia/Jerusalem',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return formattedDate;
}

export function getDateFromTimestamp(seconds: number, nanoseconds: number) {
    return new Timestamp(seconds, nanoseconds).toDate();
}

export function formatTimestamp(seconds: number, nanoseconds: number) {
    const date = getDateFromTimestamp(seconds, nanoseconds);
    return dateToIsraelLocale(date);
}

export function getDateOnly(date: string) {
    const [ret] = date.split(', ');
    return ret;
}

export function getTimeOnly(date: string) {
    const [, time] = date.split(', ');
    return time;
}

export function convertToDate(value: any): Date | undefined {
    if (!value) return undefined;

    if (dayjs(value).isValid()) {
        return dayjs(value).toDate();
    }

    return getDateFromTimestamp(value.seconds, value.nanoseconds);
}