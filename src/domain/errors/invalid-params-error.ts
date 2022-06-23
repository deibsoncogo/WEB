export class InvalidParamsError extends Error {
  messages: string[] | string
  constructor(messages: string | string[]) {
    super('InvalidParamsError')
    this.name = 'InvalidParamsError'
    this.messages = messages
  }
}
