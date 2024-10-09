import { Field, Int, ObjectType } from '@nestjs/graphql'
import { VehicleType } from './vehicle-type.type'
import { Paginated } from './generics.type'

@ObjectType()
export class Make {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => [VehicleType])
  vehicleTypes: VehicleType[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class PaginatedMake extends Paginated(Make) {}
