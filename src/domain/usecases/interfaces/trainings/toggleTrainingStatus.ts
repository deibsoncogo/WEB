export interface IToggleTrainingStatusParams {
  id: string
  active: 'true' | 'false'
}

export interface IToggleTrainingStatus {
  toggle: (params: IToggleTrainingStatusParams) => Promise<void>
}
