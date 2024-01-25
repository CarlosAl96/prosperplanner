import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { BillsComponent } from './pages/bills/bills.component';
import { IncomeComponent } from './pages/income/income.component';
import { AddIncomeBillsComponent } from './pages/add-income-bills/add-income-bills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';

Chart.register(...registerables);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    BillsComponent,
    IncomeComponent,
    AddIncomeBillsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
