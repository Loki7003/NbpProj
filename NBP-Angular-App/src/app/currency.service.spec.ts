import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve rates from the API via GET', () => {
    const dummyRates = [
      { code: 'USD', rate: 3.72, date: new Date() },
      { code: 'EUR', rate: 4.53, date: new Date() }
    ];
  
    service.updateRates().subscribe(rates => {
      expect(rates.length).toBe(2);
      expect(rates).toEqual(dummyRates);
    });
  
    const request = httpMock.expectOne(`${service['apiUrl']}update-rates/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyRates);
  });
  
  it('should retrieve currency details from the API via GET', () => {
    const dummyDetails = [
      { code: 'USD', rate: 3.72, date: new Date() },
      { code: 'EUR', rate: 4.54, date: new Date() },
      { code: 'GBP', rate: 5.11, date: new Date() },
    ];
  
    service.getCurrencyDetails().subscribe(details => {
      expect(details.length).toBe(3);
      expect(details).toEqual(dummyDetails);
    });
  
    const request = httpMock.expectOne(`${service['apiUrl']}get-currency-details/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDetails);
  });
});