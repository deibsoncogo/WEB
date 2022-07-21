import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import React, { useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from '../buttons/CustomButton'
import { Input } from '../inputs'
import { isStrongPassword } from '../../../domain/shared/reggexPatterns/isPasswordStrong'
import { applyYupValidation } from '../../../helpers/applyYupValidation'

export type IResetPassowrdForm = {
  password: string
  confirmPassword: string
}

type ResetPasswordModalProps = {
  loading: boolean
  isOpen: boolean
  onRequestClose: () => void
  resetPassword: (params: IResetPassowrdForm) => void
}

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Senha é obrigatório')
    .matches(
      isStrongPassword,
      'A senha deve ter no mínimo 8 caracteres e conter no mínimo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas não correspondem')
    .required('Confirmação de senha é obrigatório'),
})

function ResetPasswordModal({
  onRequestClose,
  isOpen,
  resetPassword,
  loading,
}: ResetPasswordModalProps) {
  const resetUserPasswordForm = useRef<FormHandles>(null)

  const handleResetPasswordFormSubmit = async (data: IResetPassowrdForm) => {
    const { error, success } = await applyYupValidation<IResetPassowrdForm>(schema, data)    

    if (success) {
      resetPassword(data)
    }

    if (error) {
      resetUserPasswordForm?.current?.setErrors(error)
    }
  }

  return (
    <Modal show={isOpen} onHide={onRequestClose} className='mt-20'>
      <Modal.Header closeButton>
        <Modal.Title>Redefinir Senha</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          className='form'
          onSubmit={handleResetPasswordFormSubmit}
          ref={resetUserPasswordForm}
          id='reset-password-form'
        >
          <Input name='password' label='Nova Senha' type='password' />
          <Input name='confirmPassword' label='Confirmar Senha' type='password' />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type='button'
          title='Cancelar'
          onClick={onRequestClose}
          size='sm'
          customClasses={['btn-secondary', 'mb-5', 'px-20']}
        />

        <Button
          type='submit'
          title='Salvar'
          form='reset-password-form'
          disabled={loading}
          loading={loading}
          size='sm'
          customClasses={['btn-primary', 'mb-5', 'px-20']}
        />
      </Modal.Footer>
    </Modal>
  )
}

export { ResetPasswordModal }
