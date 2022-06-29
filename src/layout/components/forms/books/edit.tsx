import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { forwardRef } from 'react'
import { IBook } from '../../../../domain/models/book'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { onlyNums } from '../../../formatters/currenceFormatter'
import { Button } from '../../buttons/CustomButton'
import { Input, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { InputSingleImage } from '../../inputs/input-single-image'
import { SelectAsync } from '../../inputs/selectAsync'

type FormEditBookProps = {
  onSubmit: (data: any) => void
  onCancel: () => void
  searchCategories: (categoryName: string) => Promise<ISelectOption[]>
  loadingSubmit: boolean
}

const FormEditBook = forwardRef<FormHandles, FormEditBookProps>((props, ref) => {
  const {
    onSubmit,
    onCancel,
    searchCategories,
    loadingSubmit,
  } = props

  const handleSubmit = async (data: IBook) => {
    onSubmit({
      ...data,
      price: onlyNums(data.price),
    })
  }

  return (
     <Form className='form' ref={ref} onSubmit={handleSubmit}>
       <div className='d-flex flex-row gap-5 w-100'>
         <div className='w-100'>
           <h3 className='mb-5'>Dados do Livro</h3>
               <div className='d-flex justify-content-start flex-row '>
                 <div
                   className='d-flex justify-content-center flex-column w-100'
                   style={{
                     marginRight: '10%',
                   }}
                 >
                   <InputSingleImage name='image' />
                   <Input name='name' label='Título' type='text' />
                   <Input name='author' label='Autor' type='text' />
                   <Input name='stock' label='Estoque' type='number' />
                   <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
                   <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
                 </div>
                 <div className='d-flex justify-content-start flex-column w-100'>
                   <TextArea
                     name='description'
                     label='Descrição'
                     rows={10}
                   />

                    <SelectAsync
                      searchOptions={searchCategories}
                      name='categoryId'
                      label='Categoria'
                      classes='h-75px'
                      placeholder='Digite o nome da categoria'
                    />
                 </div>
               </div>
               <div className='mb-10 d-flex justify-content-end'>
                <Button
                  title='Cancelar'
                  type='button'
                  customClasses={['btn-secondary', 'ms-auto', 'me-10']}
                  onClick={onCancel}
                />
                <Button
                  type='submit'
                  title='Salvar'
                  customClasses={['btn-primary']}
                  loading={loadingSubmit}
                  onClick={onSubmit}
                />
               </div>
         </div>
       </div>


        {/* <ActionModal
           action={handleActionButton}
           isOpen={isOpenModal}
           modalTitle='Criar'
           message='Você tem certeza que deseja atualizar esse livro?'
           onRequestClose={() => {
             setIsOpenModal(false)
           }}
         /> */}
     </Form>
  )
})

FormEditBook.displayName = 'FormEditBook'

export { FormEditBook }

// import { useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/router'

// import * as Yup from 'yup'

// import { Form } from '@unform/web'
// import { FormHandles } from '@unform/core'

// import { Input, Select, TextArea } from '../../inputs'
// import { ActionModal } from '../../modals/action'

// import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
// import { ICategory } from '../../../../interfaces/api-response/categoryResponse'

// import { IFormBook } from '../../../../interfaces/forms/create-book'
// import { IGetBooks } from '../../../../domain/usecases/interfaces/book/getBooks'

// import { IBookResponse } from '../../../../interfaces/api-response/bookResponse'
// import { currencyFormatter } from '../../../../utils/currencyFormatter'
// import { toast } from 'react-toastify'

// import { Loading } from '../../loading/loading'
// import { InputSingleImage } from '../../inputs/input-single-image'
// import { maskedToMoney, onlyNums } from '../../../formatters/currenceFormatter'
// import { IEditBook } from '../../../../domain/usecases/interfaces/book/editBook'
// import { IGetBook } from '../../../../domain/usecases/interfaces/book/getBook'

// type FormCreateBookProps = {
//   getAllCategories: IGetCategoriesNoPagination
//   editBook: IEditBook
//   getBookById: IGetBook
//   id: string | undefined | string[]
// }

// export function FormEditBook({
//   getAllCategories,
//   id,
//   getBookById,
//   editBook,
// }: FormCreateBookProps) {
//   const router = useRouter()
//   const formRef = useRef<FormHandles>(null)
//   const [isOpenModal, setIsOpenModal] = useState(false)
//   const [bookData, setBookData] = useState<FormData>()

//   const [loading, setLoading] = useState(false)

//   const [defaultValue, setDefaultValue] = useState({})
//   const [categories, setCategories] = useState<ICategory[]>()

//   const [book, setBook] = useState<IBookResponse>()

//   async function handleCreateBook(data: IFormBook) {
//     const formData = new FormData()

//     formData.append('image', data.image)
//     formData.append('name', String(data.name))
//     formData.append('author', String(data.author))
//     formData.append('stock', String(data.stock))
//     formData.append('price', onlyNums(String(data.price)))
//     formData.append('discount', onlyNums(String(data.discount)))
//     formData.append('description', String(data.description))
//     formData.append('categoryId', String(data.categoryId))
//     formData.append('id', String(data.id))

//     setBookData(formData)
//   }

//   const getCategories = async () => {
//     if (id)
//       await getAllCategories.get().then((res) => {
//         setCategories(res)
//       })
//   }

//   const getBook = async () => {
//     if (id)
//       await getBookById.get({ id }).then((res: any) => {
//         setBook(res)
//       })
//   }

//   useEffect(() => {
//     try {
//       setLoading(true)
//       getBook()
//       getCategories()      
//       setLoading(false)
//     } catch (error) {
//       toast.error('Erro ao carregar os dados.')
//     }
//   }, [getBookById, getAllCategories])

//   useEffect(() => {
//     formRef.current?.setFieldValue('imagePreview', book?.imageUrl)
//   }, [book])

//   async function handleFormSubmit(data: IFormBook) {
//     if (!formRef.current) throw new Error()

//     if (id) data.id = id as string

//     try {
//       formRef.current.setErrors({})

//       const schema = Yup.object().shape({
//         imagePreview: Yup.string().required('Imagem é necessária.'),
//         name: Yup.string().required('Título é necessário'),
//         author: Yup.string().required('Autor é necessário'),
//         stock: Yup.number().required('Estoque é necessário'),
//         price: Yup.string().required('Preço é necessário'),
//         discount: Yup.string().required('Desconto é necessária'),
//         description: Yup.string().required('Descrição é necessária'),
//         categoryId: Yup.string().required('Selecione uma categoria'),
//         id: Yup.string().required('Id é necessário.'),
//       })

//       await schema.validate(data, { abortEarly: false }).then((res: any) => {
//         setIsOpenModal(true)

//         handleCreateBook(res)
//       })
//     } catch (err) {
//       toast.error('Erro ao validar dados')
//       const validationErrors = {}
//       if (err instanceof Yup.ValidationError) {
//         err.inner.forEach((error) => {
//           // @ts-ignore
//           validationErrors[error.path] = error.message
//         })
//         formRef.current.setErrors(validationErrors)
//       }
//     }
//   }

//   async function handleActionButton() {
//     if (bookData)
//       try {
//         await editBook.edit(bookData).then(() => router.push('/books'))        
        
//         setIsOpenModal(false)
//         toast.success('Livro atualizado com sucesso!')
//       } catch (error) {
//         setIsOpenModal(false)
//         toast.error('Erro ao atualizar livro')
//       }
//   }

//   return (
//     <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
//       <div className='d-flex flex-row gap-5 w-100'>
//         <div className='w-100'>
//           <h3 className='mb-5'>Dados do Livro</h3>
//           {book && !loading ? (
//             <>
//               <div className='d-flex justify-content-start flex-row '>
//                 <div
//                   className='d-flex justify-content-center flex-column w-100'
//                   style={{
//                     marginRight: '10%',
//                   }}
//                 >
//                   <InputSingleImage name='image' />
//                   <Input name='name' label='Título' type='text' defaultValue={book.name} />
//                   <Input name='author' label='Autor' type='text' defaultValue={book.author} />
//                   <Input name='stock' label='Estoque' type='number' defaultValue={book.stock} />
//                   <Input
//                     name='price'
//                     label='Preço'
//                     type='text'
//                     placeholderText='R$'
//                     onChange={() => currencyFormatter('price', formRef.current)}
//                     defaultValue={maskedToMoney(book.price)}
//                   />
//                   <Input
//                     name='discount'
//                     label='Desconto'
//                     type='text'
//                     placeholderText='R$'
//                     onChange={() => currencyFormatter('discount', formRef.current)}
//                     defaultValue={maskedToMoney(book.discount)}
//                   />
//                 </div>
//                 <div className='d-flex justify-content-start flex-column w-100'>
//                   <TextArea
//                     name='description'
//                     label='Descrição'
//                     rows={10}
//                     defaultValue={book.description}
//                   />

//                   <Select name='categoryId' label='Categorias'>
//                     <option value=''>Selecione</option>
//                     {book.category && (
//                       <option key={book.id} value={book.category.id} selected>
//                         {book.category.name}
//                       </option>
//                     )}

//                     {categories &&
//                       categories.map((option) =>
//                         option.name !== book.category.name ? (
//                           <option key={option.id} value={option.id}>
//                             {option.name}
//                           </option>
//                         ) : null
//                       )}
//                   </Select>
//                 </div>
//               </div>
//               <div className='mb-10 d-flex justify-content-end'>
//                 <button
//                   type='button'
//                   onClick={() => {
//                     router.push('/books')
//                   }}
//                   style={{ marginRight: '10px' }}
//                   className='btn btn-lg btn-secondary w-150px mr-10'
//                 >
//                   Cancelar
//                 </button>

//                 <button type='submit' className='btn btn-lg btn-primary w-180px'>
//                   Salvar
//                 </button>
//               </div>
//             </>
//           ) : (
//             <Loading />
//           )}
//         </div>
//       </div>

//       {!loading && (
//         <ActionModal
//           action={handleActionButton}
//           isOpen={isOpenModal}
//           modalTitle='Criar'
//           message='Você tem certeza que deseja atualizar esse livro?'
//           onRequestClose={() => {
//             setIsOpenModal(false)
//           }}
//         />
//       )}
//     </Form>
//   )
// }
