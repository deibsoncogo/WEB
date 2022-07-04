import * as Yup from 'yup'

export const trainingFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é necessário'),
  teacherId: Yup.string().required('Professor é necessário'),
  zoomUserId: Yup.string().required('Usuário zoom é necessário'),
  price: Yup.number().required('Preço é necessário').min(0.1, 'Preço deve ser maior que zero'),
  description: Yup.string().required('Descriçao é necessária'),
  imagePreview: Yup.string().required('Imagem é necessária'),
  installments: Yup.number()
    .required('Quantidade de parcelas é necessário')
    .min(1, 'Quantidade de parcelas deve ser maior que 0'),
  categoryId: Yup.string().required('Selecione uma categoria'),
  trainingEndDate: Yup.date().required('Data é necessária'),
  deactiveChatDate: Yup.date().required('Data é necessária'),
  streamings: Yup.array().of(
    Yup.object().shape({
      hour: Yup.string(),
      date: Yup.string(),
    })
  ),
})

export interface IStreamList {
  date: string
  hour: string
  start: boolean
  dateISO: string
}
