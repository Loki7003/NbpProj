import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyDetailsComponent } from './currency-details.component';
import { CurrencyService } from '../currency.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CurrencyDetailsComponent', () => {
  let component: CurrencyDetailsComponent;
  let fixture: ComponentFixture<CurrencyDetailsComponent>;
  let currencyService: CurrencyService;
  let router: Router;

  class RouterStub {
    navigate(params: any[]) {
      return of(null);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDetailsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ CurrencyService, { provide: Router, useClass: RouterStub } ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyDetailsComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update currency codes on init', () => {
    const currencyCodes = ['EUR', 'USD'];
    spyOn(currencyService, 'getCurrencyCodes').and.returnValue(of({data: currencyCodes.map(code => ({code}))}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.currencyCodes).toEqual(currencyCodes);
  });

  it('should update selected currency code on currency code change', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', {value: {value: 'USD'}, writable: false});
    component.onCurrencyCodeChange(event);
    fixture.detectChanges();
    expect(component.selectedCurrencyCode).toEqual('USD');
  });

  it('should update selected date range on date range change', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', {value: {value: 'Miesiąc'}, writable: false});
    const dateInputElement = document.createElement('input');
    dateInputElement.id = 'date';
    spyOn(document, 'getElementById').and.returnValue(dateInputElement);
    component.onDateRangeChange(event);
    fixture.detectChanges();
    expect(component.selectedDateRange).toEqual('Miesiąc');
    expect(dateInputElement.type).toEqual('month'); 
  });

  it('should update selected start date on start date change', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', {value: {value: '2020-01-01'}, writable: false});
    component.onStartDateChange(event);
    fixture.detectChanges();
    expect(component.selectedStartDate).toEqual(new Date('2020-01-01'));
  });

  it('should navigate to historical currency rates on submit', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.selectedCurrencyCode = 'USD';
    component.selectedStartDate = new Date('2020-01-01');
    component.selectedEndDate = new Date('2020-12-31');
    component.selectedDateRange = 'Rok';
    component.onSubmit(new Event('submit'));
    expect(navigateSpy).toHaveBeenCalledWith(['/historical-currency-rates', 'USD', '2020-01-01', '2020-12-31']);
  });

  it('should update selected start and end dates on quarter change', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', {value: {value: '1Q2020'}, writable: false});
    component.onQuarterChange(event);
    fixture.detectChanges();
    const startDate = new Date(2020, 3, 1);
    const endDate = new Date(2020, 1, 29);
    expect(component.selectedStartDate).toEqual(startDate);
    expect(component.selectedEndDate).toEqual(endDate);
  });
});