import { ISelectOption } from '../domain/shared/interface/SelectOption'

export function extractSelectOptionsFromArr(
  arr: Array<{ name: string; id?: string }>
): ISelectOption[] {
  return arr.map((value) => ({ label: value.name, value: String(value.id) }))
}
