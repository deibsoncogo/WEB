type Response = {
  accessToken: string
}

export interface IJoinChatRoomParams {
  roomId: string
}

export interface IJoinChatRoom {
  getAll: (params: IJoinChatRoomParams) => Promise<Response>
}
