import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IncBill } from 'src/app/core/models/inc-bill';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  balance: number = 0;
  bills: IncBill[] = [];
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

    this.storage.getBillsObservable().subscribe((resp) => {
      if (resp) {
        this.bills = resp;
        this.total = 0;

        this.bills.map((bill) => {
          this.total += bill.amount;
        });

        this.total = Number(this.total.toFixed(2));
      }
    });
  }

  goToAdd() {
    this.router.navigate(['add/bills']);
  }

  async presentAlert(index: number) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar este gasto?',
      subHeader: 'Nota:',
      message:
        'Al eliminar un gasto su saldo se verá afectado, sumándosele el monto correspondiente al gasto eliminado.',
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
    this.balance = this.balance + this.bills[index].amount;
    this.bills.splice(index, 1);
    this.storage.setBalance(this.balance);
    this.storage.setBills(this.bills);
  }
}
