interface IGetAllTrainings {
  getAll: (params: GetCategoriesParams) => Promise<ITrainingsResponse>
}
