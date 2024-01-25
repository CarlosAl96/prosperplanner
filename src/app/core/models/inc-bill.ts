export class IncBill {
  public title: string;
  public description: string;
  public amount: number;
  public date: string;

  constructor() {
    this.title = '';
    this.description = '';
    this.date = '';
    this.amount = 0;
  }
}
