export class Category {
  forHim: string;
  forher: string;
  forBoth: string;
  clothes: string;
  constructor(
    forHim: string,
    forher: string,
    forBoth: string,
    clothes: string
  ) {
    this.forHim = forHim;
    this.forher = forher;
    this.forBoth = forBoth;
    this.clothes = clothes;
  }
}
