import { hash } from "bcryptjs"
import { prisma } from "src/lib/prisma"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(
    private usersRepository: any,
  ) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error("Usuário com o mesmo e-mail já existe")
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }  
}