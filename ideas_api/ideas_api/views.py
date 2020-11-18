from django.http import HttpResponse
from django.views.decorators.http import require_GET


@require_GET
def graphql_schema(request):
    schema_file = open("data/schema.graphql", "r")
    return HttpResponse(
        schema_file,
        content_type='application/text',
        status=200
    )
