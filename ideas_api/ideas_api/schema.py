from graphene import ObjectType, Schema

from core.schema import Query as CoreQuery


class Query(CoreQuery, ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


schema = Schema(query=Query)
