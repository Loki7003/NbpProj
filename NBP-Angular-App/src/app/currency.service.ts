import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://localhost:6002/';

  constructor(private http: HttpClient) { }

  updateRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'update-rates/');
  }

  getCurrencyDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'get-currency-details/');
  }
}