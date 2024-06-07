import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyComponent } from './currency.component';
import { CurrencyService } from '../currency.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyComponent ],
      imports: [ HttpClientTestingModule ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update rates', () => {
    const rates = [{code: 'USD', rate: 1.2}, {code: 'EUR', rate: 0.9}];
    spyOn(currencyService, 'updateRates').and.returnValue(of({data: rates}));
    component.updateRates();
    expect(component.rates).toEqual(rates);
    expect(component.showRates).toBeTrue();
  });
});