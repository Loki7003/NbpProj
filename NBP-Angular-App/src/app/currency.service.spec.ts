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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  const apiUrl = 'http://localhost:6002/';+
  it('should update rates', () => {
    const rates = [{code: 'USD', rate: 1.2}];
    service.updateRates().subscribe(data => {
      expect(data).toEqual(rates);
    });

    const req = httpMock.expectOne(apiUrl + 'update-rates/');
    expect(req.request.method).toBe('GET');
    req.flush(rates);
  });

  it('should get currency details', () => {
    const currencyDetails = {code: 'USD', rate: 1.2};
    service.getCurrencyDetails('USD', '2020-01-01', '2020-12-31').subscribe(data => {
      expect(data).toEqual(currencyDetails);
    });

    const req = httpMock.expectOne(apiUrl + 'get-currency-details/USD/2020-01-01/2020-12-31');
    expect(req.request.method).toBe('GET');
    req.flush(currencyDetails);
  });

  it('should get currency codes', () => {
    const currencyCodes = ['USD', 'EUR'];
    service.getCurrencyCodes().subscribe(data => {
      expect(data).toEqual(currencyCodes);
    });

    const req = httpMock.expectOne(apiUrl + 'get-currency-codes/');
    expect(req.request.method).toBe('GET');
    req.flush(currencyCodes);
  });
});
