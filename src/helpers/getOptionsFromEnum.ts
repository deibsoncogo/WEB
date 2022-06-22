import { ISelectOption } from '../domain/shared/interface/SelectOption'

export function getOptionsFromEnum(dataEnum: any): ISelectOption[] {
  const values = Object.values(dataEnum)

  console.log(Object.keys(dataEnum))

  console.log(values)

  return []
}
