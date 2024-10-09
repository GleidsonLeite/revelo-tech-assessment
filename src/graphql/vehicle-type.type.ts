import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Make } from './make.type'

@ObjectType()
export class VehicleType {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field(() => Make)
  make: Make

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
