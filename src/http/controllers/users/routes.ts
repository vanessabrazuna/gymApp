import { FastifyInstance } from "fastify"
import { register } from "./register"
import { authenticate } from "./authenticate"
import { profile } from "./profile"
import { verifyJWT } from "../../middlewares/verify-jwt"

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}