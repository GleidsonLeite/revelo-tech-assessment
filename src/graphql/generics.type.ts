/* eslint-disable @typescript-eslint/no-unused-vars */
import { Type } from '@nestjs/common'
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql'

interface IEdgeType<T> {
  cursor: string
  node: T
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[]
  nodes: T[]
  totalCount: number
  hasNextPage: boolean
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field((_type) => String)
    cursor: string

    @Field((_type) => classRef)
    node: T
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((_type) => [EdgeType], { nullable: true })
    edges: EdgeType[]

    @Field((_type) => [classRef], { nullable: true })
    nodes: T[]

    @Field((_type) => Int)
    totalCount: number

    @Field()
    hasNextPage: boolean
  }

  return PaginatedType as Type<IPaginatedType<T>>
}

@ArgsType()
export class PaginationArgs {
  @Field((_type) => Int)
  page: number

  @Field((_type) => Int)
  limit: number
}
