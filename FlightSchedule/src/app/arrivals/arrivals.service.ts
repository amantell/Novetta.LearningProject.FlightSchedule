import { Injectable } from '@angular/core';
import { Arrival } from './arrival';
import { Observable, of } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';


@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {

  webSocket: WebSocket;
  arrival: string;
  arrivals: Arrival[];

  constructor() { }

  public openWebSocket() {
    this.webSocket = new WebSocket("wss://localhost:5069/arrivals");
    this.webSocket.onopen = (event) => {
      this.sendMessage();
    }
    this.webSocket.onmessage = (event) => {
      let result = JSON.parse(event.data);
      this.arrivals = this.parseArrivals(result);
    }
    this.webSocket.onclose = (event) => {
      console.log("close:", event)
    }
  }

  private sendMessage() {
    this.webSocket.send("arrivals");
  }

  public closeWebsocket() {
    this.webSocket.close();
  }

  private parseArrivals(msg): Arrival[] {
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
        let datum = data[jCounter].split('":"')[1]
          .replace(/\\/, '').replace('""', '"')
          .replace(/\\"/, '').replace('"}', '').replace(/"/, '');
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
      finalResult.push(arrival);          
    }

    return finalResult;
  }
}
