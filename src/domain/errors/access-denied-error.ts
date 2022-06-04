export class AccessDeniedError extends Error {
  constructor(message = 'Acesso negado!' ) {
    super(message);
    this.name = 'AccessDeniedError';
  }
}
