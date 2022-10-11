import * as Yup from 'yup'

export const freePlanFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é necessário'),
  description: Yup.string().required('Descrição é necessária'),
  imagePreview: Yup.string().required('Imagem é necessária'),
  categoryId: Yup.string().required('Selecione uma categoria'),
  intervalAccess: Yup.number().required('Acesso ao Conteúdo é necessário'),
})
