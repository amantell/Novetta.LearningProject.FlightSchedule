import { Injectable } from '@angular/core';
import { Arrival } from './arrival';
import { ARRIVALS } from './arrivals';
import { Observable, of } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

const subject = webSocket("wss://localhost:5001/arrivals");

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {

  constructor() { }

  arrivals: Arrival[];

  getArrivals(): Observable<Arrival[]> {

    subject.subscribe(
      msg => this.arrivals = this.parseArrivals(msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
    subject.next('arrivals');
    return of(this.arrivals);
  }

  parseArrivals(msg): Arrival[] {
    let finalResult = [];
    
    const dataEnum = {
      Flight: 0,
      FromCity: 1,
      FromTime: 2,
      ToCity: 3,
      ToTime: 4,
      Aircraft: 5,
      Notifications: 6
    }
    let result = JSON.parse(msg);

    for (let iCounter = 0; iCounter < result.length; iCounter++) {
      let data = result[iCounter].split(',');

      let arrival = {
        Flight: null,
        FromCity: null,
        FromTime: null,
        ToCity: null,
        ToTime: null,
        Aircraft: null,
        Notifications: null
        };

      for (let jCounter = 0; jCounter < data.length; jCounter++) {
        let datum = data[jCounter].split('":"')[1];
        switch (jCounter) {
            case dataEnum.Aircraft:
              arrival.Aircraft = datum;  
              break;
            case dataEnum.Flight:
              arrival.Flight = datum;  
              break;
            case dataEnum.FromCity:
              arrival.FromCity = datum;  
              break;
            case dataEnum.FromTime:
              arrival.FromTime = datum;  
              break;
            case dataEnum.ToCity:
              arrival.ToCity = datum;  
              break;
            case dataEnum.ToTime:
              arrival.ToTime = datum;  
              break;
            case dataEnum.Notifications:
              arrival.Notifications = datum;  
              break;
        }
      }

console.log(arrival);

      finalResult.push(arrival);          
    }

    return finalResult;
  }
}
