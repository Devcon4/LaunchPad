import { Pipe, PipeTransform } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';

@Pipe({
  name: 'pipeable'
})
export class PipeablePipe implements PipeTransform {

  transform<T, U>(value: Observable<T>, args: OperatorFunction<any, any>[]): Observable<U> {
    return value.pipe(...args);
  }
}
