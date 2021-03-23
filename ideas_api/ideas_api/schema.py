from graphene import ObjectType, Schema

# core.schema needs to be imported and initialized before mutations
from core.schema import Query as CoreQuery
from core.mutations import Mutation as CoreMutation


class Query(CoreQuery, ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutation(CoreMutation, ObjectType):
    pass

schema = Schema(query=Query, mutation=Mutation)
