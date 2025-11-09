import { TestBed } from '@angular/core/testing';

import { TelegramServices } from './telegram-services';

describe('TelegramServices', () => {
  let service: TelegramServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelegramServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
