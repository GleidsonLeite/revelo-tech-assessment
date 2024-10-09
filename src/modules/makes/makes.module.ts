import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListMakesResolver } from './useCases/listMakes/listMakes.resolver'
import { ListMakesService } from './useCases/listMakes/listMakes.service'
import { GetMakeByIdService } from './useCases/getMakeById/getMakeById.service'
import { GetMakeByIdResolver } from './useCases/getMakeById/getMakeById.resolver'

@Module({
  providers: [
    PrismaService,
    ListMakesResolver,
    ListMakesService,
    GetMakeByIdService,
    GetMakeByIdResolver,
  ],
  exports: [],
})
export class MakesModule {}
