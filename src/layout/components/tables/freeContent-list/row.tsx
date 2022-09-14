import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IDeleteFreeContent } from '../../../../domain/usecases/interfaces/freeContent/deleteFreeContent'
import { KTSVG } from '../../../../helpers'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IRow {
  id: string
  title: string
  description: string
  contentType: string
  link: string | undefined
  articleContent: string | undefined
  deleteFreeContent: IDeleteFreeContent
  handleRefresher: () => void
}

export function Row({
  id,
  title,
  description,
  contentType,
  link,
  articleContent,
  deleteFreeContent,
  handleRefresher,
}: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  function formatText(articleContent?: string) {
    const textLimit = 100
    const textLimited = articleContent
      ? articleContent.substring(
          0,
          articleContent.length >= textLimit ? textLimit : articleContent.length
        )
      : ''
    return textLimited.length >= textLimit ? textLimited + ' ...' : textLimited
  }

  async function handleDeleteFreeContent() {
    try {
      setLoading(true)
      await deleteFreeContent.delete(id)
      setIsModalDeleteOpen(false)
      toast.success('Conteúdo excluído com sucesso.')
      handleRefresher()
    } catch {
      toast.error('Não foi possível deletar o conteúdo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{title}</span>
        </td>
        <td>
          <span
            className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'
            title={description}
          >
            {description}
          </span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{contentType}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{link}</span>
        </td>

        <td>
          <span
            className='text-dark fw-bold d-block fs-7'
            dangerouslySetInnerHTML={{ __html: formatText(articleContent) }}
          ></span>
        </td>

        <td className='text-end d-flex justify-content-start px-4'>
          <Tooltip content={'Editar'} rounded color='primary'>
            <Link href={`/freeContent/edit/${id}`}>
              <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
              </button>
            </Link>
          </Tooltip>

          <Tooltip content={'Excluir'} rounded color='primary'>
            <button
              onClick={() => {
                setIsModalDeleteOpen(true)
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </button>
          </Tooltip>
        </td>

        <ConfirmationModal
          isOpen={isModalDeleteOpen}
          loading={loading}
          onRequestClose={() => {
            setIsModalDeleteOpen(false)
          }}
          onConfimation={handleDeleteFreeContent}
          content='Você tem certeza que deseja excluir este conteúdo?'
          title='Deletar'
        />
      </tr>
    </>
  )
}
