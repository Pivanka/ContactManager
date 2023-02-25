import { Pipe, PipeTransform } from '@angular/core';
import { CONTACT } from '../models/contact.models';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<CONTACT>, property: string, direction: string): Array<CONTACT> {
    if (!value || value.length < 0) {
      return value;
    }

    value.sort((first: any, second: any): number => {
      return first[property] < second[property] ? -1 : 1;
    });

    if (direction === 'desc') {
      return value.reverse();
    }

    return value;
  }

}
