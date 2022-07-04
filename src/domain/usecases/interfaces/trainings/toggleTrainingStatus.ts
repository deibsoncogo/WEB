export interface IToggleTrainingStatusParams {
  id: string
}

export interface IToggleTrainingStatus {
  toggle: (params: IToggleTrainingStatusParams) => Promise<void>
}
