import { IPlan } from '../../../../domain/models/plan'

function formatTrainingToSubmit(plan: IPlan): FormData {
  const { image } = plan
  const formData = new FormData()

  if (image) {
    formData.append('image', image)
  }

  return formData
}

export { formatTrainingToSubmit }
