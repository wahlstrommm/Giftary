export class NewUser {
  firstName:string;
  lastName:string;
  sex:string;
  phone:string;
  email:string;
  password:string;
  productList:any[];
  constructor(firstname:string, lastName:string, sex:string, phone:string, email:string, password:string,productList:any[]) {
    (this.firstName = firstname);
      (this.lastName = lastName);
      (this.sex = sex);
      (this.phone = phone);
      (this.email = email);
      (this.password = password);
      (this.productList=productList);
  }
}
