import * as Yup from 'yup'

export const freePlanFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é necessário'),
  description: Yup.string().required('Descrição é necessária'),
  imagePreview: Yup.string().required('Imagem é necessária'),
  categoryId: Yup.string().required('Selecione uma categoria'),
  intervalAccess: Yup.number()
    .integer('Acesso ao conteúdo deve ser um número inteiro')
    .min(1, 'Acesso ao conteúdo deve ser maior que zero')
    .required('Acesso ao Conteúdo é necessário'),
})
