import { ChangeEvent, useRef, useEffect, useCallback, useState, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

interface IInputImage extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function InputImage({ name, ...rest }: IInputImage) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [preview, setPreview] = useState(defaultValue)

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setPreview(null)
      return
    }
    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = ''
        setPreview(null)
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value)
      },
    })
  }, [fieldName, registerField])

  return (
    <div className='fv-row mb-7'>

    { preview &&
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
    }

      {error && <span className='text-danger'>{error}</span>}

      <label htmlFor='upload-photo' className='btn btn-primary mt-5'>
        <input
          id='upload-photo'
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={handlePreview}
          className='mt-5 d-none'
          {...rest}
        />
        Selecionar imagem
      </label>
      {preview &&
      <button
        onClick={() => {
          setPreview(null)
        }}
        className='btn btn-primary ms-5 mt-5'
      >
        Remover imagem
      </button>
     }
    </div>
  )
}
