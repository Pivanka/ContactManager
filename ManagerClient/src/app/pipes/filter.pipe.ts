import { Pipe, PipeTransform } from '@angular/core';
import { CONTACT } from '../models/contact.models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filter: any, property: string): any[] {
    const resultArray = [];

    if(value.length === 0 || filter === '' || property === '') {
      return value;
    }

    for (const item of value) {
      if(item[property].includes(filter)) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
