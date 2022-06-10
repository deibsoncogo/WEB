export class ConflitctEntitiesError extends Error {
  messages: string[]
  constructor(messages: string[]) {
    super('ConflitctEntitiesError')
    this.name = 'ConflitctEntitiesError'
    this.messages = messages
  }
}
