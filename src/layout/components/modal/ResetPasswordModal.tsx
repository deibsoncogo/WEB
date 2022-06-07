import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import CustomButton from '../buttons/CustomButton'
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
      'Senha deve conter no minímo 8 digitos, um caractere especial e uma letra maiúscula'
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
    console.log(error)

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
          <Input name='confirmPassword' label='Corfirmar Senha' type='password' />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <CustomButton
          type='submit'
          customClasses={['btn-primary', 'w-25']}
          title='Salvar'
          form='reset-password-form'
          disabled={loading}
        />

        <CustomButton
          type='button'
          customClasses={['btn-secondary', 'mb-5', 'px-20']}
          title='Cancelar'
          loading={loading}
          onClick={onRequestClose}
        />
      </Modal.Footer>
    </Modal>
  )
}

export { ResetPasswordModal }
