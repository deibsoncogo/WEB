interface ITrainings {
  id: string
  name: string
  price: number
  discount: number
  description: string
  categoryId: string
  active: boolean
  streamings: Streaming[]
  imageUrl: string
  teacher: TrainingTeacher
}

interface TrainingTeacher {
  id: string
  name: string
}

interface Streaming {
  id: string
  hour: string
  date: string
}
