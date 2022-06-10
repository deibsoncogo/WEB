export interface IExportAllUsersParams {
  name: string
}

export interface IExportAllUserToXLSXResponse {
  type: string
  data: Buffer
}

export interface IExportAllUsersToXLSX {
  export: (params: IExportAllUsersParams) => Promise<IExportAllUserToXLSXResponse>
}
