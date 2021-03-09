import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `

      <div *ngIf="value$ | wrap | async as vm">
          <div *ngIf="vm.data">
              Data: {{vm.data | json }}
          </div>
          <div *ngIf="vm.loading">
              Loading...
          </div>
          <div *ngIf="vm.error">
              Error: {{ vm.error.message }}
          </div>
      </div>

      <br>
      <button (click)="makeCall()">makeCall</button>
      <button (click)="value$.next(null)">null</button>
      <button (click)="value$.next(undefined)">undefined</button>
      <button (click)="value$.next(1)">test (1)</button>
      <button (click)="value$.next(2)">test (2)</button>
      <button (click)="value$.error(err)">error</button>
      <button (click)="refresh()">Refresh</button>
  `
})
export class AppComponent {

  value$: Observable<any> | Subject<any> = new Subject<any>();
  err = new Error('test error');

  constructor(private http: HttpClient) {}

  makeCall() {
    this.value$ = this.http.get<any>('http://localhost:3000/postss').pipe(
      delay(1000)
    );
  }

  refresh(): void {
    this.value$ = new Subject();
  }

}
