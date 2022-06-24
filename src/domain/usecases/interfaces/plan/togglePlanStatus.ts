export interface ITogglePlanStatusParams {
  id: string
}

export interface ITogglePlanStatus {
  toggle: (params: ITogglePlanStatusParams) => Promise<void>
}
