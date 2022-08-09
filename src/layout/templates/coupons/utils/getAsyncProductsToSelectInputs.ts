import { toast } from 'react-toastify'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { IGetAllAvailableProducts } from '../../../../domain/usecases/interfaces/product/getAllAvailableProducts'

type Params = {
  productName: string
  remoteGetAllAvailableProducts: IGetAllAvailableProducts
}

const getAsyncProductsToSelectInput = async ({
  productName,
  remoteGetAllAvailableProducts,
}: Params): Promise<ISelectOption[]> => {
  try {
    const { data } = await remoteGetAllAvailableProducts.getAll({
      name: productName,
      order: 'asc',
      page: 1,
      take: 5,
    })

    const productOptions: ISelectOption[] = data.map((product) => ({
      label: product.name,
      value: product.id,
    }))

    return productOptions
  } catch {
    toast.error('Falha em buscar categorias')
    return []
  }
}

export { getAsyncProductsToSelectInput }
