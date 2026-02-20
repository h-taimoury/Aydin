from django.db import models
from django.db.models import Q


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    specifications = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.name

    @property
    def primary_image(self):
        # convenient for DRF later
        primary = self.images.filter(is_primary=True).first()
        return primary or self.images.order_by("order", "id").first()


def product_image_upload_to(instance, filename):
    # products/<product_id>/<filename>
    return f"products/{instance.product_id}/{filename}"


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="images",
        on_delete=models.CASCADE,
    )
    image = models.ImageField(upload_to=product_image_upload_to)
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["product"],
                condition=Q(is_primary=True),
                name="unique_primary_image_per_product",
            )
        ]

    def __str__(self):
        return (
            f"{self.product.name} image ({'primary' if self.is_primary else 'extra'})"
        )
