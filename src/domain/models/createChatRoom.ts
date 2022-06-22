export class CreateChatRoom {
  roomId: string;
  message: string
  hour: string
  date: string

  constructor(roomId: string, message: string, hour: string, date: string){
    this.roomId = roomId;
    this.message = message;
    this.hour = hour;
    this.date = date;
  }
}
