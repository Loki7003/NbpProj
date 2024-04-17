import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {
  currencyDetails: any[] = [];
  groupedData: Record<string,any[]> = {};
  groupBy: string = 'year';

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrencyDetails().subscribe(data => {
      this.currencyDetails = data;
      this.groupData();
    });
  }

  getQuarter(date: Date): number {
    const month = date.getMonth() + 1;
    return Math.ceil(month / 3);
  }

  groupData(): void {
    switch (this.groupBy) {
      case 'year':
        this.groupedData = _.groupBy(this.currencyDetails, item => new Date(item.date).getFullYear());
        break;
      case 'quarter':
        this.groupedData = _.groupBy(this.currencyDetails, item => {
          const date = new Date(item.date);
          return `${date.getFullYear()} Q${this.getQuarter(date)}`;
        });
        break;
      case 'month':
        this.groupedData = _.groupBy(this.currencyDetails, item => {
          const date = new Date(item.date);
          return `${date.getFullYear()}-${date.getMonth() + 1}`;
        });
        break;
      case 'day':
        this.groupedData = _.groupBy(this.currencyDetails, item => {
          const date = new Date(item.date);
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        });
        break;
      default:
        this.groupedData = _.groupBy(this.currencyDetails, item => {
          const date = new Date(item.date);
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        });
        break;
    }
    for (let key in this.groupedData){
      this.groupedData[key].reverse();
    }
  }

  onGroupByChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.groupBy = selectElement.value;
    this.groupData();
  }
}