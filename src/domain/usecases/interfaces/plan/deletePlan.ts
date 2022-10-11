export interface IDeletePlanParams {
  id: string
}

export interface IDeletePlan {
  delete: (params: IDeletePlanParams) => Promise<void>
}
