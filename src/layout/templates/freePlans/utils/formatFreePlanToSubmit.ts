import { IFreePlan } from '../../../../domain/models/freePlan'

function formatFreePlanToSubmit(freePlan: IFreePlan): FormData {
  const { image, name, description, books, courses, rooms, trainings, level, contentAccessDays } =
    freePlan
  const formData = new FormData()

  if (image) {
    formData.append('image', image)
  }

  formData.append('name', name)
  formData.append('description', description)
  formData.append('level', level)
  formData.append('contentAccessDays', String(contentAccessDays))
  formData.append('booksId', JSON.stringify(books))
  formData.append('roomsId', JSON.stringify(rooms))
  formData.append('coursesId', JSON.stringify(courses))
  formData.append('trainingsId', JSON.stringify(trainings))

  return formData
}

export { formatFreePlanToSubmit }
