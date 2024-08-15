export class DateFormatter {
  static readonly formater = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  static getDateFormat(date: Date): string {
    return this.formater.format(date);
  }
}
