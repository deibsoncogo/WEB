export interface IToggleFreePlanStatusParams {
  id: string
}

export interface IToggleFreePlanStatus {
  toggle: (params: IToggleFreePlanStatusParams) => Promise<void>
}
