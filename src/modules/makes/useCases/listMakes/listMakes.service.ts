import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

interface IRequest {
  page: number
  limit: number
}

@Injectable()
export class ListMakesService {
  constructor(private prisma: PrismaService) {}

  async execute({ limit, page }: IRequest) {
    const skip = (page - 1) * limit

    const totalCount = await this.prisma.client.make.count()

    const makes = await this.prisma.client.make.findMany({
      skip,
      take: limit,
      include: {
        vehicleTypes: true,
      },
    })

    const edges = makes.map((make) => ({
      cursor: Buffer.from(make.id.toString()).toString('base64'),
      node: make,
    }))

    const hasNextPage = skip + limit < totalCount
    return {
      edges,
      nodes: makes,
      totalCount,
      hasNextPage,
    }
  }
}
