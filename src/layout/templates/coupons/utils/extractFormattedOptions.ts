import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { productTypes } from '../../../../utils/extractSelectOptionsFromArr'

export const extractFormattedProductOptions = (options: ISelectOption[]): ISelectOption[] => {
  const plans: ISelectOption[] = []
  const courses: ISelectOption[] = []
  const books: ISelectOption[] = []
  const trainings: ISelectOption[] = []

  options.forEach((option) => {
    if (option.label.includes(productTypes.plan)) {
      plans.push(option)
    }

    if (option.label.includes(productTypes.course)) {
      courses.push(option)
    }

    if (option.label.includes(productTypes.book)) {
      books.push(option)
    }

    if (option.label.includes(productTypes.training)) {
      trainings.push(option)
    }
  })
  // based on customer requirements products should be shown in this order plans - courses - books - trainings
  return [...plans, ...courses, ...books, ...trainings]
}
