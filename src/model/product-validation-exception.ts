export class ProductValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductValidationException';
  }
}
