interface ITrainings {
  id: string
  name: string
  price: number
  discount: number
  description: string
  categoryId: string
  isChatActive: boolean
  streamingDate: string
  streamingHour: string
  imageUrl: string
  teacher: TrainingTeacher
}

interface TrainingTeacher {
  id: string
  name: string
}
