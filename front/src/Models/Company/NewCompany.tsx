export class NewCompany {
  name: string;
  orgNumber: string;
  products: any[];
  password: any;
  constructor(name: string, orgNumber: string, products: any[], password: any) {
    this.name = name;
    this.orgNumber = orgNumber;
    this.products = products;
    this.password = password;
  }
}
