import { hash } from "bcryptjs"
import { prisma } from "src/lib/prisma"
import { PrimaUsersRepository } from "src/repositories/prisma-users-repository"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error("Usuário com o mesmo e-mail já existe")
  }

  const prismaUserRepository = new PrimaUsersRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  })
}