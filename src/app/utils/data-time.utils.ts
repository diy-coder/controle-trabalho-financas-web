export class DateTimeUtils {
  public static firebaseDateToDate(date: Date): Date {
    return date
      ? (date as unknown as firebase.default.firestore.Timestamp).toDate()
      : date;
  }
}
