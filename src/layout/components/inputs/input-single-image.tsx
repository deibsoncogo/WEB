import { ChangeEvent, useRef, useEffect, useCallback, useState, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

interface IInputImage extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function InputSingleImage({ name, ...rest }: IInputImage) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputRefPreview = useRef<HTMLInputElement>(null)

  const { fieldName, registerField, error, clearError } = useField(name)

  const {
    fieldName: filedNamePreview,
    registerField: registerFiledPreview,
    error: errorPreview,
    clearError: clearErrorPreview,
  } = useField(`${name}Preview`)

  const [preview, setPreview] = useState<string>('')

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setPreview('')
      return
    }
    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
    clearErrorPreview()
  }, [])

  const handleRemoveFile = () => {
    setPreview('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.files[0]
      },
      clearValue(ref: HTMLInputElement) {
        ref.value = ''
        setPreview('')
      },
    })
  }, [fieldName, registerField])

  useEffect(() => {
    registerFiledPreview({
      name: filedNamePreview,
      ref: inputRefPreview,
      getValue: (ref) => ref.current.value,
      setValue(_: any, value: any) {
        setPreview(value)
      },
      clearValue() {
        setPreview('')
      },
    })
  }, [filedNamePreview, registerFiledPreview])

  return (
    <div className='fv-row mb-7'>
      {preview && (
        <div className='rounded bg-gray-300 min-w-250px min-h-200px mw-250px mh-200px border border-gray-400'>
          <div>
            {preview && (
              <img
                src={preview}
                alt='Preview'
                className='rounded min-w-250px min-h-200px mw-250px mh-200px'
                style={{
                  objectFit: 'contain',
                }}
              />
            )}
          </div>
        </div>
      )}
      <div className='mb-1'>
        <label htmlFor='upload-photo' className='btn btn-primary mt-5'>
          <input
            type='text'
            ref={inputRefPreview}
            hidden
            name={`${name}Preview`}
            onChangeCapture={clearErrorPreview}
            value={preview}
          />
          <input
            id='upload-photo'
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handlePreview}
            className='mt-5 d-none'
            onChangeCapture={clearError}
            {...rest}
            name={name}
          />
          Selecionar imagem
        </label>
        {preview && (
          <button onClick={handleRemoveFile} className='btn btn-primary ms-5 mt-5'>
            Remover imagem
          </button>
        )}
      </div>
      {(error || errorPreview) && <span className='text-danger'>{error || errorPreview}</span>}
    </div>
  )
}