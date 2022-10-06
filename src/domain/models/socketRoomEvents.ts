export enum SocketRoomEvents {
  Room = 'room',
  RoomChatUpdated = 'roomChatUpdated',
  CreateMessage = 'createMessage',
  ReceiveMessage = 'receiveMessage',
  ViewMessage = 'viewMessage',
  ViewedMessage = 'viewdMessage',
  ViewAllMessages = 'viewAllMessages',
  UpdateMessageViews = 'updateMessageViews',
  DeleteMessage = 'deleteMessage',
  DeletedMessage = 'deletedMessage',
  ReceivedFileUploaded = 'receivedFileUploaded',
  ConnectError = 'connect_error',
}
