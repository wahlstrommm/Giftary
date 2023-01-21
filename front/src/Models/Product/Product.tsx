export class Product {
  name: string;
  summary: string;
  age: string;
  aimedFor: string;
  price: string;
  image: any;
  favorited: boolean;
  category: string;
  constructor(
    name: string,
    summary: string,
    age: string,
    aimedFor: string,
    price: string,
    image: any,
    favorited: boolean,
    category: string
  ) {
    this.name = name;
    this.summary = summary;
    this.age = age;
    this.aimedFor = aimedFor;
    this.price = price;
    this.image = image;
    this.favorited = favorited;
    this.category = category;
  }
}
