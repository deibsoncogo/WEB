import * as Yup from 'yup'

export const bookFormSchema = Yup.object().shape({
  imagePreview: Yup.string().required('Imagem é necessária.'),
  name: Yup.string().required('Título é necessário'),
  author: Yup.string().required('Autor é necessário'),
  stock: Yup.number().required('Estoque é necessário'),
  price: Yup.number().required('Preço é necessário').min(0.1, 'Preço deve ser maior que zero'),
  discount: Yup.number().required('Desconto é necessária'),
  description: Yup.string().required('Descrição é necessária'),
  categoryId: Yup.string().required('Selecione uma categoria'),
  installments: Yup.number()
    .required('Quantidade de parcelas é nescessário')
    .min(1, 'Quantidade de parcelas deve ser maior que 0'),
})
