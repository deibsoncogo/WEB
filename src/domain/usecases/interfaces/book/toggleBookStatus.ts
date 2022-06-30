export interface IToggleBookStatusParams {
  id: string
}

export interface IToggleBookStatus {
  toggle: (params: IToggleBookStatusParams) => Promise<void>
}
