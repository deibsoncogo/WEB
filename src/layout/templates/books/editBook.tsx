import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRequest } from '../../../application/hooks/useRequest'
import { appRoutes } from '../../../application/routing/routes'
import { IBook } from '../../../domain/models/book'
import { IEditBook } from '../../../domain/usecases/interfaces/book/editBook'
import { IGetBook, IGetBookParams } from '../../../domain/usecases/interfaces/book/getBook'
import { IGetCategories } from '../../../domain/usecases/interfaces/category/getCategories'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormEditBook } from '../../components/forms/books/edit'
import { bookFormSchema } from '../../components/forms/books/type'
import { FullLoading } from '../../components/FullLoading/FullLoading'
import { maskedToMoney } from '../../formatters/currenceFormatter'
import { getAsyncCategoiesToSelectInput } from '../trainings/utils/getAsyncCategoriesToSelectInput'
import { formatBookToSubmit } from './utils/formatBookToSubmit'

type EditBookPageProps = {
  remoteGetCategories: IGetCategories
  remoteGetBook: IGetBook
  remoteEditBook: IEditBook
}

function EditBookPageTemplate({
  remoteGetCategories,
  remoteGetBook,
  remoteEditBook
}: EditBookPageProps) {
  const router = useRouter()
  const { id: bookId } = router.query

  const [book, setBook] = useState<IBook>()
  const [loadingPageData, setLoadingPageData] = useState(true)

  const formRef = useRef<FormHandles>(null)

  const {
    makeRequest: editBook,
    data: bookEditedSuccessful,
    error: editBookError,
    loading: loadingBookEdition,
    cleanUp: cleanUpEditBook,
  } = useRequest<FormData>(remoteEditBook.edit)

  const {
    makeRequest: getBook,
    data: bookData,
    error: getBookError,
    cleanUp: getBookCleanUp,
  } = useRequest<IBook, IGetBookParams>(remoteGetBook.get)

  async function handleFormSubmit(data: IBook) {      
    const { error, success } = await applyYupValidation<IBook>(bookFormSchema, data)   

    if (success) { 
      const dataFormatted = formatBookToSubmit(data)
      dataFormatted.append('id', String(bookId))
      dataFormatted.append('active', String(book?.active))
      editBook(dataFormatted)
      return
    }

    if (error) {   
      formRef?.current?.setErrors(error)
    }
  }

  const handleGetAsyncCategoriesToSelectInput = async (categoryName: string) => {
    return getAsyncCategoiesToSelectInput({ categoryName, remoteGetCategories })
  }

  const handleCancel = () => {
    router.push(appRoutes.BOOKS)
  }

  useEffect(() => {
    getBook({ id: bookId as string })
  }, [])

  useEffect(() => {
    if (bookEditedSuccessful) {
      toast.success('Livro Editado Com Sucesso')
      cleanUpEditBook()
      router.push(appRoutes.BOOKS)
    }

    if (bookData) {
      setBook(bookData)
      setLoadingPageData(false)
      getBookCleanUp()
    }
  }, [bookEditedSuccessful, bookData])

  useEffect(() => {
    if (getBookError) {
      toast.error(getBookError)
      cleanUpEditBook()
      router.push(appRoutes.BOOKS)
    }

    if (editBookError) {
      toast.error(editBookError)
      setLoadingPageData(false)
    }
  }, [editBookError, getBookError])

  useEffect(() => {
    if (book) {
      const {
        name,
        author,
        stock,
        price,
        discount,        
        description,
        category,
        imageUrl
      } = book

      formRef.current?.setFieldValue('name', name)
      formRef.current?.setFieldValue('description', description)
      formRef.current?.setFieldValue('author', author)
      formRef.current?.setFieldValue('categoryId', category.id)
      formRef.current?.setFieldValue('categoryId-label', category.name)
      formRef.current?.setFieldValue('stock', stock)
      formRef.current?.setFieldValue('price', maskedToMoney(price))
      formRef.current?.setFieldValue('discount', maskedToMoney(discount))
      formRef.current?.setFieldValue('imagePreview', imageUrl)
    }
  }, [book])

  return (
    <>
      {loadingPageData && <FullLoading />}
      <FormEditBook 
        ref={formRef}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel} 
        searchCategories={handleGetAsyncCategoriesToSelectInput}
        loadingSubmit={loadingBookEdition}      
      />
    </>
  )
}

export { EditBookPageTemplate }
