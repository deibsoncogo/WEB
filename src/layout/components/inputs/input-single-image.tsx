/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useRef, useEffect, useCallback, useState, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

interface IInputImage extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function InputSingleImage({ name, ...rest }: IInputImage) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, registerField, error } = useField(name)
  const [preview, setPreview] = useState<string | null>(null)

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setPreview(null)
      return
    }
    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
  }, [])

  const handleRemoveFile = () => {
    setPreview(null)
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
      setValue(_: any, value: any) {
        setPreview(value)
      },
      clearValue(ref: HTMLInputElement) {
        ref.value = ''
        setPreview(null)
      },
    })
  }, [fieldName, registerField])

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
  )
}
