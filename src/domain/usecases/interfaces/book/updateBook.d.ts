interface IUpdateBook {
  update: (updateBook: FormData) => Promise<boolean>
}
