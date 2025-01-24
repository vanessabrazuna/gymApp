export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Usuário com o mesmo e-mail já existe')
  }
}