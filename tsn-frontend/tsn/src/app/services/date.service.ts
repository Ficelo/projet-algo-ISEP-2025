import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  timeAgo(dateString: Date): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const divisions: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
      { amount: 60, name: "seconds" },
      { amount: 60, name: "minutes" },
      { amount: 24, name: "hours" },
      { amount: 7, name: "days" },
      { amount: 4.34524, name: "weeks" },
      { amount: 12, name: "months" },
      { amount: Infinity, name: "years" },
    ];

    let duration = diffInSeconds;
    for (const division of divisions) {
      if (Math.abs(duration) < division.amount) {
        return rtf.format(-Math.round(duration), division.name);
      }
      duration /= division.amount;
    }

    return "some time ago";
  }

}
