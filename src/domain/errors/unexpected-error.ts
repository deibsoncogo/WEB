export class UnexpectedError extends Error {
  constructor() {
    super('Algo de inesperado ocorreu. Tente novamente em breve.');
    this.name = 'UnexpectedError';
  }
}
