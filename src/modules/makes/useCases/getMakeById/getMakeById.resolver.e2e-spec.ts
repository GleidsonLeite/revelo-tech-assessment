import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'

describe('Get Make By ID (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await prisma.client.make.create({
      data: {
        id: 1,
        name: 'Honda',
        vehicleTypes: {
          createMany: {
            data: [
              { name: 'Sedan', id: 1 },
              { name: 'SUV', id: 2 },
            ],
          },
        },
      },
    })

    await app.init()
  })

  afterAll(async () => {
    await prisma.client.vehicleType.deleteMany()
    await prisma.client.make.deleteMany()
    await app.close()
  })

  it('[Query] getMakeById - Success', async () => {
    const query = `{
      getMakeById(id: ${1}) {
        id
        name
        vehicleTypes {
          name
        }
      }
    }`

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(response.status).toBe(200)
    expect(response.body.data.getMakeById).toEqual({
      id: 1,
      name: 'Honda',
      vehicleTypes: [{ name: 'Sedan' }, { name: 'SUV' }],
    })
  })

  it('[Query] getMakeById - Not Found', async () => {
    const query = `{
      getMakeById(id: 999) {
        id
        name
        vehicleTypes {
          name
        }
      }
    }`

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(response.status).toBe(200)
    expect(response.body.errors[0].message).toBe('Make with id 999 not found')
    expect(response.body.data.getMakeById).toBeNull()
  })
})
