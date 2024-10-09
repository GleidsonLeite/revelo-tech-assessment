import { Args, Resolver, Query } from '@nestjs/graphql'
import { ListMakesService } from './listMakes.service'
import { PaginatedMake } from 'src/graphql/make.type'
import { PaginationArgs } from 'src/graphql/generics.type'

@Resolver()
export class ListMakesResolver {
  constructor(private readonly listMakesService: ListMakesService) {}

  @Query(() => PaginatedMake)
  async listMakes(@Args() paginationArgs: PaginationArgs) {
    return this.listMakesService.execute(paginationArgs)
  }
}
