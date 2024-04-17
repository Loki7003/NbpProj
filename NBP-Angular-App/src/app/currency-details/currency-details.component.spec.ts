import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CurrencyDetailsComponent } from './currency-details.component';
import { CurrencyService } from '../currency.service';

describe('CurrencyDetailsComponent', () => {
  let component: CurrencyDetailsComponent;
  let fixture: ComponentFixture<CurrencyDetailsComponent>;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDetailsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ CurrencyService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyDetailsComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCurrencyDetails on init', () => {
    const dummyDetails = [
      { code: 'USD', rate: 3.72, date: '2022-01-01' },
      { code: 'EUR', rate: 4.54, date: '2022-01-02' },
      { code: 'GBP', rate: 5.11, date: '2022-01-03' },
    ];
  
    spyOn(currencyService, 'getCurrencyDetails').and.returnValue(of(dummyDetails));
    spyOn(component, 'groupData');
    component.ngOnInit();
    expect(currencyService.getCurrencyDetails).toHaveBeenCalled();
    expect(component.groupData).toHaveBeenCalled();
  });
  
  it('should group data', () => {
    const dummyDetails = [
      { code: 'USD', rate: 3.72, date: '2022-01-01' },
      { code: 'EUR', rate: 4.54, date: '2022-01-02' },
      { code: 'GBP', rate: 5.11, date: '2022-01-03' },
    ];
  
    spyOn(currencyService, 'getCurrencyDetails').and.returnValue(of(dummyDetails));
    component.ngOnInit();
    component.groupData();
    expect(Object.keys(component.groupedData).length).toBeGreaterThan(0);
  });
});