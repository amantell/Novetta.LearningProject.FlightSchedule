import { Component, OnInit } from '@angular/core';
import { ARRIVALS } from './arrivals';
import {Arrival} from './arrival';
import { ArrivalsService } from './arrivals.service'

@Component({
  selector: 'app-arrivals',
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.css']
})
export class ArrivalsComponent implements OnInit {

  arrivals: Arrival[];

  constructor(private arrivalsService: ArrivalsService) { }

  getArrivals(): void {
    this.arrivalsService.getArrivals().subscribe(arrivals => this.arrivals = arrivals);
  }

  ngOnInit(): void {
    this.getArrivals();
  }

}
