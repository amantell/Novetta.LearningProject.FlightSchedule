import { TestBed } from '@angular/core/testing';

import { Arrival.WebsocketService } from './arrival.websocket.service';

describe('Arrival.WebsocketService', () => {
  let service: Arrival.WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arrival.WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
