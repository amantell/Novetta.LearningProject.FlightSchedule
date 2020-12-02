import { Component, OnInit } from '@angular/core';
import { Departure } from './departure';
import { DEPARTURES } from './departures';
import { DeparturesService } from './departures.service';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.css']
})
export class DeparturesComponent implements OnInit {

  departures: Departure[];

  constructor(public departuresService: DeparturesService) { }

  getDepartures(): void {
    this.departuresService.openWebSocket();
  }

  ngOnInit(): void {
    this.getDepartures();
  }
}
