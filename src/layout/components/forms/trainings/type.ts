import * as Yup from 'yup'

export const trainingFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
  teacherId: Yup.string().required('Professor é nescessário'),
  price: Yup.number().required('Preço é nescessário'),
  description: Yup.string().required('Descriçao é nescessário'),
  categoryId: Yup.string().required('Selecione uma categoria'),
  trainingEndDate: Yup.date().required('Data é nescessária'),
  deactiveChatDate: Yup.date().required('Data é nescessária'),
  streamings: Yup.array().of(
    Yup.object().shape({
      hour: Yup.string(),
      date: Yup.date(),
    })
  ),
})

export interface IStreamList {
  date: string
  hour: string
  start: boolean
}
