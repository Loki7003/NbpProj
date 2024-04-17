import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CurrencyComponent } from './currency.component';
import { CurrencyService } from '../currency.service';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ CurrencyService ]
    })
    .compileComponents();
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

  it('should call updateRates on init', () => {
    spyOn(component, 'updateRates');
    component.ngOnInit();
    expect(component.updateRates).toHaveBeenCalled();
  });

  it('should update rates', () => {
    const dummyRates = [
      { code: 'USD', rate: 3.72 },
      { code: 'EUR', rate: 4.53 }
    ];

    spyOn(currencyService, 'updateRates').and.returnValue(of(dummyRates));
    component.updateRates();
    expect(component.rates).toEqual(dummyRates);
  });
});