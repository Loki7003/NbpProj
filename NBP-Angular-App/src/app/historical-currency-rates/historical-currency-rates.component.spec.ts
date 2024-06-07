import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HistoricalCurrencyRatesComponent } from './historical-currency-rates.component';
import { CurrencyComponent } from '../currency/currency.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HistoricalCurrencyRatesComponent', () => {
  let component: HistoricalCurrencyRatesComponent;
  let fixture: ComponentFixture<HistoricalCurrencyRatesComponent>;

  let activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: () => '1', // represents the 'id' parameter
      },
    },
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalCurrencyRatesComponent, CurrencyComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HistoricalCurrencyRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});