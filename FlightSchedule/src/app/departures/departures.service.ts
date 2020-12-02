import { Injectable } from '@angular/core';
import { Departure } from './departure';
import { Observable, of } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';


@Injectable({
  providedIn: 'root'
})
export class DeparturesService {

  webSocket: WebSocket;
  departure: string;
  departures: Departure[];

  constructor() { }

  public openWebSocket() {
    this.webSocket = new WebSocket("wss://localhost:5071/departures");
    this.webSocket.onopen = (event) => {
      this.sendMessage();
    }
    this.webSocket.onmessage = (event) => {
      let result = JSON.parse(event.data);
      this.departures = this.parseDepartures(result);
    }
    this.webSocket.onclose = (event) => {
      console.log("close:", event)
    }
  }

  private sendMessage() {
    this.webSocket.send("departures");
  }

  public closeWebsocket() {
    this.webSocket.close();
  }

  private parseDepartures(result): Departure[] {
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

    for (let iCounter = 0; iCounter < result.length; iCounter++) {
      let data = result[iCounter].split(',');

      let departure = {
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
              departure.Aircraft = datum;  
              break;
            case dataEnum.Flight:
              departure.Flight = datum;  
              break;
            case dataEnum.FromCity:
              departure.FromCity = datum;  
              break;
            case dataEnum.FromTime:
              departure.FromTime = datum;  
              break;
            case dataEnum.ToCity:
              departure.ToCity = datum;  
              break;
            case dataEnum.ToTime:
              departure.ToTime = datum;  
              break;
            case dataEnum.Notifications:
              departure.Notifications = datum;  
              break;
        }
      }
      finalResult.push(departure);          
    }

    console.log(finalResult);
    return finalResult;
  }
}
