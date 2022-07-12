interface IUserVerifyCPF {
  verifyUserCPF: (cpf: string) => Promise<boolean>
}
