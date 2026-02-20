from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.ImageField(source="image", read_only=True)

    class Meta:
        model = ProductImage
        fields = ("id", "url", "alt_text", "is_primary", "order")


class ProductListSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "price",
            "primary_image",
        )

    def get_primary_image(self, obj: Product):
        # Prefer is_primary=True, fallback to first ordered image
        img = (
            obj.images.filter(is_primary=True).first()
            or obj.images.order_by("order", "id").first()
        )
        if not img:
            return None
        return {
            "id": img.id,
            "url": self.context["request"].build_absolute_uri(img.image.url)
            if self.context.get("request")
            else img.image.url,
            "alt_text": img.alt_text,
        }


class ProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "specifications",
            "images",
        )
