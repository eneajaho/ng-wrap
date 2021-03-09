import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

export interface Wrapped<T> {
  data: T | undefined;
  loading: boolean;
  error: any | undefined;
}

@Pipe({ name: 'wrap' })
export class WrapPipe<T> implements PipeTransform {

  transform(obs$: Observable<T | null | undefined>, ...args: any[]): Observable<Wrapped<T>> {
    return obs$.pipe(
      startWith(null),
      map((value: T | null | undefined) => {
        if (value === null || value === undefined) {
          return {
            data: undefined,
            loading: true,
            error: undefined
          }
        }
        return {
          data: value,
          loading: false,
          error: undefined
        }
      }),
      catchError(err => {
        return of({
          data: undefined,
          loading: false,
          error: err
        })
      })
    )
  }
}
