interface ITrainings {
  id: string
  name: string
  teacher: string
  description: string
  categories: string
  price: number
  discount: number
  chatTime: string | Date
  finishDate: string | Date
  liveDate: string | Date
  time: string | Date
  photo?: File
}

interface IEditTrainingsForm {
  data: ITrainings
}
