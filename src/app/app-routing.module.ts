import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IncomeComponent } from './pages/income/income.component';
import { BillsComponent } from './pages/bills/bills.component';
import { AddIncomeBillsComponent } from './pages/add-income-bills/add-income-bills.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'income',
    component: IncomeComponent,
  },
  {
    path: 'bills',
    component: BillsComponent,
  },

  {
    path: 'add/:type',
    component: AddIncomeBillsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
