import { Injectable } from '@angular/core';
import { Departure } from './departure';
import { DEPARTURES } from './departures';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeparturesService {

  constructor() { }

  getDepartures(): Observable<Departure[]> {
    return of(DEPARTURES);
  }
}
