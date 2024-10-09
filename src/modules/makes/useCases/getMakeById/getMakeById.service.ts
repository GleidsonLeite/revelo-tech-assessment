import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GetMakeByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: number) {
    return this.prisma.client.make.findUnique({
      where: {
        id,
      },
      include: {
        vehicleTypes: true,
      },
    })
  }
}
