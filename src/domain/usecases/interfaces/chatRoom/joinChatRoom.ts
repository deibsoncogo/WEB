type Response = {
  accessToken: string
}

export interface IJoinChatRoomParams {
  roomId: string
}

export interface IJoinChatRoom {
  join: (params: IJoinChatRoomParams) => Promise<Response>
}
