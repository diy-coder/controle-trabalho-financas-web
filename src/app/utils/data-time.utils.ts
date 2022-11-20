import * as moment from 'moment';

export class DateTimeUtils {
  public static firebaseDateToDate(date: Date): Date {
    return date
      ? (date as unknown as firebase.default.firestore.Timestamp).toDate()
      : date;
  }

  public static firebaseDateToDateFormat(date: Date, format: string): String {
    const dateParsed = this.firebaseDateToDate(date);
    return dateParsed ? moment(dateParsed).format(format) : '';
  }
}
