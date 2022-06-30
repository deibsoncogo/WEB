export interface ICreateBook {
  create: (createBook: FormData) => Promise<boolean>
}
