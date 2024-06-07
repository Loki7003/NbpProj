import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-historical-currency-rates',
  templateUrl: './historical-currency-rates.component.html',
  styleUrl: './historical-currency-rates.component.css'
})
export class HistoricalCurrencyRatesComponent implements OnInit {
  currencyCode: string = '';
  startDate: string = '';
  endDate: string = '';
  rates: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyCode = this.route.snapshot.paramMap.get('currencyCode') || '';
    this.startDate = this.route.snapshot.paramMap.get('startDate') || '';
    this.endDate = this.route.snapshot.paramMap.get('endDate') || '';
    console.log(this.currencyCode, this.endDate, this.startDate);
    this.currencyService.getCurrencyDetails(this.currencyCode, this.startDate, this.endDate).subscribe((data: any) => {
      this.rates = data.data;
    });
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
}
