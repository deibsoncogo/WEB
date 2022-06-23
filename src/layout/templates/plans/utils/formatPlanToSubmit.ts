import { IPlan, PlanType } from '../../../../domain/models/plan'

function formatPlanToSubmit(plan: IPlan): FormData {
  const {
    image,
    name,
    description,
    price,
    planType,
    installments,
    intervalAccessMonths,
    intervalPaymentMonths,
    isActive,
    books,
    courses,
    rooms,
    trainings,
  } = plan
  const formData = new FormData()

  if (image) {
    formData.append('image', image)
  }

  if (planType === PlanType.SINGLE_PAYMENT) {
    formData.append('installments', String(installments))
    formData.append('intervalAccessMonths', String(intervalAccessMonths))
  }

  if (planType === PlanType.RECURRING_PAYMENT) {
    formData.append('intervalPaymentMonths', String(intervalPaymentMonths))
  }

  formData.append('name', name)
  formData.append('description', description)
  formData.append('price', String(price))
  formData.append('planType', planType)
  formData.append('isActive', String(isActive))
  formData.append('booksId', JSON.stringify(books))
  formData.append('roomsId', JSON.stringify(rooms))
  formData.append('coursesId', JSON.stringify(courses))
  formData.append('trainingsId', JSON.stringify(trainings))

  return formData
}

export { formatPlanToSubmit }
