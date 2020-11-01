from core.models import TBase
from core.serializers import TBaseSerializer


# Create your views here.

class TBaseViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving bases.
    """
    queryset = TBase.objects.all()
    serializer_class = TBaseSerializer
