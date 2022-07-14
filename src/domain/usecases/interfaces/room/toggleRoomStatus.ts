export interface IToggleRoomStatusParams {
  id: string
}

export interface IToggleRoomStatus {
  toggle: (params: IToggleRoomStatusParams) => Promise<void>
}
