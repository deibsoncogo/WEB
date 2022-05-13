import { useEffect, useState } from 'react'
import { api } from '../services/api'

const useLoadData = (url: string) => {
  const [users, setUsers] = useState<any[]>([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('user')
      .then(({ data }) => {
        setUsers(data.data)
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])
  return { users, error, loading }
}

export { useLoadData }
