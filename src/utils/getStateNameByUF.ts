import { ISelectOption } from "../domain/shared/interface/SelectOption"

export const getStateNameByUF = (states: ISelectOption[], UF: string) => {
  let state = null
  states.every((option) => {
    if (option.value === UF) {
      state = option.label
      return false
    }
    return true
  })
  return state ?? ''
}
