import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"

import { AuthenticateUseCase } from "src/use-cases/authenticate"
import { PrimaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrimaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}