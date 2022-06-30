interface IUserVerifyEmail {
  verifyUserEmail: (email: string) => Promise<void>
}
