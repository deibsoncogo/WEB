export interface IZoomUser {
  id: string
  first_name: string
  last_name: string
  email: string
  status: string
  type: number
}

export interface IGetZoomUsers {
  get: () => Promise<IZoomUser[]>
}
