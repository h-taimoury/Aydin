from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Product
from .serializers import ProductListSerializer, ProductDetailSerializer


class ProductListAPIView(ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        # We need images to pick the primary image without N+1 queries
        return Product.objects.prefetch_related("images").order_by("id")


class ProductDetailAPIView(RetrieveAPIView):
    serializer_class = ProductDetailSerializer

    def get_queryset(self):
        # We need all images for the detail endpoint
        return Product.objects.prefetch_related("images").order_by("id")
