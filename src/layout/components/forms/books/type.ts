import { IBook } from './../../../../domain/models/book';
import * as Yup from 'yup'

export const bookFormSchema = (data: IBook) => Yup.object().shape({
  imagePreview: Yup.string().required('Imagem é necessária'),
  name: Yup.string().required('Título é necessário'),
  author: Yup.string().required('Autor é necessário'),
  stock: Yup.number()
    .min(1, 'Quantidade de estoque deve ser maior que zero')
    .required('Estoque é necessário'),
  price: Yup.number().required('Preço é necessário').min(0.1, 'Preço deve ser maior que zero'),
  discount: Yup.number().test(
    {name: 'validation',
    message: 'Desconto deve ser menor que preço',
    test: (value) => value?  parseFloat(data.discount+'') < parseFloat(data.price+'') : true}),
  categoryId: Yup.string().required('Selecione uma categoria'),
  installments: Yup.number()
    .required('Quantidade de parcelas é necessário')
    .min(1, 'Quantidade de parcelas deve ser maior que zero'),
})
