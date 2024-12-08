import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';
import 'moment/locale/bg';
moment.locale('bg');

@Pipe({
  name: 'elapsed',
  standalone: true,
})
export class ElapsedPipe implements PipeTransform {
  transform(date: string, ...args: unknown[]): unknown {
    return moment(date).fromNow();
  }
}
