import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  currencyCodes: string[] = [];
  selectedCurrencyCode: string ='';
  dateRanges: string[] = ['Dzień', 'Miesiąc', 'Kwartał', 'Rok'];
  selectedDateRange: string = '';
  selectedStartDate: Date = new Date;
  selectedEndDate: Date = new Date;
  quarters: string [] = [];
  years: number[] = [];

  constructor(private currencyService: CurrencyService, private router: Router) { }

  ngOnInit(): void {
    this.currencyService.getCurrencyCodes().subscribe((data: any) => {
      this.currencyCodes = data.data.map((item: any) => item.code);
      this.currencyCodes.sort();
    });
    const currentYear = new Date().getFullYear();
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
    for (let year = currentYear; year > 2002; year--) {
      for (let quarter = (year === currentYear ? currentQuarter : 4); quarter >= 1; quarter--) {
        this.quarters.push(`${quarter}Q${year}`);
      }
    }
    for (let year = currentYear; year >= 2002; year--) {
      this.years.push(year);
    }
  }

  onCurrencyCodeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCurrencyCode = selectElement.value;
  }

  onDateRangeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDateRange = selectElement.value;
    
    const dateInputElement = document.getElementById('date') as HTMLInputElement;
    if (this.selectedDateRange === 'Dzień') {
      dateInputElement.type = 'date';
    } else if (this.selectedDateRange === 'Miesiąc') {
      dateInputElement.type = 'month';
    }
  }

  onStartDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedStartDate = new Date(inputElement.value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.selectedDateRange === 'Miesiąc') {
      this.selectedEndDate = new Date(this.selectedStartDate.getFullYear(), this.selectedStartDate.getMonth() + 1, 0);
    } else if (this.selectedDateRange === 'Kwartał') {
      console.log("Kwartał")
      this.selectedEndDate = new Date(this.selectedStartDate.getFullYear(), Math.ceil((this.selectedStartDate.getMonth() + 1) / 3) * 3, 0);
    } else if (this.selectedDateRange === 'Rok') {
      this.selectedEndDate = new Date(this.selectedStartDate.getFullYear(), 11, 31);
    } else {
      this.selectedEndDate = this.selectedStartDate;
    }
  
    console.log(this.selectedStartDate, this.selectedEndDate)
    this.router.navigate(['/historical-currency-rates', this.selectedCurrencyCode, this.formatDate(this.selectedStartDate), this.formatDate(this.selectedEndDate)]);
  }

  formatDate(date: Date): string {
    const d = new Date(date),
          year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  }

  onQuarterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const currentYear = new Date().getFullYear();
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
    const [quarter, year] = selectElement.value.split('Q').map(Number);
    var startDate = new Date();
    if (quarter == currentQuarter && year == currentYear){
      var today = new Date();
      startDate = new Date(today.getFullYear(),(currentQuarter - 1) * 3, 1);
      
    } else {
      startDate = new Date(year, (quarter) * 3, 1);
    }
    const endDate = new Date(year, quarter * 3 - 1, 0);
    console.log(currentQuarter,quarter);
    this.selectedStartDate = startDate;
    this.selectedEndDate = endDate;
  }

  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStartDate = new Date(Number(selectElement.value), 0, 1);
    this.selectedEndDate = new Date(Number(selectElement.value), 11, 31);
  }
}