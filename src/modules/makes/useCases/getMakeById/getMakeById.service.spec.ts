import { describe, expect, it, vi, beforeEach } from 'vitest'
import { PrismaService } from 'src/prisma/prisma.service'
import { GetMakeByIdService } from './getMakeById.service'

describe('GetMakeByIdService', () => {
  let service: GetMakeByIdService
  let prisma: PrismaService

  beforeEach(() => {
    prisma = new PrismaService()
    service = new GetMakeByIdService(prisma)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should retrieve a make by ID with its vehicle types', async () => {
    const makeId = 1
    const mockMake = {
      id: makeId,
      name: 'Honda',
      vehicleTypes: [{ name: 'Civic' }, { name: 'CRV' }],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.spyOn(prisma.client.make, 'findUnique').mockResolvedValue(mockMake)

    const result = await service.execute(makeId)

    expect(prisma.client.make.findUnique).toHaveBeenCalledWith({
      where: { id: makeId },
      include: { vehicleTypes: true },
    })
    expect(result).toEqual(mockMake)
  })

  it('should handle cases where the make is not found', async () => {
    const makeId = 999
    vi.spyOn(prisma.client.make, 'findUnique').mockResolvedValue(null)

    const result = await service.execute(makeId)

    expect(prisma.client.make.findUnique).toHaveBeenCalledWith({
      where: { id: makeId },
      include: { vehicleTypes: true },
    })
    expect(result).toBeNull()
  })
})
