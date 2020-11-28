import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrivalsComponent } from './arrivals/arrivals.component';
import { DeparturesComponent } from './departures/departures.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrivalsComponent,
    DeparturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
