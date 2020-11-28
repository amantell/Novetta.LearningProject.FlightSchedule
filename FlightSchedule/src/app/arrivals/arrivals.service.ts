import { Injectable } from '@angular/core';
import { Arrival } from './arrival';
import { ARRIVALS } from './arrivals';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {

  constructor() { }

  getArrivals(): Observable<Arrival[]> {
    return of(ARRIVALS);
  }
}
