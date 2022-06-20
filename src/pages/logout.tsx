import jwtDecode from 'jwt-decode'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { makeRemoteLogout } from '../application/factories/usecases/remote-logout-factory'
import { UserLogout } from '../domain/models/userLogout'
import { keys } from '../helpers/KeyConstants'
import { IToken } from '../interfaces/application/token'

export default function Logout() {
  const route = useRouter()
  const requestLogout = makeRemoteLogout()
  const userId = localStorage.getItem(keys.TOKEN)

  if (!!userId) {
    try {
      requestLogout.logout(new UserLogout(jwtDecode<IToken>(userId).id))
      localStorage.clear()
      route.push('/')
    } catch (err) {
      toast.error('Erro ao deslogar.')
    }
  }
}
