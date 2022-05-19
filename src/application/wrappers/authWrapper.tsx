import { useRouter } from 'next/router'
import { professorRoutes } from '../routing/routes'
import { useEffect, useState } from 'react'
import { IToken } from '../../interfaces/application/token'
import jwtDecode from 'jwt-decode'

const roles = { ADMIN: 'admin', TEACHER: 'teacher' }

export function AuthWrapper({ children }: any) {
  const [isAuthenticated, setIsAuthenticate] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [rotas, setRotas] = useState('')

  const route = useRouter()
  const currentRoute = route.pathname

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const values = jwtDecode<IToken>(token)
      if (parseInt(values.exp) < Date.now() / 1000) {
        localStorage.clear()
        return
      } else {
        setIsAuthenticate(true)
        switch (values.role) {
          case roles.ADMIN:
            setHasPermission(true)
            return
          case roles.TEACHER:
            professorRoutes.includes(currentRoute) ? setHasPermission(true) : route.push('/')
            return
          default:
            setHasPermission(false)
        }
      }
    } else {
      route.push('/')
    }
  }, [rotas])

  if (rotas !== currentRoute || !rotas) setRotas(currentRoute)

  return isAuthenticated && hasPermission ? children : null
}
