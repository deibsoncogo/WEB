import { useState } from 'react'

export function useRequest<ReturnData, Params = {}>(request: any) {
  const [error, setError] = useState<string | null>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ReturnData | undefined>()

  const makeRequest = async (params?: Params) => {
    if (loading) {
      return
    }

    setData(undefined)
    setError(undefined)

    try {
      setLoading(true)
      const dataFromAPI = await request(params)
      setData(dataFromAPI)
    } catch (e: any) {
      if (e?.messages) {
        setError(e?.messages[0])
        return
      }

      if (e?.message) {
        setError(e?.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const cleanError = () => {
    setError(null)
  }

  const cleanUp = () => {
    setData(undefined)
    setError(null)
  }

  return { data, error, loading, cleanError, makeRequest, cleanUp }
}
