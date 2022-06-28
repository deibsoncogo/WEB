export interface IToggleBookStatusParams {
  id: string
  active: 'true' | 'false'
}

export interface IToggleBookStatus {
  toggle: (params: IToggleBookStatusParams) => Promise<void>
}
