import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { HistoricalCurrencyRatesComponent } from './historical-currency-rates/historical-currency-rates.component';

const routes: Routes = [
  { path: '', component: CurrencyComponent},
  { path: 'currency', component: CurrencyComponent },
  { path: 'currency-details', component: CurrencyDetailsComponent },
  { path: 'historical-currency-rates/:currencyCode/:startDate/:endDate', component: HistoricalCurrencyRatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }