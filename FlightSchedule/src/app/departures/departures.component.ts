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

  constructor(private departuresService: DeparturesService) { }

  getDepartures(): void {
    this.departuresService.getDepartures().subscribe(departures => this.departures = departures);
  }

  ngOnInit(): void {
    this.getDepartures();
  }
}
