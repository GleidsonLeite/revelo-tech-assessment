import { describe, expect, vi, beforeEach } from 'vitest'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListMakesService } from './listMakes.service'

const mockMakes = [
  {
    id: 1,
    name: 'Honda',
    vehicleTypes: [{ name: 'Civic' }, { name: 'CRV' }],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Toyota',
    vehicleTypes: [{ name: 'Corolla' }, { name: 'Camry' }],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

describe('ListMakesService', () => {
  let service: ListMakesService
  let prisma: PrismaService

  beforeEach(() => {
    prisma = new PrismaService()
    service = new ListMakesService(prisma)

    vi.spyOn(prisma.client.make, 'count').mockResolvedValue(mockMakes.length)
    vi.spyOn(prisma.client.make, 'findMany').mockResolvedValue(mockMakes)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return a list of makes with pagination', async () => {
    const request = { page: 1, limit: 10 }
    const result = await service.execute(request)

    expect(prisma.client.make.count).toHaveBeenCalled()
    expect(prisma.client.make.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      include: { vehicleTypes: true },
    })

    expect(result.totalCount).toBe(2)
    expect(result.hasNextPage).toBe(false)
    expect(result.nodes).toEqual(mockMakes)
    expect(result.edges).toEqual([
      {
        cursor: Buffer.from(mockMakes[0].id.toString()).toString('base64'),
        node: mockMakes[0],
      },
      {
        cursor: Buffer.from(mockMakes[1].id.toString()).toString('base64'),
        node: mockMakes[1],
      },
    ])
  })

  it('should handle pagination correctly', async () => {
    const request = { page: 2, limit: 1 }
    const result = await service.execute(request)

    expect(prisma.client.make.findMany).toHaveBeenCalledWith({
      skip: 1,
      take: 1,
      include: { vehicleTypes: true },
    })

    expect(result.totalCount).toBe(2)
    expect(result.hasNextPage).toBe(false)
  })
})
