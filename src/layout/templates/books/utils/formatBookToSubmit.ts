import { IBook } from '../../../../domain/models/book'
import { onlyNums } from '../../../formatters/currenceFormatter'

function formatBookToSubmit(book: IBook): FormData {
  const formattedData: IBook = {
    ...book,
    price: Number(onlyNums(book.price)),
    discount: Number(onlyNums(book.discount)),
  }
  const {
    image,
    name,
    author,
    stock,
    price,
    discount,
    description,
    level,
    installments
  } = formattedData

  const formData = new FormData()

  formData.append('image', image)
  formData.append('name', String(name))
  formData.append('author', String(author))
  formData.append('stock', String(stock))
  formData.append('price', String(price))
  formData.append('discount', String(discount))
  formData.append('description', String(description))
  formData.append('level', String(level))
  formData.append('installments', String(installments))
  formData.append('active', String(false))

  return formData
}

export { formatBookToSubmit }
