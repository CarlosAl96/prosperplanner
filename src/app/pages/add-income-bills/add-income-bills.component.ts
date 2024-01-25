import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncBill } from 'src/app/core/models/inc-bill';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-add-income-bills',
  templateUrl: './add-income-bills.component.html',
  styleUrls: ['./add-income-bills.component.scss'],
})
export class AddIncomeBillsComponent implements OnInit {
  public type!: string;
  private activatedRoute = inject(ActivatedRoute);

  form!: FormGroup;

  balance: number = 0;
  bills: IncBill[] = [];
  income: IncBill[] = [];

  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.formBuild();

    this.type = this.activatedRoute.snapshot.paramMap.get('type') as string;

    this.storage.getBalanceObservable().subscribe((resp) => {
      if (resp) {
        this.balance = resp;
      }
    });

    this.storage.getBillsObservable().subscribe((resp) => {
      if (resp) {
        this.bills = resp;
      }
    });

    this.storage.getIncomeObservable().subscribe((resp) => {
      if (resp) {
        this.income = resp;
      }
    });
  }

  formBuild() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  save() {
    if (this.form.valid) {
      this.errorMessage = '';

      const obj: IncBill = {
        title: this.form.controls['title'].value as string,
        description: this.form.controls['description'].value as string,
        date: new Date(
          this.form.controls['date'].value + 'T00:00:00'
        ).toLocaleDateString(),
        amount: Number(this.form.controls['amount'].value),
      };

      if (this.type == 'bills') {
        this.bills.unshift(obj);

        this.balance = this.balance - obj.amount;
        this.storage.setBalance(this.balance);
        this.storage.setBills(this.bills);

        this.router.navigate(['bills']);
      } else {
        this.income.unshift(obj);

        this.balance = this.balance + obj.amount;
        this.storage.setBalance(this.balance);
        this.storage.setIncome(this.income);

        this.router.navigate(['income']);
      }
      this.form.reset();
    } else {
      this.errorMessage = '¡Por favor llene el formulario correctamente!';
    }
  }

  cancel() {
    this.form.reset();
    if (this.type == 'bills') {
      this.router.navigate(['bills']);
    } else {
      this.router.navigate(['income']);
    }
  }
}
