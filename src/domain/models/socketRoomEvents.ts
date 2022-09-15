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
  ConnectError = 'connect_error',
}
