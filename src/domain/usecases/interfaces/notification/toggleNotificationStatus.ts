export interface IToggleNotificationStatusParams {
  id: string
}

export interface IToggleNotificationStatus {
  toggle: (params: IToggleNotificationStatusParams) => Promise<void>
}
