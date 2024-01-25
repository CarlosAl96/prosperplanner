import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncBill } from 'src/app/core/models/inc-bill';
import { StorageService } from 'src/app/core/services/storage.service';
import { AlertController, AlertButton } from '@ionic/angular';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  balance: number = 0;
  income: IncBill[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private storage: StorageService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.storage.getBalanceObservable().subscribe((resp) => {
      if (resp) {
        this.balance = resp;
      }
    });

    this.storage.getIncomeObservable().subscribe((resp) => {
      if (resp) {
        this.income = resp;
        this.total = 0;

        this.income.map((inc) => {
          this.total += inc.amount;
        });

        this.total = Number(this.total.toFixed(2));
      }
    });
  }

  goToAdd() {
    this.router.navigate(['add/income']);
  }

  async presentAlert(index: number) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar este ingreso?',
      subHeader: 'Nota:',
      message:
        'Al eliminar un ingreso su saldo se verá afectado, restándosele el monto correspondiente al ingreso eliminado.',
      buttons: [
        {
          cssClass: 'cancel',
          text: 'No',
          role: 'cancel',
          handler: () => {},
        },
        {
          cssClass: 'delete',
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.delete(index);
          },
        },
      ],
    });

    await alert.present();
  }

  delete(index: number) {
    this.balance = this.balance - this.income[index].amount;
    this.income.splice(index, 1);
    this.storage.setBalance(this.balance);
    this.storage.setIncome(this.income);
  }
}
