import { IPlan, PlanType } from '../../../../domain/models/plan'

function formatPlanToSubmit(plan: IPlan): FormData {
  const {
    image,
    name,
    description,
    price,
    planType,
    installments,
    intervalAccess,
    intervalPaymentMonths,
    books,
    courses,
    rooms,
    trainings,
    categoryId,
  } = plan
  const formData = new FormData()

  if (image) {
    formData.append('image', image)
  }

  if (planType === PlanType.SINGLE_PAYMENT) {
    formData.append('installments', String(installments))
    formData.append('intervalAccess', String(intervalAccess))
  }

  if (planType === PlanType.RECURRING_PAYMENT) {
    formData.append('intervalPaymentMonths', String(intervalPaymentMonths))
  }

  formData.append('name', name)
  formData.append('description', description)
  formData.append('price', String(price))
  formData.append('planType', planType)
  formData.append('booksId', JSON.stringify(books))
  formData.append('roomsId', JSON.stringify(rooms))
  formData.append('coursesId', JSON.stringify(courses))
  formData.append('trainingsId', JSON.stringify(trainings))
  formData.append('categoryId', categoryId)

  return formData
}

export { formatPlanToSubmit }
