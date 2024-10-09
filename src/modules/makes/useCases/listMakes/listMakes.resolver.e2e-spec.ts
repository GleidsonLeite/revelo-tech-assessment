import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('List Makes (E2E)', () => {
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

  test('[Query] listMakes', async () => {
    const query = `{
            listMakes(limit: 10, page: 1) {
              totalCount
              nodes {
                id
                name
                vehicleTypes {
                  name
                }
              }
            }
          }`
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(response.status).toBe(200)
    expect(response.body.data.listMakes.totalCount).equal(1)
  })
})
