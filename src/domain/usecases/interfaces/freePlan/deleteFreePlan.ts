export interface IDeleteFreePlanParams {
  id: string
}

export interface IDeleteFreePlan {
  delete: (params: IDeleteFreePlanParams) => Promise<void>
}
