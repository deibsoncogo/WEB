import * as Yup from 'yup'

export const trainingFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
  teacherId: Yup.string().required('Professor é nescessário'),
  zoomUserId: Yup.string().required('Usuário zoom é nescessário'),
  price: Yup.number().required('Preço é nescessário').min(0.1, 'Preço deve ser maior que zero'),
  description: Yup.string().required('Descriçao é nescessário'),
  imagePreview: Yup.string().required('Imagem é nescessário'),
  installments: Yup.number()
    .required('Quantidade de parcelas é nescessário')
    .min(1, 'Quantidade de parcelas deve ser maior que 0'),
  categoryId: Yup.string().required('Selecione uma categoria'),
  trainingEndDate: Yup.date().required('Data é nescessária'),
  deactiveChatDate: Yup.date().required('Data é nescessária'),
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
