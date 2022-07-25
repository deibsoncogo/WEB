export interface IToggleCourseStatusParams {
  id: string
}

export interface IToggleCourseStatus {
  toggle: (params: IToggleCourseStatusParams) => Promise<void>
}
