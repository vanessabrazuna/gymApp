import { Gym } from "@prisma/client"
import { GymsRepository } from "src/repositories/gyms-repository"

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUserCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(
    private gymsRepository: GymsRepository,
  ) {}

  async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUserCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }  
}