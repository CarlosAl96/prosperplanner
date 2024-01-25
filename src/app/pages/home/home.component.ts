import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IncBill } from 'src/app/core/models/inc-bill';
import { StorageService } from 'src/app/core/services/storage.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  balance: number = 0;
  bills: IncBill[] = [];
  income: IncBill[] = [];

  lastsBills: IncBill[] = [];
  lastsIncome: IncBill[] = [];

  totalIncome: number = 0;
  totalBills: number = 0;
  total: number = 0;

  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];

  pie: any;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    console.log('init ejecutandose');

    this.storage.getBalanceObservable().subscribe((resp) => {
      if (resp != null) {
        this.balance = resp;
      }

      console.log(this.balance);
    });

    this.storage.getBillsObservable().subscribe((resp) => {
      if (resp) {
        this.bills = resp;
        this.lastsBills = [];
        this.totalBills = 0;

        let lastIndex = this.bills.length >= 10 ? 10 : this.bills.length;
        for (let i = 0; i < lastIndex; i++) {
          this.lastsBills.push(this.bills[i]);
        }

        this.bills.map((bill) => {
          this.totalBills += bill.amount;
        });

        this.chartData[1] = this.totalBills;

        console.log(this.bills);
      }
    });

    this.storage.getIncomeObservable().subscribe((resp) => {
      if (resp) {
        this.income = resp;
        this.lastsIncome = [];
        this.totalIncome = 0;

        let lastIndex = this.income.length >= 10 ? 10 : this.income.length;
        for (let i = 0; i < lastIndex; i++) {
          this.lastsIncome.push(this.income[i]);
        }

        this.income.map((inc) => {
          this.totalIncome += inc.amount;
        });

        this.chartData[0] = this.totalIncome;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setPie();
    }, 1000);
  }

  updatePie() {
    console.log(this.totalIncome);
    console.log(this.totalBills);

    this.pie.update();
  }

  setPie() {
    console.log('Se ejecuto el setPie');

    this.chartDatalabels.push('Ingresos');
    this.chartDatalabels.push('Gastos');

    this.ctx = document.getElementById('pie');
    this.config = {
      type: 'pie',
      options: {},
      data: {
        labels: this.chartDatalabels,
        datasets: [
          {
            label: 'Total',
            data: this.chartData,
            borderWidth: 1,
            borderColor: 'transparent',
            backgroundColor: ['#25b655', '#ff0000'],
          },
        ],
      },
    };
    this.pie = new Chart(this.ctx, this.config);
  }
}
