import { FormHandles } from '@unform/core'
import { useRef } from 'react'
import { IPlan } from '../../../domain/models/plan'
import { applyYupValidation } from '../../../helpers/applyYupValidation'
import { FormCreatePlan } from '../../components/forms/plans/create'
import { planFormSchema } from '../../components/forms/plans/planSchema'

const CreatePlanPageTemplate = () => {
  const createPlanFormRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: IPlan) {
    const { error, success } = await applyYupValidation<IPlan>(planFormSchema, data)

    if (error) {
      createPlanFormRef?.current?.setErrors(error)

      return
    }

    if (success) {
      console.log(success)
    }
  }
  return <FormCreatePlan ref={createPlanFormRef} onSubmit={handleFormSubmit} />
}

export { CreatePlanPageTemplate }
