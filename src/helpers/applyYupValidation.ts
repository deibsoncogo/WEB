import * as Yup from 'yup'

type ErrorObject = {
  [key: string]: string
}

interface ApplyType<T> {
  success: T | undefined
  error: ErrorObject | undefined
}

export async function applyYupValidation<SchemaType>(
  schema: Yup.AnySchema,
  data: SchemaType
): Promise<ApplyType<SchemaType>> {
  const verification: ApplyType<SchemaType> = { error: undefined, success: undefined }

  try {
    await schema.validate(data, { abortEarly: false })
    verification.success = data
  } catch (err) {
    const validationErrors: ErrorObject = {}

    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path) {
          validationErrors[error.path] = error.message
        }
      })
    }

    verification.error = validationErrors
  }

  return verification
}
