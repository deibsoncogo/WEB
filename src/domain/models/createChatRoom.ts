export class CreateChatRoom {
  idRoom: string;
  message: string
  hour: string
  date: string

  constructor(idRoom: string, message: string, hour: string, date: string){
    this.idRoom = idRoom;
    this.message = message;
    this.hour = hour;
    this.date = date;
  }
}
