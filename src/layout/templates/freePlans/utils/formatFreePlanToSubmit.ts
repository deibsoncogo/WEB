import { IPlan, PlanType } from '../../../../domain/models/plan'

function formatFreePlanToSubmit(freePlan: IPlan): FormData {
  const { image, name, description, books, courses, rooms, trainings, categoryId, intervalAccess } =
    freePlan
  const formData = new FormData()

  if (image) {
    formData.append('image', image)
  }

  formData.append('name', name)
  formData.append('description', description)
  formData.append('categoryId', categoryId)
  formData.append('price', String(0))
  formData.append('intervalAccess', String(intervalAccess))
  formData.append('planType', PlanType.FREE_PLAN)
  formData.append('booksId', JSON.stringify(books))
  formData.append('roomsId', JSON.stringify(rooms))
  formData.append('coursesId', JSON.stringify(courses))
  formData.append('trainingsId', JSON.stringify(trainings))

  return formData
}

export { formatFreePlanToSubmit }
