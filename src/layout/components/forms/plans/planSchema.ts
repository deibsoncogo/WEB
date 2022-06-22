import * as Yup from 'yup'

export const planFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
})
