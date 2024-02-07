import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localDateTime',
})
export class LocalDateTimePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string, format: string = 'medium'): any {
    // Convert the input string to a Date object
    const date = new Date(value);

    // Format the date based on the user's local timezone
    return this.datePipe.transform(date, format);
  }
}
