import io from 'socket.io-client'
import { extractAPIURL } from './extractAPIURL'

export function getSocketConnection(namespace: string, room: string) {
  return io(`${extractAPIURL(process.env.API_URL)}/${namespace}`, {
    transports: ['websocket'],
    auth: (cb) => {
      cb({ token: localStorage.getItem('access_token'), room })
    },
  })
}
