export class InvalidParamsError extends Error {
  messages: string[];
  constructor(messages: string[]) {
    super('InvalidParamsError');
    this.name = 'InvalidParamsError';
    this.messages = messages;
  }
}
