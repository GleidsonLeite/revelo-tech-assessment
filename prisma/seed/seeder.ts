import { PrismaClient } from '@prisma/client'
import { fetchMakesXML, fetchVehicleTypesXML } from './apiClient'
import {
  transformMakesToJSON,
  transformVehicleTypesToJSON,
} from './transformer'

const prisma = new PrismaClient()
const BATCH_SIZE = 10

export async function seedDatabase(): Promise<void> {
  await prisma.vehicleType.deleteMany()
  await prisma.make.deleteMany()

  const makesXML = await fetchMakesXML()
  const makes = await transformMakesToJSON(makesXML)

  const makeBatches = batchArray(makes, BATCH_SIZE)

  for (const batch of makeBatches) {
    await Promise.all(
      batch.map(async ({ makeId, makeName }) => {
        const vehicleTypesXML = await fetchVehicleTypesXML(makeId)
        const vehicleTypes = await transformVehicleTypesToJSON(vehicleTypesXML)

        await prisma.make.create({
          data: {
            id: makeId,
            name: makeName,
            vehicleTypes: {
              createMany: {
                data: vehicleTypes.map((vehicleType) => ({
                  name: vehicleType.VehicleTypeName,
                })),
              },
            },
          },
        })
      }),
    )
  }

  await prisma.$disconnect()
  console.log('Database seeded successfully!')
}

export function batchArray<T>(array: T[], size: number): T[][] {
  const batches: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    batches.push(array.slice(i, i + size))
  }
  return batches
}
