import { Routes } from '@angular/router';
import { CreditFormComponent } from './pages/credit-form/credit-form.component';
import { CreditListComponent } from './pages/credit-list/credit-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'credits', pathMatch: 'full' },
  { path: 'register', component: CreditFormComponent },
  { path: 'credits', component: CreditListComponent }
];
