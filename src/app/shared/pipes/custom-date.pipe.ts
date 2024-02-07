import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any): Date {
  

    const date = new Date(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

}
