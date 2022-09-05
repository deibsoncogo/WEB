type Response = {
  accessToken: string
}

export interface IJoinTrainingChatRoomParams {
  trainingId: string
}

export interface IJoinTrainingChatRoom {
  join: (params: IJoinTrainingChatRoomParams) => Promise<Response>
}
