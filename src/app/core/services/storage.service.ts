import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IncBill } from '../models/inc-bill';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  private balance = new BehaviorSubject<number>(0);
  private bills = new BehaviorSubject<IncBill[]>([]);
  private income = new BehaviorSubject<IncBill[]>([]);

  constructor(private storage: Storage) {
    this.init();
  }

  setBalanceObservable(value: number) {
    this.balance.next(value);
  }
  getBalanceObservable() {
    return this.balance.asObservable();
  }

  setBillsObservable(bills: IncBill[]) {
    this.bills.next(bills);
  }
  getBillsObservable() {
    return this.bills.asObservable();
  }

  setIncomeObservable(income: IncBill[]) {
    this.income.next(income);
  }
  getIncomeObservable() {
    return this.income.asObservable();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getBills() {
    this.setBillsObservable(JSON.parse(await this.storage.get('bills')));
  }

  async getIncome() {
    this.setIncomeObservable(JSON.parse(await this.storage.get('income')));
  }

  async getBalance() {
    this.setBalanceObservable(await this.storage.get('balance'));
  }

  async setBills(bills: IncBill[]) {
    this.setBillsObservable(bills);
    return await this.storage.set('bills', JSON.stringify(bills));
  }

  async setIncome(income: IncBill[]) {
    this.setIncomeObservable(income);
    return await this.storage.set('income', JSON.stringify(income));
  }

  async setBalance(balance: number) {
    this.setBalanceObservable(balance);
    return await this.storage.set('balance', balance);
  }
}
