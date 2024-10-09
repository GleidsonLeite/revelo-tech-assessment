import { Args, Query, Resolver } from '@nestjs/graphql'
import { Make } from 'src/graphql/make.type'
import { GetMakeByIdService } from './getMakeById.service'
import { NotFoundException } from '@nestjs/common'

@Resolver(() => Make)
export class GetMakeByIdResolver {
  constructor(private readonly getMakeByIdService: GetMakeByIdService) {}

  @Query(() => Make, { nullable: true })
  async getMakeById(
    @Args('id', { type: () => Number })
    id: number,
  ) {
    const foundMake = await this.getMakeByIdService.execute(id)
    if (!foundMake) {
      throw new NotFoundException(`Make with id ${id} not found`)
    }
    return foundMake
  }
}
