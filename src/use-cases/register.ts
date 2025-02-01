import bcrypt from "bcryptjs"
import { User } from "@prisma/client"
import { UsersRepository } from "src/repositories/users.repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

const { hash } = bcrypt

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserCaseResponse {
  user: User,
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUserCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }  
}