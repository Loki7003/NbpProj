import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';

const routes: Routes = [
  { path: '', component: CurrencyComponent},
  { path: 'currency', component: CurrencyComponent },
  { path: 'currency-details', component: CurrencyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }