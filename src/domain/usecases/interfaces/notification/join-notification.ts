type Response = {
  accessToken: string
}

export interface IJoinNotification {
  join: () => Promise<Response>
}
