import { ProductType } from '../domain/models/product'
import { ISelectOption } from '../domain/shared/interface/SelectOption'

type ItemType = {
  id?: string
  name: string
  type?: ProductType
}

export const productTypes = {
  [ProductType.Book]: 'Livro',
  [ProductType.Course]: 'Curso',
  [ProductType.Plan]: 'Plano',
  [ProductType.Training]: 'Treinamento',
  [ProductType.Room]: 'Room',
}

export function extractSelectOptionsFromArr(
  arr: Array<ItemType>,
  withType?: boolean
): ISelectOption[] {
  if (withType) {
    return arr.map((value) => ({
      label: `[${productTypes[value.type as ProductType]}] ${value.name}`,
      value: String(value.id),
    }))
  }
  return arr.map((value) => ({ label: value.name, value: String(value.id) }))
}
