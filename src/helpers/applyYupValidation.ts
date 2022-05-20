import * as Yup from 'yup'

type ErrorObject = {
  [key: string]: string
}

export async function applyYupValidation<SchemaType, Data = {}>(
  schema: Yup.AnySchema,
  data: Data
): Promise<Data | ErrorObject> {
  try {
    await schema.validate(data, { abortEarly: false })
    return data
  } catch (err) {
    const validationErrors: ErrorObject = {}
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path) {
          validationErrors[error.path] = error.message
        }
      })
    }
    return validationErrors
  }
}
